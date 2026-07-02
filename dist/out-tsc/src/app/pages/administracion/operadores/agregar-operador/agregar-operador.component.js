import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { finalize } from 'rxjs';
let AgregarOperadorComponent = class AgregarOperadorComponent {
    constructor(fb, operService, activatedRouted, route, usuaService, alerts, users, clieService) {
        this.fb = fb;
        this.operService = operService;
        this.activatedRouted = activatedRouted;
        this.route = route;
        this.usuaService = usuaService;
        this.alerts = alerts;
        this.users = users;
        this.clieService = clieService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Operador';
        this.showUsuario = true;
        this.listaClientes = [];
        this.idClienteUser = 0;
        this.selectedClienteId = null;
        this.selectedFileName = '';
        this.previewUrl = null;
        this.listaCategoriasLicencia = [];
        this.listaTiposLicencia = [];
        /** Nombre del usuario en modo edición (solo lectura) */
        this.nombreUsuarioDisplay = '';
        this.compareTipoLicenciaById = (a, b) => (a == null && b == null) || (a != null && b != null && Number(a) === Number(b));
        this.compareUsuarioById = (a, b) => (a == null && b == null) || (a != null && b != null && Number(a) === Number(b));
        // ====== Estado drag & drop ======
        this.identDragging = false;
        this.domDragging = false;
        this.antDragging = false;
        this.licDragging = false;
        this.fotoDragging = false;
        this.certificadoDragging = false;
        // ====== Estado de archivos / nombres ======
        this.identFileName = null;
        this.domFileName = null;
        this.antFileName = null;
        this.licFileName = null;
        this.licPreviewUrl = null;
        this.fotoFileName = null;
        this.certificadoFileName = null;
        this.fotoPreviewUrl = null;
        // ====== Loading / processing ======
        this.uploadingIdent = false;
        this.uploadingDom = false;
        this.uploadingAnt = false;
        this.uploadingLic = false;
        this.uploadingFoto = false;
        this.uploadingCertificado = false;
        // Evita manejar el mismo archivo dos veces por eventos consecutivos
        this.processingIdent = false;
        this.processingDom = false;
        this.processingAnt = false;
        this.processingLic = false;
        this.processingFoto = false;
        this.processingCertificado = false;
        // Guard para evitar doble .click() cuando el evento burbujea (dropzone + botón)
        this.openGuard = {
            ident: false,
            dom: false,
            ant: false,
            lic: false,
            foto: false,
            certificado: false,
        };
        // Límite MB visible desde template (no private)
        this.MAX_MB = 3;
        const user = this.users.getUser();
        this.showCliente = user?.rol?.nombre === 'SA';
        this.idClienteUser = Number(user?.idCliente);
    }
    ngOnInit() {
        this.initForm();
        this.obtenerCategoriasLicencia();
        this.obtenerTiposLicencia();
        if (this.showCliente) {
            this.obtenerClientes();
            this.listaUsuarios = [];
            this.operadorForm.patchValue({ idUsuario: null });
        }
        else {
            this.obtenerUsuarios(this.idClienteUser);
        }
        this.activatedRouted.params.subscribe(params => {
            this.idOperador = params['idOperador'];
            if (this.idOperador) {
                this.title = 'Actualizar Operador';
                this.submitButton = 'Actualizar';
                this.operadorForm.controls['idUsuario'].disable();
                // Al editar no se exigen vigencia, categoría ni tipo de licencia
                this.operadorForm.get('vigencia')?.clearValidators();
                this.operadorForm.get('vigencia')?.updateValueAndValidity();
                this.operadorForm.get('vigencia.start')?.clearValidators();
                this.operadorForm.get('vigencia.start')?.updateValueAndValidity();
                this.operadorForm.get('vigencia.end')?.clearValidators();
                this.operadorForm.get('vigencia.end')?.updateValueAndValidity();
                this.operadorForm.get('idCategoriaLicencia')?.clearValidators();
                this.operadorForm.get('idCategoriaLicencia')?.updateValueAndValidity();
                this.operadorForm.get('idTipoLicencia')?.clearValidators();
                this.operadorForm.get('idTipoLicencia')?.updateValueAndValidity();
                this.operadorForm.get('numeroLicencia')?.clearValidators();
                this.operadorForm.get('numeroLicencia')?.updateValueAndValidity();
                this.obtenerOperadorID();
            }
        });
    }
    obtenerClientes() {
        this.clieService.obtenerClientes().subscribe({
            next: (response) => {
                this.listaClientes = (response?.data || []).map((x) => ({
                    ...x,
                    id: Number(x?.id ?? x?.Id ?? x?.ID),
                }));
            },
            error: () => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'No fue posible obtener la lista de clientes.',
                    confirmText: 'Aceptar',
                    backdropClose: false,
                });
            },
        });
    }
    async getErrorMessage(err) {
        if (err?.status === 0 && !err?.error)
            return 'No hay conexión con el servidor (status 0). Verifica tu red.';
        if (err?.error instanceof Blob) {
            try {
                const txt = await err.error.text();
                if (txt)
                    return txt;
            }
            catch { }
        }
        if (typeof err?.error === 'string' && err.error.trim())
            return err.error;
        if (typeof err?.message === 'string' && err.message.trim())
            return err.message;
        if (err?.error?.message)
            return String(err.error.message);
        if (err?.error?.errors) {
            const e = err.error.errors;
            if (Array.isArray(e))
                return e.filter(Boolean).join('\n');
            if (typeof e === 'object') {
                const lines = [];
                for (const k of Object.keys(e)) {
                    const val = e[k];
                    if (Array.isArray(val))
                        lines.push(`${k}: ${val.join(', ')}`);
                    else if (val)
                        lines.push(`${k}: ${val}`);
                }
                if (lines.length)
                    return lines.join('\n');
            }
        }
        const statusLine = err?.status
            ? `HTTP ${err.status}${err.statusText ? ' ' + err.statusText : ''}`
            : '';
        return statusLine;
    }
    pickId(obj, keys) {
        for (const k of keys)
            if (obj?.[k] !== undefined && obj?.[k] !== null)
                return obj[k];
        return null;
    }
    obtenerOperadorID() {
        const id = Number(this.idOperador);
        if (!id)
            return;
        this.operService.obtenerOperador(id).subscribe((response) => {
            const raw = Array.isArray(response?.data)
                ? response.data[0]
                : response?.operador ?? response?.data ?? response ?? {};
            const get = (o, keys) => {
                if (!o)
                    return null;
                for (const k of keys)
                    if (o[k] !== undefined && o[k] !== null)
                        return o[k];
                return null;
            };
            // Datos de licencia: pueden estar en el objeto raíz o dentro de licencias[0]
            const licencias = raw?.licencias;
            const primeraLicencia = Array.isArray(licencias) && licencias.length > 0 ? licencias[0] : null;
            const numeroLicencia = get(primeraLicencia, ['numeroLicencia', 'NumeroLicencia'])
                ?? get(raw, ['numeroLicencia', 'NumeroLicencia']);
            const fechaNacimientoRaw = get(raw, ['fechaNacimiento', 'FechaNacimiento']);
            const fechaExpedicionRaw = get(primeraLicencia, ['fechaExpedicion', 'FechaExpedicion'])
                ?? get(raw, ['fechaExpedicion', 'FechaExpedicion']);
            const fechaVencimientoRaw = get(primeraLicencia, ['fechaVencimiento', 'FechaVencimiento', 'fechaExpiracion', 'FechaExpiracion'])
                ?? get(raw, ['fechaVencimiento', 'FechaVencimiento', 'fechaExpiracion', 'FechaExpiracion']);
            const idUsuario = get(raw, ['idUsuario', 'IdUsuario']);
            const estatus = get(raw, ['estatusOperador', 'estatus', 'Estatus']);
            const idCategoriaLicencia = get(primeraLicencia, ['idCategoriaLicencia', 'IdCategoriaLicencia'])
                ?? get(raw, ['idCategoriaLicencia', 'IdCategoriaLicencia']);
            const idTipoLicencia = get(primeraLicencia, ['idTipoLicencia', 'IdTipoLicencia'])
                ?? get(raw, ['idTipoLicencia', 'IdTipoLicencia']);
            const identificacion = get(raw, ['identificacion', 'Identificacion']);
            const comprobanteDomicilio = get(raw, ['comprobanteDomicilio', 'ComprobanteDomicilio']);
            const foto = get(raw, ['fotoPerfil', 'foto', 'Foto']);
            const certificadoMedico = get(raw, ['certificadoMedico', 'CertificadoMedico']);
            const antecedentesNoPenales = get(raw, ['antecedentesNoPenales', 'AntecedentesNoPenales']);
            // Licencia de conducir: siempre desde licencias[0]
            const licencia = primeraLicencia
                ? get(primeraLicencia, ['licencia', 'Licencia'])
                : get(raw, ['licencia', 'Licencia']);
            // Cargar preview y nombre de licencia de conducir
            if (typeof licencia === 'string' && /\.(png|jpe?g|webp|gif|bmp)(\?.*)?$/i.test(licencia)) {
                this.licPreviewUrl = licencia;
                this.licFileName = licencia.split('/').pop()?.split('?')[0] || 'licencia.jpg';
            }
            else {
                this.licPreviewUrl = null;
                this.licFileName = null;
            }
            // Cargar preview de foto si existe
            if (typeof foto === 'string' && /\.(png|jpe?g|webp|gif|bmp)(\?.*)?$/i.test(foto)) {
                this.fotoPreviewUrl = foto;
                this.fotoFileName = foto.split('/').pop()?.split('?')[0] || 'foto.jpg';
            }
            else {
                this.fotoPreviewUrl = null;
                this.fotoFileName = null;
            }
            // Nombres de archivo para PDFs cuando vienen como URL
            const setPdfFileName = (url, prop) => {
                if (typeof url === 'string' && url.trim()) {
                    this[prop] = url.split('/').pop()?.split('?')[0] || 'documento.pdf';
                }
                else {
                    this[prop] = null;
                }
            };
            setPdfFileName(identificacion, 'identFileName');
            setPdfFileName(comprobanteDomicilio, 'domFileName');
            setPdfFileName(antecedentesNoPenales, 'antFileName');
            setPdfFileName(certificadoMedico, 'certificadoFileName');
            const fechaNacimiento = fechaNacimientoRaw
                ? new Date(String(fechaNacimientoRaw).split('T')[0])
                : null;
            const fechaExpedicion = fechaExpedicionRaw
                ? String(fechaExpedicionRaw).split('T')[0]
                : null;
            const fechaVencimiento = fechaVencimientoRaw
                ? String(fechaVencimientoRaw).split('T')[0]
                : null;
            const patchForm = () => {
                // Nombre del usuario para mostrar en input solo lectura (modo edición)
                const nom = get(raw, ['nombreUsuario', 'NombreUsuario']);
                const apP = get(raw, ['apellidoPaternoUsuario', 'ApellidoPaternoUsuario']);
                const apM = get(raw, ['apellidoMaternoUsuario', 'ApellidoMaternoUsuario']);
                this.nombreUsuarioDisplay = [nom, apP, apM].filter(Boolean).join(' ').trim()
                    || get(raw, ['userNameUsuario', 'userName', 'email']) || '';
                this.operadorForm.patchValue({
                    numeroLicencia: numeroLicencia ?? '',
                    fechaNacimiento,
                    vigencia: {
                        start: fechaExpedicion ? new Date(fechaExpedicion) : null,
                        end: fechaVencimiento ? new Date(fechaVencimiento) : null
                    },
                    idUsuario: idUsuario != null ? Number(idUsuario) : null,
                    estatus: estatus != null ? Number(estatus) : 1,
                    idCategoriaLicencia: idCategoriaLicencia != null ? Number(idCategoriaLicencia) : null,
                    idTipoLicencia: idTipoLicencia != null ? Number(idTipoLicencia) : null,
                    identificacion: identificacion ?? null,
                    comprobanteDomicilio: comprobanteDomicilio ?? null,
                    foto: foto ?? null,
                    certificadoMedico: certificadoMedico ?? null,
                    antecedentesNoPenales: antecedentesNoPenales ?? null,
                    licencia: licencia ?? null,
                });
            };
            // Si es SA y el operador tiene idCliente, cargar usuarios de ese cliente para el select
            const idCliente = get(raw, ['idCliente', 'IdCliente']);
            if (this.showCliente && idCliente != null) {
                this.selectedClienteId = Number(idCliente);
                this.usuaService.obtenerUsuariosRolOperador(Number(idCliente)).subscribe({
                    next: (resUsuarios) => {
                        this.listaUsuarios = (resUsuarios?.data || resUsuarios || []).map((c) => ({
                            ...c,
                            id: Number(c?.id ?? c?.Id ?? c?.ID ?? c?.idUsuario ?? c?.IdUsuario),
                        }));
                        patchForm();
                    },
                    error: () => patchForm()
                });
            }
            else {
                patchForm();
            }
        });
    }
    obtenerUsuarios(clienteId) {
        this.usuaService.obtenerUsuariosRolOperador(clienteId).subscribe((response) => {
            this.listaUsuarios = (response?.data || response || []).map((c) => ({
                ...c,
                id: Number(c?.id ?? c?.Id ?? c?.ID ?? c?.idUsuario ?? c?.IdUsuario),
            }));
            if (!this.listaUsuarios.length) {
                this.operadorForm.patchValue({ idUsuario: null });
            }
        });
    }
    obtenerCategoriasLicencia() {
        this.operService.obtenerCategoriasLicencia().subscribe({
            next: (response) => {
                this.listaCategoriasLicencia = (response.data || response || []).map((c) => ({
                    ...c,
                    id: Number(c?.id ?? c?.Id ?? c?.ID ?? c?.idCategoriaLicencia ?? c?.IdCategoriaLicencia)
                }));
            },
            error: (error) => {
                console.error('Error al obtener categorías de licencia:', error);
            }
        });
    }
    obtenerTiposLicencia() {
        this.operService.obtenerTiposLicencia().subscribe({
            next: (response) => {
                this.listaTiposLicencia = (response.data || response || []).map((t) => ({
                    ...t,
                    id: Number(t?.idCatTipoLicencia ?? t?.IdCatTipoLicencia ?? t?.id ?? t?.Id ?? t?.ID ?? t?.idTipoLicencia ?? t?.IdTipoLicencia)
                }));
            },
            error: (error) => {
                console.error('Error al obtener tipos de licencia:', error);
                this.listaTiposLicencia = [];
            }
        });
    }
    getNombreCompletoUsuario(u) {
        if (!u)
            return '';
        const nombre = String(u?.nombreUsuario ?? u?.nombre ?? u?.Nombre ?? '').trim();
        const apellidoP = String(u?.apellidoPaternoUsuario ?? u?.apellidoPaterno ?? u?.ApellidoPaterno ?? '').trim();
        const apellidoM = String(u?.apellidoMaternoUsuario ?? u?.apellidoMaterno ?? u?.ApellidoMaterno ?? '').trim();
        const completo = [nombre, apellidoP, apellidoM].filter(Boolean).join(' ');
        return completo || String(u?.userName ?? u?.userNameUsuario ?? u?.email ?? u?.correo ?? '').trim();
    }
    onClienteChange(id) {
        this.selectedClienteId = id;
        if (id) {
            this.obtenerUsuarios(id);
        }
        else {
            this.listaUsuarios = [];
            this.operadorForm.patchValue({ idUsuario: null });
        }
    }
    allowOnlyNumbers(event) {
        const charCode = event.keyCode ? event.keyCode : event.which;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }
    initForm() {
        this.operadorForm = this.fb.group({
            numeroLicencia: ['', Validators.required],
            fechaNacimiento: ['', Validators.required],
            vigencia: this.fb.group({
                start: [null, Validators.required],
                end: [null, Validators.required]
            }),
            idCategoriaLicencia: [null, Validators.required],
            idTipoLicencia: [null, Validators.required],
            identificacion: ['', Validators.required],
            comprobanteDomicilio: ['', Validators.required],
            foto: ['', Validators.required],
            certificadoMedico: ['', Validators.required],
            antecedentesNoPenales: ['', Validators.required],
            estatus: [1, Validators.required],
            licencia: ['', Validators.required],
            idUsuario: [null, Validators.required]
        });
    }
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idOperador) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.operadorForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                numeroLicencia: 'Número de Licencia',
                fechaNacimiento: 'Fecha de Nacimiento',
                vigencia: 'Vigencia (Expedición - Expiración)',
                idCategoriaLicencia: 'Categoría de Licencia',
                idTipoLicencia: 'Tipo de Licencia',
                idUsuario: 'Usuario',
                licencia: 'Licencia de Conducir',
                identificacion: 'Identificación',
                comprobanteDomicilio: 'Comprobante de Domicilio',
                foto: 'Foto',
                certificadoMedico: 'Certificado Médico',
                antecedentesNoPenales: 'Antecedentes No Penales',
            };
            const camposFaltantes = [];
            Object.keys(this.operadorForm.controls).forEach(key => {
                const control = this.operadorForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
                // Validar el FormGroup anidado de vigencia
                if (key === 'vigencia' && control instanceof FormGroup) {
                    const vigenciaStart = control.get('start');
                    const vigenciaEnd = control.get('end');
                    if (vigenciaStart?.invalid || vigenciaEnd?.invalid) {
                        camposFaltantes.push(etiquetas['vigencia'] || 'Vigencia');
                    }
                }
            });
            const lista = camposFaltantes.map((campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
        <p style="text-align:center; font-size:15px; margin-bottom:16px;">
          Hay campos obligatorios sin completar.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        this.operadorForm.removeControl('id');
        const formValue = this.operadorForm.value;
        const vigencia = formValue.vigencia || {};
        const fechaNacimiento = formValue.fechaNacimiento instanceof Date
            ? formValue.fechaNacimiento.toISOString().split('T')[0]
            : formValue.fechaNacimiento;
        const payload = {
            ...formValue,
            fechaNacimiento,
            fechaExpedicion: vigencia.start ? vigencia.start.toISOString().split('T')[0] : null,
            fechaVencimiento: vigencia.end ? vigencia.end.toISOString().split('T')[0] : null
        };
        delete payload.idCliente;
        delete payload.vigencia;
        this.operService.agregarOperador(payload).subscribe(() => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Se agregó un nuevo operador de manera exitosa.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.regresar();
        }, () => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Ocurrió un error al agregar el operador.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.operadorForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                numeroLicencia: 'Número de Licencia',
                fechaNacimiento: 'Fecha de Nacimiento',
                vigencia: 'Vigencia (Expedición - Expiración)',
                idCategoriaLicencia: 'Categoría de Licencia',
                idTipoLicencia: 'Tipo de Licencia',
                idUsuario: 'Usuario',
                licencia: 'Licencia de Conducir',
                identificacion: 'Identificación',
                comprobanteDomicilio: 'Comprobante de Domicilio',
                foto: 'Foto',
                certificadoMedico: 'Certificado Médico',
                antecedentesNoPenales: 'Antecedentes No Penales',
            };
            const camposFaltantes = [];
            Object.keys(this.operadorForm.controls).forEach(key => {
                const control = this.operadorForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
                // Validar el FormGroup anidado de vigencia
                if (key === 'vigencia' && control instanceof FormGroup) {
                    const vigenciaStart = control.get('start');
                    const vigenciaEnd = control.get('end');
                    if (vigenciaStart?.invalid || vigenciaEnd?.invalid) {
                        camposFaltantes.push(etiquetas['vigencia'] || 'Vigencia');
                    }
                }
            });
            const lista = camposFaltantes.map((campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
        <p style="text-align:center; font-size:15px; margin-bottom:16px;">
          Hay campos obligatorios sin completar.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        // getRawValue incluye controles deshabilitados (idUsuario en modo edición)
        const formValue = this.operadorForm.getRawValue();
        const fechaNacimiento = formValue.fechaNacimiento instanceof Date
            ? formValue.fechaNacimiento.toISOString().split('T')[0]
            : formValue.fechaNacimiento;
        // Al editar no se envían vigencia, categoría ni tipo de licencia (no se actualizan)
        const payload = {
            ...formValue,
            fechaNacimiento
        };
        delete payload.idCliente;
        delete payload.vigencia;
        delete payload.fechaExpedicion;
        delete payload.fechaVencimiento;
        delete payload.idCategoriaLicencia;
        delete payload.idTipoLicencia;
        delete payload.numeroLicencia;
        delete payload.licencia;
        this.operService.actualizarOperador(this.idOperador, payload).subscribe(() => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Los datos del operador se actualizaron correctamente.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.regresar();
        }, () => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Ocurrió un error al actualizar el operador.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    regresar() {
        const clienteEfectivo = this.showCliente
            ? (this.selectedClienteId ?? this.idClienteUser)
            : this.idClienteUser;
        this.route.navigate(['/administracion/operadores'], {
            queryParams: { clienteId: clienteEfectivo }
        });
    }
    // ================= Utilidades =================
    isAllowedPdf(file) {
        const allowed = [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
            'image/gif',
            'image/bmp'
        ];
        return allowed.includes(file.type);
    }
    validateFile(file, tipo) {
        const maxBytes = this.MAX_MB * 1024 * 1024;
        const allowed = tipo === 'licencia'
            ? ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/bmp']
            : ['application/pdf'];
        if (!allowed.includes(file.type))
            return 'type';
        if (file.size > maxBytes)
            return 'size';
        return null;
    }
    extractFileUrl(res) {
        return res?.url ?? res?.Location ?? res?.data?.url ?? res?.data?.Location
            ?? res?.key ?? res?.Key ?? res?.path ?? res?.filePath ?? '';
    }
    // ====== Guards para .click() (evita doble invocación por bubbling) ======
    guardOpen(kind, fn) {
        if (this.openGuard[kind])
            return;
        this.openGuard[kind] = true;
        try {
            fn();
        }
        finally {
            // libera el guard después de un pequeño lapso
            setTimeout(() => (this.openGuard[kind] = false), 200);
        }
    }
    // ================= Identificación =================
    openIdentFilePicker() {
        this.guardOpen('ident', () => this.identFileInput?.nativeElement.click());
    }
    onIdentDragOver(e) { e.preventDefault(); this.identDragging = true; }
    onIdentDragLeave(_e) { this.identDragging = false; }
    onIdentDrop(e) {
        e.preventDefault();
        this.identDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleIdentFile(f);
    }
    onIdentFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleIdentFile(f);
    }
    clearIdentFile(e) {
        e.stopPropagation();
        this.identFileName = null;
        if (this.identFileInput)
            this.identFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ identificacion: null });
        this.operadorForm.get('identificacion')?.setErrors({ required: true });
    }
    handleIdentFile(file) {
        if (this.processingIdent)
            return; // <-- evita doble manejo
        this.processingIdent = true;
        if (!this.isAllowedPdf(file)) {
            this.operadorForm.get('identificacion')?.setErrors({ invalid: true });
            this.processingIdent = false;
            return;
        }
        this.identFileName = file.name;
        this.operadorForm.patchValue({ identificacion: file });
        this.operadorForm.get('identificacion')?.setErrors(null);
        this.uploadIdent(file);
    }
    uploadIdent(file) {
        if (this.uploadingIdent) {
            this.processingIdent = false;
            return;
        } // ya subiendo
        this.uploadingIdent = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingIdent = false;
            this.processingIdent = false; // libera procesamiento sí o sí
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    // EXACTO
                    this.operadorForm.patchValue({ identificacion: url });
                }
            },
            error: (err) => console.error('[UPLOAD][identificacion]', err),
        });
    }
    // ================= Comprobante de domicilio =================
    openDomFilePicker() {
        this.guardOpen('dom', () => this.domFileInput?.nativeElement.click());
    }
    onDomDragOver(e) { e.preventDefault(); this.domDragging = true; }
    onDomDragLeave(_e) { this.domDragging = false; }
    onDomDrop(e) {
        e.preventDefault();
        this.domDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleDomFile(f);
    }
    onDomFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleDomFile(f);
    }
    clearDomFile(e) {
        e.stopPropagation();
        this.domFileName = null;
        if (this.domFileInput)
            this.domFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ comprobanteDomicilio: null });
        this.operadorForm.get('comprobanteDomicilio')?.setErrors({ required: true });
    }
    handleDomFile(file) {
        if (this.processingDom)
            return; // <-- evita doble manejo
        this.processingDom = true;
        if (!this.isAllowedPdf(file)) {
            this.operadorForm.get('comprobanteDomicilio')?.setErrors({ invalid: true });
            this.processingDom = false;
            return;
        }
        this.domFileName = file.name;
        this.operadorForm.patchValue({ comprobanteDomicilio: file });
        this.operadorForm.get('comprobanteDomicilio')?.setErrors(null);
        this.uploadDom(file);
    }
    uploadDom(file) {
        if (this.uploadingDom) {
            this.processingDom = false;
            return;
        }
        this.uploadingDom = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingDom = false;
            this.processingDom = false;
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    // EXACTO
                    this.operadorForm.patchValue({ comprobanteDomicilio: url });
                }
            },
            error: (err) => console.error('[UPLOAD][comprobanteDomicilio]', err),
        });
    }
    // ================= Antecedentes no penales =================
    openAntFilePicker() {
        this.guardOpen('ant', () => this.antFileInput?.nativeElement.click());
    }
    onAntDragOver(e) { e.preventDefault(); this.antDragging = true; }
    onAntDragLeave(_e) { this.antDragging = false; }
    onAntDrop(e) {
        e.preventDefault();
        this.antDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleAntFile(f);
    }
    onAntFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleAntFile(f);
    }
    clearAntFile(e) {
        e.stopPropagation();
        this.antFileName = null;
        if (this.antFileInput)
            this.antFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ antecedentesNoPenales: null });
        this.operadorForm.get('antecedentesNoPenales')?.setErrors({ required: true });
    }
    handleAntFile(file) {
        if (this.processingAnt)
            return; // <-- evita doble manejo
        this.processingAnt = true;
        if (!this.isAllowedPdf(file)) {
            this.operadorForm.get('antecedentesNoPenales')?.setErrors({ invalid: true });
            this.processingAnt = false;
            return;
        }
        this.antFileName = file.name;
        this.operadorForm.patchValue({ antecedentesNoPenales: file });
        this.operadorForm.get('antecedentesNoPenales')?.setErrors(null);
        this.uploadAnt(file);
    }
    uploadAnt(file) {
        if (this.uploadingAnt) {
            this.processingAnt = false;
            return;
        }
        this.uploadingAnt = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingAnt = false;
            this.processingAnt = false;
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.operadorForm.patchValue({ antecedentesNoPenales: url });
                }
            },
            error: (err) => console.error('[UPLOAD][antecedentesNoPenales]', err),
        });
    }
    // ====== Licencia de conducir ======
    openLicFilePicker() {
        this.guardOpen('lic', () => this.licFileInput?.nativeElement.click());
    }
    onLicDragOver(e) { e.preventDefault(); this.licDragging = true; }
    onLicDragLeave(_e) { this.licDragging = false; }
    onLicDrop(e) {
        e.preventDefault();
        this.licDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleLicFile(f);
    }
    onLicFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleLicFile(f);
    }
    clearLicFile(e) {
        e.stopPropagation();
        this.licFileName = null;
        this.licPreviewUrl = null;
        if (this.licFileInput)
            this.licFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ licencia: null });
        this.operadorForm.get('licencia')?.setErrors({ required: true });
    }
    handleLicFile(file) {
        if (this.processingLic)
            return;
        this.processingLic = true;
        const v = this.validateFile(file, 'licencia');
        if (v) {
            this.operadorForm.get('licencia')?.setErrors({ invalid: true });
            this.processingLic = false;
            return;
        }
        this.licFileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            this.licPreviewUrl = reader.result;
            this.operadorForm.patchValue({ licencia: file });
            this.operadorForm.get('licencia')?.setErrors(null);
            this.uploadLic(file);
        };
        reader.readAsDataURL(file);
    }
    uploadLic(file) {
        if (this.uploadingLic) {
            this.processingLic = false;
            return;
        }
        this.uploadingLic = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingLic = false;
            this.processingLic = false;
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.operadorForm.patchValue({ licencia: url });
                    this.licPreviewUrl = url;
                }
            },
            error: (err) => console.error('[UPLOAD][licencia]', err),
        });
    }
    // ================= Foto =================
    openFotoFilePicker() {
        this.guardOpen('foto', () => this.fotoFileInput?.nativeElement.click());
    }
    onFotoDragOver(e) { e.preventDefault(); this.fotoDragging = true; }
    onFotoDragLeave(_e) { this.fotoDragging = false; }
    onFotoDrop(e) {
        e.preventDefault();
        this.fotoDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleFotoFile(f);
    }
    onFotoFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleFotoFile(f);
    }
    clearFotoFile(e) {
        e.stopPropagation();
        this.fotoFileName = null;
        this.fotoPreviewUrl = null;
        if (this.fotoFileInput)
            this.fotoFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ foto: null });
        this.operadorForm.get('foto')?.setErrors({ required: true });
    }
    handleFotoFile(file) {
        if (this.processingFoto)
            return;
        this.processingFoto = true;
        const v = this.validateFile(file, 'licencia');
        if (v) {
            this.operadorForm.get('foto')?.setErrors({ invalid: true });
            this.processingFoto = false;
            return;
        }
        this.fotoFileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            this.fotoPreviewUrl = reader.result;
            this.operadorForm.patchValue({ foto: file });
            this.operadorForm.get('foto')?.setErrors(null);
            this.uploadFoto(file);
        };
        reader.readAsDataURL(file);
    }
    uploadFoto(file) {
        if (this.uploadingFoto) {
            this.processingFoto = false;
            return;
        }
        this.uploadingFoto = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingFoto = false;
            this.processingFoto = false;
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.operadorForm.patchValue({ foto: url });
                    this.fotoPreviewUrl = url;
                }
            },
            error: (err) => console.error('[UPLOAD][foto]', err),
        });
    }
    // ================= Certificado Médico =================
    openCertificadoFilePicker() {
        this.guardOpen('certificado', () => this.certificadoFileInput?.nativeElement.click());
    }
    onCertificadoDragOver(e) { e.preventDefault(); this.certificadoDragging = true; }
    onCertificadoDragLeave(_e) { this.certificadoDragging = false; }
    onCertificadoDrop(e) {
        e.preventDefault();
        this.certificadoDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleCertificadoFile(f);
    }
    onCertificadoFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleCertificadoFile(f);
    }
    clearCertificadoFile(e) {
        e.stopPropagation();
        this.certificadoFileName = null;
        if (this.certificadoFileInput)
            this.certificadoFileInput.nativeElement.value = '';
        this.operadorForm.patchValue({ certificadoMedico: null });
        this.operadorForm.get('certificadoMedico')?.setErrors({ required: true });
    }
    handleCertificadoFile(file) {
        if (this.processingCertificado)
            return;
        this.processingCertificado = true;
        if (!this.isAllowedPdf(file)) {
            this.operadorForm.get('certificadoMedico')?.setErrors({ invalid: true });
            this.processingCertificado = false;
            return;
        }
        this.certificadoFileName = file.name;
        this.operadorForm.patchValue({ certificadoMedico: file });
        this.operadorForm.get('certificadoMedico')?.setErrors(null);
        this.uploadCertificado(file);
    }
    uploadCertificado(file) {
        if (this.uploadingCertificado) {
            this.processingCertificado = false;
            return;
        }
        this.uploadingCertificado = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'operadores');
        fd.append('idModule', '9');
        this.usuaService.uploadFile(fd).pipe(finalize(() => {
            this.uploadingCertificado = false;
            this.processingCertificado = false;
        })).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.operadorForm.patchValue({ certificadoMedico: url });
                }
            },
            error: (err) => console.error('[UPLOAD][certificadoMedico]', err),
        });
    }
};
__decorate([
    ViewChild('identFileInput')
], AgregarOperadorComponent.prototype, "identFileInput", void 0);
__decorate([
    ViewChild('domFileInput')
], AgregarOperadorComponent.prototype, "domFileInput", void 0);
__decorate([
    ViewChild('antFileInput')
], AgregarOperadorComponent.prototype, "antFileInput", void 0);
__decorate([
    ViewChild('licFileInput')
], AgregarOperadorComponent.prototype, "licFileInput", void 0);
__decorate([
    ViewChild('fotoFileInput')
], AgregarOperadorComponent.prototype, "fotoFileInput", void 0);
__decorate([
    ViewChild('certificadoFileInput')
], AgregarOperadorComponent.prototype, "certificadoFileInput", void 0);
AgregarOperadorComponent = __decorate([
    Component({
        selector: 'vex-agregar-operador',
        templateUrl: './agregar-operador.component.html',
        styleUrl: './agregar-operador.component.scss',
        animations: [fadeInRight400ms],
    })
], AgregarOperadorComponent);
export { AgregarOperadorComponent };
//# sourceMappingURL=agregar-operador.component.js.map