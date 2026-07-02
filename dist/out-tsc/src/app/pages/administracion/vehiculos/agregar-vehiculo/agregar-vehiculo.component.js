import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { finalize } from 'rxjs';
let AgregarVehiculoComponent = class AgregarVehiculoComponent {
    constructor(route, fb, opService, vehiService, activatedRouted, disposService, usuaService, clieService, alerts) {
        this.route = route;
        this.fb = fb;
        this.opService = opService;
        this.vehiService = vehiService;
        this.activatedRouted = activatedRouted;
        this.disposService = disposService;
        this.usuaService = usuaService;
        this.clieService = clieService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Vehículo';
        this.selectedFileName = '';
        this.previewUrl = null;
        this.MAX_MB = 3;
        this.fotoPreviewUrl = null;
        this.tcDragging = false;
        this.polizaDragging = false;
        this.permisoDragging = false;
        this.inspeccionDragging = false;
        this.tcFileName = null;
        this.polizaFileName = null;
        this.permisoFileName = null;
        this.inspeccionFileName = null;
        this.tcPreviewUrl = null;
        this.polizaPreviewUrl = null;
        this.permisoPreviewUrl = null;
        this.inspeccionPreviewUrl = null; // PDFs: sin preview
        this.uploadingTc = false;
        this.uploadingPoliza = false;
        this.uploadingPermiso = false;
        this.uploadingInspeccion = false;
        // Oculta mensajes de 'required' en el template
        this.showRequiredMsgs = false;
        this.fotoFileName = null;
        this.fotoDragging = false;
        this.uploadingFoto = false;
    }
    ngOnInit() {
        this.obtenerOperadores();
        this.obtenerDispositivos();
        this.obtenerClientes();
        this.obtenerTiposCombustible();
        this.initForm();
        this.activatedRouted.params.subscribe((params) => {
            this.idVehiculo = params['idVehiculo'];
            if (this.idVehiculo) {
                this.title = 'Actualizar Vehículo';
                this.obtenerVehiculoID();
            }
        });
    }
    obtenerClientes() {
        this.clieService.obtenerClientesList().subscribe((response) => {
            const raw = response?.data ?? response;
            this.listaClientes = (Array.isArray(raw) ? raw : []).map((c) => ({
                ...c,
                id: Number(c?.id ?? c?.Id ?? c?.ID)
            }));
        });
    }
    obtenerTiposCombustible() {
        this.vehiService.obtenerTiposCombustible().subscribe({
            next: (response) => {
                this.listaTiposCombustible = (response.data || response || []).map((tipo) => ({
                    ...tipo,
                    id: Number(tipo?.id ?? tipo?.Id ?? tipo?.ID ?? tipo?.idCombustible ?? tipo?.IdCombustible)
                }));
            },
            error: (error) => {
                console.error('Error al obtener tipos de combustible:', error);
            }
        });
    }
    obtenerDispositivos() {
        this.loading = true;
        this.disposService.obtenerDispositivos().subscribe({
            next: (res) => {
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
                if (Array.isArray(res?.dispositivos)) {
                    this.listaDispositivos = [...res.dispositivos].sort((a, b) => b.Id - a.Id);
                }
                else {
                    console.error('El formato de datos recibido no es el esperado.');
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error al obtener dispositivos:', error);
            }
        });
    }
    obtenerOperadores() {
        this.loading = true;
        this.opService.obtenerOperadores().subscribe({
            next: (res) => {
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
                this.listaOperadores = (res?.operadores ?? [])
                    .map((op) => ({
                    ...op,
                    FechaNacimiento: op.FechaNacimiento
                        ? op.FechaNacimiento.split('T')[0]
                        : ''
                }))
                    .sort((a, b) => b.Id - a.Id);
            },
            error: (error) => {
                this.loading = false;
                console.error('Error al obtener operadores:', error);
            }
        });
    }
    obtenerVehiculoID() {
        this.vehiService
            .obtenerVehiculo(this.idVehiculo)
            .subscribe((response) => {
            const raw = Array.isArray(response?.data)
                ? response.data[0]
                : response?.vehiculo ?? response?.data ?? response ?? {};
            const get = (o, keys) => {
                for (const k of keys)
                    if (o?.[k] !== undefined && o?.[k] !== null)
                        return o[k];
                return null;
            };
            const marca = get(raw, ['marca', 'Marca']);
            const modelo = get(raw, ['modelo', 'Modelo']);
            const ano = get(raw, ['ano', 'año', 'Ano', 'Año']);
            const placa = get(raw, ['placa', 'Placa']);
            const numeroEconomico = get(raw, [
                'numeroEconomico',
                'NumeroEconomico'
            ]);
            const tarjetaCirculacion = get(raw, [
                'tarjetaCirculacion',
                'TarjetaCirculacion'
            ]);
            const polizaSeguro = get(raw, ['polizaSeguro', 'PolizaSeguro']);
            const permisoConcesion = get(raw, [
                'permisoConcesion',
                'PermisoConcesion'
            ]);
            const inspeccionMecanica = get(raw, [
                'inspeccionMecanica',
                'InspeccionMecanica'
            ]);
            const foto = get(raw, ['foto', 'Foto']);
            const est = get(raw, ['estatus', 'Estatus']);
            const idCli = get(raw, [
                'idCliente',
                'idcliente',
                'IdCliente',
                'IDCliente'
            ]);
            const km = get(raw, ['km', 'Km', 'KM']);
            const idComb = get(raw, [
                'idCombustible',
                'idcombustible',
                'IdCombustible',
                'IDCombustible'
            ]);
            const capacidad = get(raw, [
                'capacidadLitros',
                'capacidadlitros',
                'CapacidadLitros',
                'capacidad'
            ]);
            const pasajerosSent = get(raw, [
                'pasajerosSentados',
                'pasajerossentados',
                'PasajerosSentados',
                'pasajerosSentados'
            ]);
            const pasajerosPar = get(raw, [
                'pasajerosParados',
                'pasajerosparados',
                'PasajerosParados',
                'pasajerosParados'
            ]);
            const cantidadPuertas = get(raw, [
                'cantidadPuertas',
                'cantidadpuertas',
                'CantidadPuertas',
                'cantidadPuertas'
            ]);
            this.vehiculosForm.patchValue({
                marca: marca ?? '',
                modelo: modelo ?? '',
                ano: ano ?? '',
                placa: placa ?? '',
                numeroEconomico: numeroEconomico ?? '',
                tarjetaCirculacion: tarjetaCirculacion ?? '',
                polizaSeguro: polizaSeguro ?? '',
                permisoConcesion: permisoConcesion ?? '',
                inspeccionMecanica: inspeccionMecanica ?? '',
                foto: foto ?? null,
                estatus: est != null && !Number.isNaN(Number(est)) ? Number(est) : 1,
                idCliente: idCli != null && idCli !== '' ? Number(idCli) : null,
                km: km != null && !Number.isNaN(Number(km)) ? Number(km) : null,
                idCombustible: idComb != null && idComb !== '' ? Number(idComb) : null,
                capacidadLitros: capacidad != null && !Number.isNaN(Number(capacidad)) ? Number(capacidad) : null,
                pasajerosSentados: pasajerosSent != null && !Number.isNaN(Number(pasajerosSent)) ? Number(pasajerosSent) : null,
                pasajerosParados: pasajerosPar != null && !Number.isNaN(Number(pasajerosPar)) ? Number(pasajerosPar) : null,
                cantidadPuertas: cantidadPuertas != null && !Number.isNaN(Number(cantidadPuertas)) ? Number(cantidadPuertas) : null
            });
        });
    }
    initForm() {
        this.vehiculosForm = this.fb.group({
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            ano: [null, Validators.required],
            placa: ['', [Validators.required, Validators.maxLength(10)]],
            numeroEconomico: ['', Validators.required],
            tarjetaCirculacion: ['', Validators.required],
            polizaSeguro: ['', Validators.required],
            permisoConcesion: ['', Validators.required],
            inspeccionMecanica: ['', Validators.required],
            foto: ['', Validators.required],
            estatus: [1, Validators.required],
            idCliente: [null, Validators.required],
            km: [null, Validators.required],
            idCombustible: [null, Validators.required],
            capacidadLitros: [null, Validators.required],
            pasajerosSentados: [null, Validators.required],
            pasajerosParados: [null, Validators.required],
            cantidadPuertas: [null, Validators.required]
            // idOperador: ['', Validators.required],
            // idDispositivo: ['', Validators.required],
        });
    }
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idVehiculo) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.vehiculosForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                marca: 'Marca',
                modelo: 'Modelo',
                ano: 'Año',
                placa: 'Placa',
                numeroEconomico: 'Número Económico',
                idCliente: 'Cliente',
                tarjetaCirculacion: 'Tarjeta de Circulación',
                polizaSeguro: 'Póliza de Seguro',
                permisoConcesion: 'Permiso de Concesión',
                inspeccionMecanica: 'Inspección Mecánica',
                foto: 'Foto',
                km: 'Rendimiento x Litros',
                idCombustible: 'Tipo de Combustible',
                capacidadLitros: 'Capacidad de Combustible',
                pasajerosSentados: 'Pasajeros Sentados',
                pasajerosParados: 'Pasajeros Parados',
            };
            const camposFaltantes = [];
            Object.keys(this.vehiculosForm.controls).forEach((key) => {
                const control = this.vehiculosForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
                if (key === 'placa' && control?.invalid && control.errors?.['maxlength']) {
                    camposFaltantes.push('Placa (máximo 10 caracteres)');
                }
            });
            const lista = camposFaltantes.map((campo, i) => `
    <div style="padding:8px 12px; border-left:4px solid #d9534f; background:#caa8a8; text-align:center; margin-bottom:8px; border-radius:4px;">
      <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
    </div>
  `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
      <p style="text-align:center; font-size:15px; margin-bottom:16px;">
        Hay campos obligatorios sin completar.
      </p>
      <div style="max-height:350px; overflow-y:auto;">${lista}</div>
    `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        this.vehiculosForm.removeControl('id');
        const raw = this.vehiculosForm.getRawValue();
        const payload = {
            ...raw,
            ano: Number(raw.ano),
            km: raw.km != null ? Number(raw.km) : null,
            idCombustible: raw.idCombustible != null ? Number(raw.idCombustible) : null,
            capacidadLitros: raw.capacidadLitros != null ? Number(raw.capacidadLitros) : null,
            pasajerosSentados: raw.pasajerosSentados != null ? Number(raw.pasajerosSentados) : null,
            pasajerosParados: raw.pasajerosParados != null ? Number(raw.pasajerosParados) : null
        };
        this.vehiService.agregarVehiculo(payload).subscribe(() => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Se agregó un nuevo vehículo de manera exitosa.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
            this.regresar();
        }, () => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Ocurrió un error al agregar el vehículo.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.vehiculosForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                marca: 'Marca',
                modelo: 'Modelo',
                ano: 'Año',
                placa: 'Placa',
                numeroEconomico: 'Número Económico',
                idCliente: 'Cliente',
                tarjetaCirculacion: 'Tarjeta de Circulación',
                polizaSeguro: 'Póliza de Seguro',
                permisoConcesion: 'Permiso de Concesión',
                inspeccionMecanica: 'Inspección Mecánica',
                foto: 'Foto',
                km: 'Rendimiento x Litros',
                idCombustible: 'Tipo de Combustible',
                capacidadLitros: 'Capacidad de Combustible',
                pasajerosSentados: 'Pasajeros Sentados',
                pasajerosParados: 'Pasajeros Parados',
            };
            const camposFaltantes = [];
            Object.keys(this.vehiculosForm.controls).forEach((key) => {
                const control = this.vehiculosForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
                if (key === 'placa' && control?.invalid && control.errors?.['maxlength']) {
                    camposFaltantes.push('Placa (máximo 10 caracteres)');
                }
            });
            const lista = camposFaltantes.map((campo, i) => `
    <div style="padding:8px 12px; border-left:4px solid #d9534f; background:#caa8a8; text-align:center; margin-bottom:8px; border-radius:4px;">
      <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
    </div>
  `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
      <p style="text-align:center; font-size:15px; margin-bottom:16px;">
        Hay campos obligatorios sin completar.
      </p>
      <div style="max-height:350px; overflow-y:auto;">${lista}</div>
    `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        const raw = this.vehiculosForm.getRawValue();
        const payload = {
            ...raw,
            ano: Number(raw.ano),
            km: raw.km != null ? Number(raw.km) : null,
            idCombustible: raw.idCombustible != null ? Number(raw.idCombustible) : null,
            capacidadLitros: raw.capacidadLitros != null ? Number(raw.capacidadLitros) : null,
            pasajerosSentados: raw.pasajerosSentados != null ? Number(raw.pasajerosSentados) : null,
            pasajerosParados: raw.pasajerosParados != null ? Number(raw.pasajerosParados) : null
        };
        this.vehiService.actualizarVehiculo(this.idVehiculo, payload).subscribe(() => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Los datos del vehículo se actualizaron correctamente.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
            this.regresar();
        }, () => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Ocurrió un error al actualizar el vehículo.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/vehiculos');
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
    isAllowed(file) {
        const okImg = this.isImage(file);
        const okDoc = /(pdf|msword|officedocument|excel)/i.test(file.type);
        return (okImg || okDoc) && file.size <= this.MAX_MB * 1024 * 1024;
    }
    isImage(file) {
        return /^image\/(png|jpe?g|webp)$/i.test(file.type);
    }
    // tarjeta circulación
    openTcFilePicker() {
        this.tcFileInput.nativeElement.click();
    }
    onTcDragOver(e) {
        e.preventDefault();
        this.tcDragging = true;
    }
    onTcDragLeave(_e) {
        this.tcDragging = false;
    }
    onTcDrop(e) {
        e.preventDefault();
        this.tcDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleTcFile(f);
    }
    onTcFileSelected(e) {
        const f = e.target.files?.[0];
        if (f)
            this.handleTcFile(f);
    }
    clearTcFile(e) {
        e.stopPropagation();
        this.tcPreviewUrl = null;
        this.tcFileName = null;
        this.tcFileInput.nativeElement.value = '';
        this.vehiculosForm.patchValue({ tarjetaCirculacion: null });
        this.vehiculosForm.get('tarjetaCirculacion')?.setErrors({ required: true });
    }
    handleTcFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.vehiculosForm
                .get('tarjetaCirculacion')
                ?.setErrors({ invalid: true });
            return;
        }
        this.tcFileName = file.name;
        this.vehiculosForm.patchValue({ tarjetaCirculacion: file });
        this.vehiculosForm.get('tarjetaCirculacion')?.setErrors(null);
        this.uploadTarjeta(file);
    }
    uploadTarjeta(file) {
        if (this.uploadingTc)
            return;
        this.uploadingTc = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'vehiculos');
        fd.append('idModule', '10');
        this.usuaService
            .uploadFile(fd)
            .pipe(finalize(() => (this.uploadingTc = false)) // <-- siempre apaga
        )
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.vehiculosForm.patchValue({ tarjetaCirculacion: url });
                    this.tcPreviewUrl = null;
                    this.tcFileName = file.name;
                }
            },
            error: (err) => console.error('[UPLOAD][tarjetaCirculacion]', err)
        });
    }
    // póliza seguro
    openPolizaFilePicker() {
        this.polizaFileInput.nativeElement.click();
    }
    onPolizaDragOver(e) {
        e.preventDefault();
        this.polizaDragging = true;
    }
    onPolizaDragLeave(_e) {
        this.polizaDragging = false;
    }
    onPolizaDrop(e) {
        e.preventDefault();
        this.polizaDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handlePolizaFile(f);
    }
    onPolizaFileSelected(e) {
        const f = e.target.files?.[0];
        if (f)
            this.handlePolizaFile(f);
    }
    clearPolizaFile(e) {
        e.stopPropagation();
        this.polizaPreviewUrl = null;
        this.polizaFileName = null;
        this.polizaFileInput.nativeElement.value = '';
        this.vehiculosForm.patchValue({ polizaSeguro: null });
        this.vehiculosForm.get('polizaSeguro')?.setErrors({ required: true });
    }
    handlePolizaFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.vehiculosForm.get('polizaSeguro')?.setErrors({ invalid: true });
            return;
        }
        this.polizaFileName = file.name;
        this.vehiculosForm.patchValue({ polizaSeguro: file });
        this.vehiculosForm.get('polizaSeguro')?.setErrors(null);
        this.uploadPoliza(file);
    }
    uploadPoliza(file) {
        if (this.uploadingPoliza)
            return;
        this.uploadingPoliza = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'vehiculos');
        fd.append('idModule', '10');
        this.usuaService
            .uploadFile(fd)
            .pipe(finalize(() => (this.uploadingPoliza = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.vehiculosForm.patchValue({ polizaSeguro: url });
                    this.polizaPreviewUrl = null;
                    this.polizaFileName = file.name;
                }
            },
            error: (err) => console.error('[UPLOAD][polizaSeguro]', err)
        });
    }
    // permiso concesión
    openPermisoFilePicker() {
        this.permisoFileInput.nativeElement.click();
    }
    onPermisoDragOver(e) {
        e.preventDefault();
        this.permisoDragging = true;
    }
    onPermisoDragLeave(_e) {
        this.permisoDragging = false;
    }
    onPermisoDrop(e) {
        e.preventDefault();
        this.permisoDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handlePermisoFile(f);
    }
    onPermisoFileSelected(e) {
        const f = e.target.files?.[0];
        if (f)
            this.handlePermisoFile(f);
    }
    clearPermisoFile(e) {
        e.stopPropagation();
        this.permisoPreviewUrl = null;
        this.permisoFileName = null;
        this.permisoFileInput.nativeElement.value = '';
        this.vehiculosForm.patchValue({ permisoConcesion: null });
        this.vehiculosForm.get('permisoConcesion')?.setErrors({ required: true });
    }
    handlePermisoFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.vehiculosForm.get('permisoConcesion')?.setErrors({ invalid: true });
            return;
        }
        this.permisoFileName = file.name;
        this.vehiculosForm.patchValue({ permisoConcesion: file });
        this.vehiculosForm.get('permisoConcesion')?.setErrors(null);
        this.uploadPermiso(file);
    }
    uploadPermiso(file) {
        if (this.uploadingPermiso)
            return;
        this.uploadingPermiso = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'vehiculos');
        fd.append('idModule', '10');
        this.usuaService
            .uploadFile(fd)
            .pipe(finalize(() => (this.uploadingPermiso = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.vehiculosForm.patchValue({ permisoConcesion: url });
                    this.permisoPreviewUrl = null;
                    this.permisoFileName = file.name;
                }
            },
            error: (err) => console.error('[UPLOAD][permisoConcesion]', err)
        });
    }
    // inspección mecánica
    openInspeccionFilePicker() {
        this.inspeccionFileInput.nativeElement.click();
    }
    onInspeccionDragOver(e) {
        e.preventDefault();
        this.inspeccionDragging = true;
    }
    onInspeccionDragLeave(_e) {
        this.inspeccionDragging = false;
    }
    onInspeccionDrop(e) {
        e.preventDefault();
        this.inspeccionDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleInspeccionFile(f);
    }
    onInspeccionFileSelected(e) {
        const f = e.target.files?.[0];
        if (f)
            this.handleInspeccionFile(f);
    }
    clearInspeccionFile(e) {
        e.stopPropagation();
        this.inspeccionPreviewUrl = null;
        this.inspeccionFileName = null;
        this.inspeccionFileInput.nativeElement.value = '';
        this.vehiculosForm.patchValue({ inspeccionMecanica: null });
        this.vehiculosForm.get('inspeccionMecanica')?.setErrors({ required: true });
    }
    handleInspeccionFile(file) {
        if (!this.isAllowedPdf(file)) {
            this.vehiculosForm
                .get('inspeccionMecanica')
                ?.setErrors({ invalid: true });
            return;
        }
        this.inspeccionFileName = file.name;
        this.vehiculosForm.patchValue({ inspeccionMecanica: file });
        this.vehiculosForm.get('inspeccionMecanica')?.setErrors(null);
        this.uploadInspeccion(file);
    }
    uploadInspeccion(file) {
        if (this.uploadingInspeccion)
            return;
        this.uploadingInspeccion = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'vehiculos');
        fd.append('idModule', '10');
        this.usuaService
            .uploadFile(fd)
            .pipe(finalize(() => (this.uploadingInspeccion = false)))
            .subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.vehiculosForm.patchValue({ inspeccionMecanica: url });
                    this.inspeccionPreviewUrl = null;
                    this.inspeccionFileName = file.name;
                }
            },
            error: (err) => console.error('[UPLOAD][inspeccionMecanica]', err)
        });
    }
    // 1) util: solo PDF (máx MB)
    isAllowedPdf(file) {
        return (file.type === 'application/pdf' && file.size <= this.MAX_MB * 1024 * 1024);
    }
    allowOnlyNumbers(event) {
        const charCode = event.keyCode ? event.keyCode : event.which;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }
    isAllowedImage(file) {
        return this.isImage(file) && file.size <= this.MAX_MB * 1024 * 1024;
    }
    openFotoFilePicker() {
        this.fotoFileInput.nativeElement.click();
    }
    onFotoDragOver(e) {
        e.preventDefault();
        this.fotoDragging = true;
    }
    onFotoDragLeave(_e) {
        this.fotoDragging = false;
    }
    onFotoDrop(e) {
        e.preventDefault();
        this.fotoDragging = false;
        const f = e.dataTransfer?.files?.[0];
        if (f)
            this.handleFotoFile(f);
    }
    onFotoFileSelected(e) {
        const f = e.target.files?.[0];
        if (f)
            this.handleFotoFile(f);
    }
    clearFotoFile(e) {
        e.stopPropagation();
        this.fotoPreviewUrl = null;
        this.fotoFileName = null;
        this.fotoFileInput.nativeElement.value = '';
        this.vehiculosForm.patchValue({ foto: null });
        this.vehiculosForm.get('foto')?.setErrors({ required: true });
    }
    handleFotoFile(file) {
        if (!this.isAllowedImage(file)) {
            this.vehiculosForm.get('foto')?.setErrors({ invalid: true });
            return;
        }
        this.fotoFileName = file.name;
        this.loadImagePreview(file, (url) => (this.fotoPreviewUrl = url));
        this.vehiculosForm.patchValue({ foto: file });
        this.vehiculosForm.get('foto')?.setErrors(null);
        this.uploadFoto(file);
    }
    uploadFoto(file) {
        if (this.uploadingFoto)
            return;
        this.uploadingFoto = true;
        const fd = new FormData();
        fd.append('file', file, file.name);
        fd.append('folder', 'vehiculos');
        fd.append('idModule', '10');
        this.usuaService.uploadFile(fd).subscribe({
            next: (res) => {
                const url = this.extractFileUrl(res);
                if (url) {
                    this.vehiculosForm.patchValue({ foto: url });
                    this.fotoPreviewUrl = this.fotoPreviewUrl;
                    this.fotoFileName = file.name;
                }
            },
            error: (err) => {
                console.error('[UPLOAD][foto]', err);
                // Si quieres, puedes dejar el File o limpiar:
                // this.vehiculosForm.patchValue({ foto: null });
                // this.fotoPreviewUrl = null;
                // this.fotoFileName = null;
                // this.vehiculosForm.get('foto')?.setErrors({ uploadFailed: true });
            },
            complete: () => {
                this.uploadingFoto = false;
            }
        });
    }
};
__decorate([
    ViewChild('tcFileInput')
], AgregarVehiculoComponent.prototype, "tcFileInput", void 0);
__decorate([
    ViewChild('polizaFileInput')
], AgregarVehiculoComponent.prototype, "polizaFileInput", void 0);
__decorate([
    ViewChild('permisoFileInput')
], AgregarVehiculoComponent.prototype, "permisoFileInput", void 0);
__decorate([
    ViewChild('inspeccionFileInput')
], AgregarVehiculoComponent.prototype, "inspeccionFileInput", void 0);
__decorate([
    ViewChild('fotoFileInput')
], AgregarVehiculoComponent.prototype, "fotoFileInput", void 0);
AgregarVehiculoComponent = __decorate([
    Component({
        selector: 'vex-agregar-vehiculo',
        templateUrl: './agregar-vehiculo.component.html',
        styleUrl: './agregar-vehiculo.component.scss',
        animations: [fadeInRight400ms]
    })
], AgregarVehiculoComponent);
export { AgregarVehiculoComponent };
//# sourceMappingURL=agregar-vehiculo.component.js.map