import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let RegistrarMantenimientoCombustibleComponent = class RegistrarMantenimientoCombustibleComponent {
    constructor(route, fb, mantenimientosService, activatedRoute, alerts) {
        this.route = route;
        this.fb = fb;
        this.mantenimientosService = mantenimientosService;
        this.activatedRoute = activatedRoute;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Registrar Mantenimiento de Combustible';
        this.showRequiredMsgs = false;
        this.idMantenimiento = null;
        this.isEditMode = false;
        // Listas para selects
        this.listaInstalaciones = [];
        this.listaTiposCombustible = [];
        this.listaOperadores = [];
        this.instalacionesCargadas = false;
        this.tiposCombustibleCargados = false;
        this.operadoresCargados = false;
        this.datosMantenimiento = null;
    }
    ngOnInit() {
        this.initForm();
        this.activatedRoute.params.subscribe((params) => {
            this.idMantenimiento = params['id'] ? Number(params['id']) : null;
            if (this.idMantenimiento) {
                this.isEditMode = true;
                this.title = 'Actualizar Mantenimiento de Combustible';
                this.obtenerInstalaciones();
                this.obtenerTiposCombustible();
                this.obtenerOperadores();
                this.obtenerMantenimiento();
            }
            else {
                this.obtenerInstalaciones();
                this.obtenerTiposCombustible();
                this.obtenerOperadores();
            }
        });
    }
    initForm() {
        const now = new Date();
        this.mantenimientoForm = this.fb.group({
            idTipoCombustible: [null, Validators.required],
            cantidadCombustible: [null, Validators.required],
            precioCombustible: [null, Validators.required],
            idInstalacion: [null, Validators.required],
            estatus: [1, Validators.required],
            fechaHora: [now, Validators.required],
            kilometraje: [null, Validators.required],
            idOperador: [null, Validators.required]
        });
    }
    obtenerInstalaciones() {
        this.mantenimientosService.obtenerInstalaciones().subscribe({
            next: (response) => {
                this.listaInstalaciones = (response.data || response || []).map((item) => ({
                    ...item,
                    id: Number(item?.id ?? item?.Id ?? item?.ID)
                }));
                this.instalacionesCargadas = true;
                // Si hay datos de mantenimiento esperando, intentar llenar el formulario
                if (this.datosMantenimiento && this.todosLosDatosCargados()) {
                    this.llenarFormulario(this.datosMantenimiento);
                    this.datosMantenimiento = null;
                }
            },
            error: (error) => {
                console.error('Error al obtener instalaciones:', error);
                this.instalacionesCargadas = true;
            }
        });
    }
    obtenerTiposCombustible() {
        this.mantenimientosService.obtenerTiposCombustible().subscribe({
            next: (response) => {
                this.listaTiposCombustible = (response.data || response || []).map((item) => ({
                    ...item,
                    id: Number(item?.id ?? item?.Id ?? item?.ID)
                }));
                this.tiposCombustibleCargados = true;
                // Si hay datos de mantenimiento esperando, intentar llenar el formulario
                if (this.datosMantenimiento && this.todosLosDatosCargados()) {
                    this.llenarFormulario(this.datosMantenimiento);
                    this.datosMantenimiento = null;
                }
            },
            error: (error) => {
                console.error('Error al obtener tipos de combustible:', error);
                this.tiposCombustibleCargados = true;
            }
        });
    }
    obtenerOperadores() {
        this.mantenimientosService.obtenerOperadores().subscribe({
            next: (response) => {
                this.listaOperadores = (response.data || response || []).map((item) => ({
                    ...item,
                    id: Number(item?.id ?? item?.Id ?? item?.ID)
                }));
                this.operadoresCargados = true;
                // Si hay datos de mantenimiento esperando, intentar llenar el formulario
                if (this.datosMantenimiento && this.todosLosDatosCargados()) {
                    this.llenarFormulario(this.datosMantenimiento);
                    this.datosMantenimiento = null;
                }
            },
            error: (error) => {
                console.error('Error al obtener operadores:', error);
                this.operadoresCargados = true;
            }
        });
    }
    todosLosDatosCargados() {
        return this.instalacionesCargadas && this.tiposCombustibleCargados && this.operadoresCargados;
    }
    obtenerMantenimiento() {
        if (!this.idMantenimiento)
            return;
        this.loading = true;
        this.mantenimientosService.obtenerMantenimientoCombustiblePorId(this.idMantenimiento).subscribe({
            next: (response) => {
                const data = response.data || response;
                // Si todas las listas ya están cargadas, llenar el formulario directamente
                if (this.todosLosDatosCargados()) {
                    this.llenarFormulario(data);
                    this.loading = false;
                }
                else {
                    // Guardar los datos para llenar el formulario cuando las listas estén listas
                    this.datosMantenimiento = data;
                    this.loading = false;
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error:', error);
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al cargar los datos del mantenimiento.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.regresar();
            }
        });
    }
    llenarFormulario(data) {
        // Si data es un array, tomar el primer elemento
        if (Array.isArray(data) && data.length > 0) {
            data = data[0];
        }
        // Normalizar los datos del API (manejar variaciones de mayúsculas/minúsculas)
        const idTipoCombustible = data?.idTipoCombustible ?? data?.IdTipoCombustible ?? data?.ID_TIPO_COMBUSTIBLE ?? null;
        const cantidadCombustible = data?.cantidadCombustible ?? data?.CantidadCombustible ?? data?.CANTIDAD_COMBUSTIBLE ?? null;
        const precioCombustible = data?.precioCombustible ?? data?.PrecioCombustible ?? data?.PRECIO_COMBUSTIBLE ?? null;
        const idInstalacion = data?.idInstalacion ?? data?.IdInstalacion ?? data?.ID_INSTALACION ?? null;
        const estatus = data?.estatus ?? data?.Estatus ?? data?.ESTATUS ?? 1;
        const fechaHora = data?.fechaHora ?? data?.FechaHora ?? data?.FECHA_HORA ?? null;
        const kilometraje = data?.kilometraje ?? data?.Kilometraje ?? data?.KILOMETRAJE ?? null;
        const idOperador = data?.idOperador ?? data?.IdOperador ?? data?.ID_OPERADOR ?? null;
        // Preparar los valores para el formulario
        const formValues = {
            idTipoCombustible: idTipoCombustible != null && idTipoCombustible !== undefined ? Number(idTipoCombustible) : null,
            cantidadCombustible: cantidadCombustible != null && cantidadCombustible !== undefined ? Number(cantidadCombustible) : null,
            precioCombustible: precioCombustible != null && precioCombustible !== undefined ? Number(precioCombustible) : null,
            idInstalacion: idInstalacion != null && idInstalacion !== undefined ? Number(idInstalacion) : null,
            estatus: estatus != null && estatus !== undefined ? Number(estatus) : 1,
            fechaHora: fechaHora ? new Date(fechaHora) : new Date(),
            kilometraje: kilometraje != null && kilometraje !== undefined ? Number(kilometraje) : null,
            idOperador: idOperador != null && idOperador !== undefined ? Number(idOperador) : null
        };
        // Llenar el formulario con los datos normalizados usando setValue en cada control
        Object.keys(formValues).forEach(key => {
            const control = this.mantenimientoForm.get(key);
            if (control) {
                control.setValue(formValues[key], { emitEvent: false });
            }
        });
        // Actualizar validez de todos los controles
        this.mantenimientoForm.updateValueAndValidity({ emitEvent: false });
    }
    async submit() {
        this.showRequiredMsgs = true;
        if (this.mantenimientoForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                idTipoCombustible: 'Tipo de Combustible',
                cantidadCombustible: 'Cantidad de Combustible',
                precioCombustible: 'Precio de Combustible',
                idInstalacion: 'Instalación',
                estatus: 'Estatus',
                fechaHora: 'Fecha y Hora',
                kilometraje: 'Kilometraje',
                idOperador: 'Operador'
            };
            const camposFaltantes = [];
            Object.keys(this.mantenimientoForm.controls).forEach((key) => {
                const control = this.mantenimientoForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
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
                backdropClose: false
            });
            return;
        }
        this.submitButton = 'Cargando...';
        this.loading = true;
        const formValue = this.mantenimientoForm.getRawValue();
        const fechaHora = new Date(formValue.fechaHora);
        const payload = {
            idTipoCombustible: Number(formValue.idTipoCombustible),
            cantidadCombustible: Number(formValue.cantidadCombustible),
            precioCombustible: Number(formValue.precioCombustible),
            idInstalacion: Number(formValue.idInstalacion),
            estatus: Number(formValue.estatus || 1),
            fechaHora: fechaHora.toISOString(),
            kilometraje: Number(formValue.kilometraje),
            idOperador: Number(formValue.idOperador)
        };
        const request = this.isEditMode && this.idMantenimiento
            ? this.mantenimientosService.actualizarMantenimientoCombustible(this.idMantenimiento, payload)
            : this.mantenimientosService.agregarMantenimientoCombustible(payload);
        request.subscribe({
            next: () => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: this.isEditMode
                        ? 'Se actualizó el mantenimiento de combustible de manera exitosa.'
                        : 'Se registró el mantenimiento de combustible de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.regresar();
            },
            error: (error) => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: this.isEditMode
                        ? 'Ocurrió un error al actualizar el mantenimiento de combustible.'
                        : 'Ocurrió un error al registrar el mantenimiento de combustible.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                console.error('Error:', error);
            }
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/mantenimientos/mantenimiento-combustible');
    }
    allowOnlyNumbers(event) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            event.preventDefault();
            return false;
        }
        return true;
    }
};
RegistrarMantenimientoCombustibleComponent = __decorate([
    Component({
        selector: 'vex-registrar-mantenimiento-combustible',
        templateUrl: './registrar-mantenimiento-combustible.component.html',
        styleUrl: './registrar-mantenimiento-combustible.component.scss',
        animations: [fadeInRight400ms]
    })
], RegistrarMantenimientoCombustibleComponent);
export { RegistrarMantenimientoCombustibleComponent };
//# sourceMappingURL=registrar-mantenimiento-combustible.component.js.map