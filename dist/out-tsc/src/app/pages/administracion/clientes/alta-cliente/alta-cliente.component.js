import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { finalize, forkJoin, map, of, switchMap } from 'rxjs';
let AltaClienteComponent = class AltaClienteComponent {
    constructor(fb, clieService, activatedRouted, route, usuaService, alerts) {
        this.fb = fb;
        this.clieService = clieService;
        this.activatedRouted = activatedRouted;
        this.route = route;
        this.usuaService = usuaService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Cliente';
        this.listaClientes = [];
        this.selectedFileName = '';
        this.previewUrl = null;
        this.DEFAULT_AVATAR_URL = 'https://wallpapercat.com/w/full/9/5/a/945731-3840x2160-desktop-4k-matte-black-wallpaper-image.jpg';
        // ====== Estado UI (dragging, nombres, preview, progreso) ======
        // Logotipo (imagen)
        this.logoDragging = false;
        this.logoFileName = null;
        this.logoPreviewUrl = null;
        this.uploadingLogo = false;
        // Constancia (PDF)
        this.csfDragging = false;
        this.csfFileName = null;
        this.uploadingCsf = false;
        // Comprobante (PDF)
        this.compDomDragging = false;
        this.compDomFileName = null;
        this.uploadingCompDom = false;
        // Acta (PDF)
        this.actaDragging = false;
        this.actaFileName = null;
        this.uploadingActa = false;
        // Límite (MB)
        this.MAX_MB = 3;
        // =========================================================
        //           ACTA CONSTITUTIVA (PDF)
        // =========================================================
        this.DEFAULT_LOGO_URL = 'https://dashcamsys.s3.us-east-2.amazonaws.com/logos/DashCamPay_trasparente_large.png';
    }
    ngOnInit() {
        this.obtenerClientes();
        this.initForm();
        this.activatedRouted.params.subscribe((params) => {
            this.idCliente = params['idCliente'];
            if (this.idCliente) {
                this.title = 'Actualizar Cliente';
                this.obtenerClienteID();
            }
        });
    }
    get tipoPersonaVal() {
        const v = this.clienteForm.get('tipoPersona')?.value;
        return v === null || v === undefined ? null : Number(v);
    }
    get esFisica() { return this.tipoPersonaVal === 1; }
    get esMoral() { return this.tipoPersonaVal === 2; }
    obtenerClientes() {
        this.clieService.obtenerClientes().subscribe((response) => {
            this.listaClientes = (response.data || []).map((c) => ({
                ...c,
                id: Number(c.id),
            }));
        });
    }
    obtenerClienteID() {
        this.clieService.obtenerCliente(this.idCliente).subscribe((response) => {
            const d = response?.data ?? {};
            this.clienteForm.patchValue({
                idPadre: Number(d.idPadre ?? 0),
                rfc: d.rfc ?? '',
                tipoPersona: d.tipoPersona ?? null,
                estatus: Number(d?.estatus ?? d?.estatusCliente ?? 1),
                logotipo: d.logotipo ?? null,
                nombre: d.nombre ?? '',
                apellidoPaterno: d.apellidoPaterno ?? null,
                apellidoMaterno: d.apellidoMaterno ?? null,
                telefono: d.telefono ?? '',
                correo: d.correo ?? '',
                estado: d.estado ?? '',
                municipio: d.municipio ?? '',
                colonia: d.colonia ?? '',
                calle: d.calle ?? '',
                entreCalles: d.entreCalles ?? '',
                numeroExterior: d.numeroExterior ?? '',
                numeroInterior: d.numeroInterior ?? '',
                cp: d.cp ?? '',
                nombreEncargado: d.nombreEncargado ?? '',
                telefonoEncargado: d.telefonoEncargado ?? '',
                correoEncargado: d.correoEncargado ?? '',
                sitioWeb: d.sitioWeb ?? '',
                constanciaSituacionFiscal: d.constanciaSituacionFiscal ?? null,
                comprobanteDomicilio: d.comprobanteDomicilio ?? null,
                actaConstitutiva: d.actaConstitutiva ?? null,
            });
            this.logoPreviewUrl = (d.logotipo && typeof d.logotipo === 'string')
                ? d.logotipo
                : null; // o this.DEFAULT_LOGO_URL si quieres que se vea siempre algo
            this.onTipoPersonaChange(null);
            this.onTipoPersonaChange(null); // <-- aplica reglas al entrar
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFileName = file.name;
            this.clienteForm.patchValue({ Logotipo: file });
            this.clienteForm.get('Logotipo')?.markAsTouched();
            this.clienteForm.get('Logotipo')?.updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
                this.previewUrl = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
    onTipoPersonaChange(_event) {
        const value = this.tipoPersonaVal;
        // Nombre siempre requerido (sirve para "Nombre" o "Razón Social")
        this.clienteForm.get('nombre')?.setValidators([Validators.required]);
        this.clienteForm.get('nombre')?.updateValueAndValidity({ emitEvent: false });
        if (value === 1) {
            // Física: apellidos requeridos
            this.clienteForm.get('apellidoPaterno')?.setValidators([Validators.required]);
            this.clienteForm.get('apellidoMaterno')?.setValidators([Validators.required]);
        }
        else if (value === 2) {
            // Moral: apellidos no aplican
            this.clienteForm.get('apellidoPaterno')?.clearValidators();
            this.clienteForm.get('apellidoMaterno')?.clearValidators();
            this.clienteForm.patchValue({ apellidoPaterno: null, apellidoMaterno: null });
        }
        this.clienteForm.get('apellidoPaterno')?.updateValueAndValidity({ emitEvent: false });
        this.clienteForm.get('apellidoMaterno')?.updateValueAndValidity({ emitEvent: false });
    }
    sanitizeInput(event) {
        const inputElement = event.target;
        const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
        inputElement.value = sanitizedValue.slice(0, 13);
        this.clienteForm
            .get('RFC')
            ?.setValue(inputElement.value, { emitEvent: false });
    }
    allowOnlyNumbers(event) {
        const charCode = event.keyCode ? event.keyCode : event.which;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }
    initForm() {
        this.clienteForm = this.fb.group({
            idPadre: [null],
            rfc: ['', Validators.required],
            tipoPersona: [null, Validators.required],
            estatus: [1, Validators.required],
            logotipo: [null],
            constanciaSituacionFiscal: [null, Validators.required],
            comprobanteDomicilio: [null, Validators.required],
            actaConstitutiva: [null, Validators.required],
            nombre: ['', Validators.required],
            apellidoPaterno: ['', Validators.required],
            apellidoMaterno: ['', Validators.required],
            telefono: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            estado: ['', Validators.required],
            municipio: ['', Validators.required],
            colonia: ['', Validators.required],
            calle: ['', Validators.required],
            entreCalles: ['', Validators.required],
            numeroExterior: ['', Validators.required],
            numeroInterior: [null],
            cp: ['', Validators.required],
            nombreEncargado: ['', Validators.required],
            telefonoEncargado: ['', Validators.required],
            correoEncargado: ['', [Validators.required, Validators.email]],
            sitioWeb: [null],
        });
    }
    async getErrorMessage(err) {
        if (err?.status === 0 && !err?.error) {
            return 'No hay conexión con el servidor (status 0). Verifica tu red.';
        }
        if (err?.error instanceof Blob) {
            try {
                const txt = await err.error.text();
                if (txt)
                    return txt;
            }
            catch { }
        }
        if (typeof err?.error === 'string' && err.error.trim()) {
            return err.error;
        }
        if (typeof err?.message === 'string' && err.message.trim()) {
            return err.message;
        }
        if (err?.error?.message) {
            return String(err.error.message);
        }
        if (err?.error?.errors) {
            const e = err.error.errors;
            if (Array.isArray(e)) {
                return e.filter(Boolean).join('\n');
            }
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
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idCliente) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        // === Reglas dinámicas por tipoPersona ===
        const tipo = Number(this.clienteForm.get('tipoPersona')?.value ?? null);
        if (tipo === 1) {
            this.clienteForm.get('apellidoPaterno')?.setValidators([Validators.required]);
            this.clienteForm.get('apellidoMaterno')?.setValidators([Validators.required]);
        }
        else if (tipo === 2) {
            this.clienteForm.get('apellidoPaterno')?.clearValidators();
            this.clienteForm.get('apellidoMaterno')?.clearValidators();
            this.clienteForm.patchValue({ apellidoPaterno: null, apellidoMaterno: null });
        }
        this.clienteForm.get('apellidoPaterno')?.updateValueAndValidity({ emitEvent: false });
        this.clienteForm.get('apellidoMaterno')?.updateValueAndValidity({ emitEvent: false });
        // === Validación ===
        if (this.clienteForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                rfc: 'RFC',
                tipoPersona: 'Tipo de Persona',
                estatus: 'Estatus',
                constanciaSituacionFiscal: 'Constancia de Situación Fiscal',
                comprobanteDomicilio: 'Comprobante de Domicilio',
                actaConstitutiva: 'Acta Constitutiva',
                nombre: 'Nombre / Razón Social',
                apellidoPaterno: 'Apellido Paterno',
                apellidoMaterno: 'Apellido Materno',
                telefono: 'Teléfono',
                correo: 'Correo Electrónico',
                estado: 'Estado',
                municipio: 'Municipio',
                colonia: 'Colonia',
                calle: 'Calle',
                entreCalles: 'Entre Calles',
                numeroExterior: 'Número Exterior',
                cp: 'Código Postal',
                nombreEncargado: 'Nombre del Encargado',
                telefonoEncargado: 'Teléfono del Encargado',
                correoEncargado: 'Email del Encargado',
            };
            const faltantes = [];
            Object.keys(this.clienteForm.controls).forEach((key) => {
                const c = this.clienteForm.get(key);
                if (c?.invalid && c.errors?.['required'])
                    faltantes.push(etiquetas[key] || key);
            });
            const lista = faltantes
                .map((campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `)
                .join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false
            });
            return;
        }
        // === Subir archivos (si aún son File) y enviar URLs en payload ===
        const extractFileUrl = (res) => res?.url ??
            res?.Location ??
            res?.data?.url ??
            res?.data?.Location ??
            res?.key ??
            res?.Key ??
            res?.path ??
            res?.filePath ??
            '';
        const v = this.clienteForm.getRawValue(); // por si algo está disabled en el futuro
        const folder = 'clientes';
        const idModule = '50';
        const uploadOrPass$ = (val) => {
            if (val instanceof File) {
                const fd = new FormData();
                fd.append('file', val, val.name);
                fd.append('folder', folder);
                fd.append('idModule', idModule);
                return this.usuaService.uploadFile(fd).pipe(map(extractFileUrl));
            }
            return of(val ?? null); // ya es URL o null
        };
        forkJoin({
            logotipo: uploadOrPass$(v.logotipo),
            constanciaSituacionFiscal: uploadOrPass$(v.constanciaSituacionFiscal),
            comprobanteDomicilio: uploadOrPass$(v.comprobanteDomicilio),
            actaConstitutiva: uploadOrPass$(v.actaConstitutiva),
        })
            .pipe(switchMap((urls) => {
            const payload = {
                ...v,
                idPadre: v.idPadre != null ? Number(v.idPadre) : null,
                tipoPersona: v.tipoPersona != null ? Number(v.tipoPersona) : null,
                // si no subieron nada, manda la por defecto:
                logotipo: urls.logotipo || this.DEFAULT_LOGO_URL,
                constanciaSituacionFiscal: urls.constanciaSituacionFiscal,
                comprobanteDomicilio: urls.comprobanteDomicilio,
                actaConstitutiva: urls.actaConstitutiva,
            };
            return this.clieService.agregarCliente(payload);
        }), finalize(() => { this.loading = false; this.submitButton = 'Guardar'; }))
            .subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se agregó un nuevo cliente de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
                this.regresar();
            },
            error: async (err) => {
                const msg = await this.getErrorMessage(err);
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: `<div style="white-space:pre-wrap;text-align:center">${msg}</div>`,
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
            }
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        const tipo = Number(this.clienteForm.get('tipoPersona')?.value ?? null);
        this.clienteForm.get('nombre')?.setValidators([Validators.required]);
        this.clienteForm.get('nombre')?.updateValueAndValidity({ emitEvent: false });
        if (tipo === 1) {
            this.clienteForm.get('apellidoPaterno')?.setValidators([Validators.required]);
            this.clienteForm.get('apellidoMaterno')?.setValidators([Validators.required]);
        }
        else if (tipo === 2) {
            this.clienteForm.get('apellidoPaterno')?.clearValidators();
            this.clienteForm.get('apellidoMaterno')?.clearValidators();
            this.clienteForm.patchValue({ apellidoPaterno: null, apellidoMaterno: null });
        }
        this.clienteForm.get('apellidoPaterno')?.updateValueAndValidity({ emitEvent: false });
        this.clienteForm.get('apellidoMaterno')?.updateValueAndValidity({ emitEvent: false });
        if (this.clienteForm.invalid) {
            this.submitButton = 'Actualizar';
            this.loading = false;
            const etiquetas = {
                idPadre: 'Id Padre',
                rfc: 'RFC',
                tipoPersona: 'Tipo de Persona',
                estatus: 'Estatus',
                logotipo: 'Logotipo',
                constanciaSituacionFiscal: 'Constancia de Situación Fiscal',
                comprobanteDomicilio: 'Comprobante de Domicilio',
                actaConstitutiva: 'Acta Constitutiva',
                nombre: 'Nombre / Razón Social',
                apellidoPaterno: 'Apellido Paterno',
                apellidoMaterno: 'Apellido Materno',
                telefono: 'Teléfono',
                correo: 'Correo Electrónico',
                estado: 'Estado',
                municipio: 'Municipio',
                colonia: 'Colonia',
                calle: 'Calle',
                entreCalles: 'Entre Calles',
                numeroExterior: 'Número Exterior',
                cp: 'Código Postal',
                nombreEncargado: 'Nombre del Encargado',
                telefonoEncargado: 'Teléfono del Encargado',
                correoEncargado: 'Email del Encargado',
            };
            const faltantes = [];
            Object.keys(this.clienteForm.controls).forEach((key) => {
                const c = this.clienteForm.get(key);
                if (c?.invalid && c.errors?.['required'])
                    faltantes.push(etiquetas[key] || key);
            });
            const lista = faltantes.map((campo, i) => `
      <div style="padding:8px 12px;border-left:4px solid #d9534f;background:#caa8a8;text-align:center;margin-bottom:8px;border-radius:4px;">
        <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
      </div>
    `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
        <p style="text-align:center;font-size:15px;margin-bottom:16px;color:white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.
        </p>
        <div style="max-height:350px;overflow-y:auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false
            });
            return;
        }
        const v = this.clienteForm.getRawValue();
        const folder = 'clientes';
        const idModule = '50';
        const uploadOrPass$ = (val) => {
            if (val instanceof File) {
                const fd = new FormData();
                fd.append('file', val, val.name);
                fd.append('folder', folder);
                fd.append('idModule', idModule);
                return this.usuaService.uploadFile(fd).pipe(map(res => this.extractFileUrl(res)));
            }
            return of(val ?? null);
        };
        forkJoin({
            logotipo: uploadOrPass$(v.logotipo),
            constanciaSituacionFiscal: uploadOrPass$(v.constanciaSituacionFiscal),
            comprobanteDomicilio: uploadOrPass$(v.comprobanteDomicilio),
            actaConstitutiva: uploadOrPass$(v.actaConstitutiva),
        })
            .pipe(switchMap((urls) => {
            const payload = {
                ...v,
                idPadre: v.idPadre != null ? Number(v.idPadre) : null,
                tipoPersona: v.tipoPersona != null ? Number(v.tipoPersona) : null,
                logotipo: urls.logotipo || this.DEFAULT_LOGO_URL,
                constanciaSituacionFiscal: urls.constanciaSituacionFiscal,
                comprobanteDomicilio: urls.comprobanteDomicilio,
                actaConstitutiva: urls.actaConstitutiva,
            };
            return this.clieService.actualizarCliente(this.idCliente, payload);
        }), finalize(() => { this.loading = false; this.submitButton = 'Actualizar'; }))
            .subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Los datos del cliente se actualizaron correctamente.',
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
                this.regresar();
            },
            error: async (err) => {
                const msg = await this.getErrorMessage(err);
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: `<div style="white-space:pre-wrap;text-align:center">${msg}</div>`,
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
            }
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/clientes');
    }
    // ====== Utils ======
    extractFileUrl(res) {
        return (res?.url ??
            res?.Location ??
            res?.data?.url ??
            res?.data?.Location ??
            res?.key ??
            res?.Key ??
            res?.path ??
            res?.filePath ??
            '');
    }
    isImage(file) {
        return /^image\/(png|jpe?g|webp)$/i.test(file.type);
    }
    isPdf(file) {
        return file.type === 'application/pdf';
    }
    isAllowedImage(file) {
        return this.isImage(file) && file.size <= this.MAX_MB * 1024 * 1024;
    }
    isAllowedPdf(file) {
        return this.isPdf(file) && file.size <= this.MAX_MB * 1024 * 1024;
    }
    loadImagePreview(file, setter) {
        if (!this.isImage(file)) {
            setter(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setter(reader.result);
        reader.readAsDataURL(file);
    }
    // =========================================================
    //                     LOGOTIPO (IMAGEN)
    // =========================================================
    openLogoFilePicker() {
        this.logoFileInput?.nativeElement.click();
    }
    onLogoDragOver(e) {
        e.preventDefault();
        this.logoDragging = true;
    }
    onLogoDragLeave(_e) {
        this.logoDragging = false;
    }
    onLogoDrop(e) {
        e.preventDefault();
        this.logoDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleLogoFile(f);
    }
    onLogoFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleLogoFile(f);
    }
    clearLogoFile(e) {
        e.stopPropagation();
        this.logoPreviewUrl = null;
        this.logoFileName = null;
        if (this.logoFileInput)
            this.logoFileInput.nativeElement.value = '';
        this.clienteForm.patchValue({ logotipo: null });
        this.clienteForm.get('logotipo')?.setErrors(null); // ← sin 'required'
    }
    handleLogoFile(file) {
        if (!this.isAllowedImage(file)) {
            this.clienteForm.get('logotipo')?.setErrors({ invalid: true });
            return;
        }
        this.logoFileName = file.name;
        this.loadImagePreview(file, (url) => (this.logoPreviewUrl = url));
        this.clienteForm.patchValue({ logotipo: file });
        this.clienteForm.get('logotipo')?.setErrors(null);
        this.uploadLogo(file);
    }
    uploadLogo(file) {
        if (this.uploadingLogo)
            return;
        this.uploadingLogo = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'clientes');
        fd.append('idModule', '1'); // ajusta si tu backend usa otro id
        this.usuaService.uploadFile(fd)
            .pipe(finalize(() => (this.uploadingLogo = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.clienteForm.patchValue({ logotipo: url });
                    this.logoFileName = file.name; // mantenemos preview
                }
            },
            error: (err) => {
                console.error('[UPLOAD][logotipo]', err);
                // Opcional: limpiar en error
                // this.clearLogoFile(new Event('clear'));
            }
        });
    }
    // =========================================================
    //      CONSTANCIA DE SITUACIÓN FISCAL (PDF)
    // =========================================================
    openCsfFilePicker() {
        this.csfFileInput?.nativeElement.click();
    }
    onCsfDragOver(e) {
        e.preventDefault();
        this.csfDragging = true;
    }
    onCsfDragLeave(_e) {
        this.csfDragging = false;
    }
    onCsfDrop(e) {
        e.preventDefault();
        this.csfDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleCsfFile(f);
    }
    onCsfFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleCsfFile(f);
    }
    clearCsfFile(e) {
        e.stopPropagation();
        this.csfFileName = null;
        if (this.csfFileInput)
            this.csfFileInput.nativeElement.value = '';
        this.clienteForm.patchValue({ constanciaSituacionFiscal: null });
        this.clienteForm.get('constanciaSituacionFiscal')?.setErrors({ required: true });
    }
    handleCsfFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.clienteForm.get('constanciaSituacionFiscal')?.setErrors({ invalid: true });
            return;
        }
        this.csfFileName = file.name;
        this.clienteForm.patchValue({ constanciaSituacionFiscal: file });
        this.clienteForm.get('constanciaSituacionFiscal')?.setErrors(null);
        this.uploadCsf(file);
    }
    uploadCsf(file) {
        if (this.uploadingCsf)
            return;
        this.uploadingCsf = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'clientes');
        fd.append('idModule', '1');
        this.usuaService.uploadFile(fd).pipe(finalize(() => (this.uploadingCsf = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.clienteForm.patchValue({ constanciaSituacionFiscal: url });
                    this.csfFileName = file.name;
                }
            },
            error: (err) => {
                console.error('[UPLOAD][constanciaSituacionFiscal]', err);
            }
        });
    }
    // =========================================================
    //        COMPROBANTE DE DOMICILIO (PDF)
    // =========================================================
    openCompDomFilePicker() {
        this.compDomFileInput?.nativeElement.click();
    }
    onCompDomDragOver(e) {
        e.preventDefault();
        this.compDomDragging = true;
    }
    onCompDomDragLeave(_e) {
        this.compDomDragging = false;
    }
    onCompDomDrop(e) {
        e.preventDefault();
        this.compDomDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleCompDomFile(f);
    }
    onCompDomFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleCompDomFile(f);
    }
    clearCompDomFile(e) {
        e.stopPropagation();
        this.compDomFileName = null;
        if (this.compDomFileInput)
            this.compDomFileInput.nativeElement.value = '';
        this.clienteForm.patchValue({ comprobanteDomicilio: null });
        this.clienteForm.get('comprobanteDomicilio')?.setErrors({ required: true });
    }
    handleCompDomFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.clienteForm.get('comprobanteDomicilio')?.setErrors({ invalid: true });
            return;
        }
        this.compDomFileName = file.name;
        this.clienteForm.patchValue({ comprobanteDomicilio: file });
        this.clienteForm.get('comprobanteDomicilio')?.setErrors(null);
        this.uploadCompDom(file);
    }
    uploadCompDom(file) {
        if (this.uploadingCompDom)
            return;
        this.uploadingCompDom = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'clientes');
        fd.append('idModule', '1');
        this.usuaService.uploadFile(fd).pipe(finalize(() => (this.uploadingCompDom = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.clienteForm.patchValue({ comprobanteDomicilio: url });
                    this.compDomFileName = file.name;
                }
            },
            error: (err) => {
                console.error('[UPLOAD][comprobanteDomicilio]', err);
            }
        });
    }
    openActaFilePicker() {
        this.actaFileInput?.nativeElement.click();
    }
    onActaDragOver(e) {
        e.preventDefault();
        this.actaDragging = true;
    }
    onActaDragLeave(_e) {
        this.actaDragging = false;
    }
    onActaDrop(e) {
        e.preventDefault();
        this.actaDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleActaFile(f);
    }
    onActaFileSelected(e) {
        const f = e.target?.files?.[0];
        if (f)
            this.handleActaFile(f);
    }
    clearActaFile(e) {
        e.stopPropagation();
        this.actaFileName = null;
        if (this.actaFileInput)
            this.actaFileInput.nativeElement.value = '';
        this.clienteForm.patchValue({ actaConstitutiva: null });
        this.clienteForm.get('actaConstitutiva')?.setErrors({ required: true });
    }
    handleActaFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.clienteForm.get('actaConstitutiva')?.setErrors({ invalid: true });
            return;
        }
        this.actaFileName = file.name;
        this.clienteForm.patchValue({ actaConstitutiva: file });
        this.clienteForm.get('actaConstitutiva')?.setErrors(null);
        this.uploadActa(file);
    }
    uploadActa(file) {
        if (this.uploadingActa)
            return;
        this.uploadingActa = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'clientes');
        fd.append('idModule', '1');
        this.usuaService
            .uploadFile(fd)
            .pipe(finalize(() => (this.uploadingActa = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.clienteForm.patchValue({ actaConstitutiva: url });
                    this.actaFileName = file.name;
                }
            },
            error: (err) => {
                console.error('[UPLOAD][actaConstitutiva]', err);
            }
        });
    }
};
__decorate([
    ViewChild('logoFileInput')
], AltaClienteComponent.prototype, "logoFileInput", void 0);
__decorate([
    ViewChild('csfFileInput')
], AltaClienteComponent.prototype, "csfFileInput", void 0);
__decorate([
    ViewChild('compDomFileInput')
], AltaClienteComponent.prototype, "compDomFileInput", void 0);
__decorate([
    ViewChild('actaFileInput')
], AltaClienteComponent.prototype, "actaFileInput", void 0);
AltaClienteComponent = __decorate([
    Component({
        selector: 'vex-alta-cliente',
        templateUrl: './alta-cliente.component.html',
        styleUrl: './alta-cliente.component.scss',
        animations: [fadeInRight400ms]
    })
], AltaClienteComponent);
export { AltaClienteComponent };
//# sourceMappingURL=alta-cliente.component.js.map