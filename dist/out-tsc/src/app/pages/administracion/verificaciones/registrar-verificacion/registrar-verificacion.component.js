import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let RegistrarVerificacionComponent = class RegistrarVerificacionComponent {
    constructor(route, activatedRoute, fb, mantenimientosService, alerts) {
        this.route = route;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.mantenimientosService = mantenimientosService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Registrar Verificación';
        this.showRequiredMsgs = false;
        this.idVerificacion = null;
        this.isEditMode = false;
        // Listas para selects
        this.listaInstalaciones = [];
        this.listaOperadores = [];
        this.listaTiposVerificacion = [];
        // Flags para sincronizar carga de datos
        this.instalacionesCargadas = false;
        this.operadoresCargados = false;
        this.tiposVerificacionCargados = false;
        this.datosVerificacion = null;
        this.notaVerificacionFile = null;
        this.notaVerificacionFileName = '';
        this.notaVerificacionPreviewUrl = null;
        this.notaVerificacionDragging = false;
    }
    ngOnInit() {
        this.initForm();
        this.obtenerInstalaciones();
        this.obtenerOperadores();
        this.obtenerTiposVerificacion();
        this.activatedRoute.params.subscribe((params) => {
            this.idVerificacion = params['id'] ? Number(params['id']) : null;
            if (this.idVerificacion) {
                this.isEditMode = true;
                this.title = 'Actualizar Verificación';
                // En modo edición, el archivo no es obligatorio
                this.verificacionForm.get('notaVerificacion')?.clearValidators();
                this.verificacionForm.get('notaVerificacion')?.updateValueAndValidity();
                this.obtenerVerificacion();
            }
        });
    }
    initForm() {
        this.verificacionForm = this.fb.group({
            verificacionActual: [null, Validators.required],
            proximaVerificacion: [null, Validators.required],
            idInstalacion: [null, Validators.required],
            idOperador: [null, Validators.required],
            notaVerificacion: [null, Validators.required],
            idTipoVerificacion: [null, Validators.required],
            evaluacion: ['{}'] // Oculto pero necesario para el API
        });
    }
    obtenerInstalaciones() {
        this.mantenimientosService.obtenerInstalaciones().subscribe({
            next: (response) => {
                this.listaInstalaciones = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
                this.instalacionesCargadas = true;
                // Si hay datos de verificación esperando, intentar llenar el formulario
                if (this.datosVerificacion) {
                    this.todosLosDatosCargados();
                }
            },
            error: (error) => {
                console.error('Error al obtener instalaciones:', error);
                this.instalacionesCargadas = true;
            }
        });
    }
    obtenerOperadores() {
        this.mantenimientosService.obtenerOperadores().subscribe({
            next: (response) => {
                this.listaOperadores = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
                this.operadoresCargados = true;
                // Si hay datos de verificación esperando, intentar llenar el formulario
                if (this.datosVerificacion) {
                    this.todosLosDatosCargados();
                }
            },
            error: (error) => {
                console.error('Error al obtener operadores:', error);
                this.operadoresCargados = true;
            }
        });
    }
    obtenerTiposVerificacion() {
        this.mantenimientosService.obtenerTiposVerificacion().subscribe({
            next: (response) => {
                this.listaTiposVerificacion = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
                this.tiposVerificacionCargados = true;
                // Si hay datos de verificación esperando, intentar llenar el formulario
                if (this.datosVerificacion) {
                    this.todosLosDatosCargados();
                }
            },
            error: (error) => {
                console.error('Error al obtener tipos de verificación:', error);
                this.tiposVerificacionCargados = true;
            }
        });
    }
    obtenerVerificacion() {
        if (!this.idVerificacion)
            return;
        this.loading = true;
        this.mantenimientosService.obtenerVerificacionPorId(this.idVerificacion).subscribe({
            next: (response) => {
                // La respuesta puede venir como { data: [{...}] } o { data: {...} } o directamente {...}
                let data = response.data || response;
                // Si data es un array, tomar el primer elemento
                if (Array.isArray(data) && data.length > 0) {
                    data = data[0];
                }
                this.loading = false;
                // Si todos los datos están cargados, llenar el formulario directamente
                if (this.todosLosDatosCargados()) {
                    this.llenarFormulario(data);
                }
                else {
                    // Guardar los datos para llenar el formulario cuando todos los datos estén listos
                    this.datosVerificacion = data;
                }
            },
            error: (error) => {
                this.loading = false;
                console.error('Error:', error);
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al cargar los datos de la verificación.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.cancelar();
            }
        });
    }
    todosLosDatosCargados() {
        const todosCargados = this.instalacionesCargadas && this.operadoresCargados && this.tiposVerificacionCargados;
        // Si todos están cargados y hay datos esperando, llenar el formulario
        if (todosCargados && this.datosVerificacion) {
            const datos = this.datosVerificacion;
            this.datosVerificacion = null; // Limpiar para evitar llenar múltiples veces
            this.llenarFormulario(datos);
        }
        return todosCargados;
    }
    llenarFormulario(data) {
        // Si data es un array, tomar el primer elemento
        if (Array.isArray(data) && data.length > 0) {
            data = data[0];
        }
        // Normalizar los datos del API (manejar variaciones de mayúsculas/minúsculas)
        const idInstalacion = data?.idInstalacion ?? data?.IdInstalacion ?? data?.ID_INSTALACION ?? data?.id_instalacion ?? null;
        const idOperador = data?.idOperador ?? data?.IdOperador ?? data?.ID_OPERADOR ?? data?.id_operador ?? null;
        const idTipoVerificacion = data?.idTipoVerificacion ?? data?.IdTipoVerificacion ?? data?.ID_TIPO_VERIFICACION ?? data?.id_tipo_verificacion ?? null;
        const verificacionActual = data?.verificacionActual ?? data?.VerificacionActual ?? data?.VERIFICACION_ACTUAL ?? null;
        const proximaVerificacion = data?.proximaVerificacion ?? data?.ProximaVerificacion ?? data?.PROXIMA_VERIFICACION ?? null;
        const notaVerificacion = data?.notaVerificacion ?? data?.NotaVerificacion ?? data?.NOTA_VERIFICACION ?? null;
        const evaluacion = data?.evaluacion ?? data?.Evaluacion ?? data?.EVALUACION ?? '{}';
        // Preparar los valores para el formulario
        const formValues = {
            idInstalacion: idInstalacion != null && idInstalacion !== undefined ? Number(idInstalacion) : null,
            idOperador: idOperador != null && idOperador !== undefined ? Number(idOperador) : null,
            idTipoVerificacion: idTipoVerificacion != null && idTipoVerificacion !== undefined ? Number(idTipoVerificacion) : null,
            verificacionActual: verificacionActual ? new Date(verificacionActual + 'T00:00:00') : null,
            proximaVerificacion: proximaVerificacion ? new Date(proximaVerificacion + 'T00:00:00') : null,
            evaluacion: evaluacion != null ? (typeof evaluacion === 'string' ? evaluacion : JSON.stringify(evaluacion)) : '{}'
        };
        // Llenar el formulario con los datos normalizados usando setValue en cada control
        Object.keys(formValues).forEach(key => {
            const control = this.verificacionForm.get(key);
            if (control) {
                control.setValue(formValues[key], { emitEvent: false });
            }
        });
        // Si hay una nota de verificación (URL), mostrar preview
        if (notaVerificacion && typeof notaVerificacion === 'string') {
            this.notaVerificacionPreviewUrl = notaVerificacion;
            this.notaVerificacionFileName = 'Nota de verificación';
            // En modo edición, no requerir el archivo si ya existe una URL
            this.verificacionForm.get('notaVerificacion')?.clearValidators();
            this.verificacionForm.get('notaVerificacion')?.updateValueAndValidity();
        }
        // Actualizar validez de todos los controles
        setTimeout(() => {
            this.verificacionForm.updateValueAndValidity({ emitEvent: false });
        }, 100);
    }
    openNotaVerificacionFilePicker() {
        if (this.notaVerificacionInput?.nativeElement) {
            this.notaVerificacionInput.nativeElement.click();
        }
    }
    onNotaVerificacionFileSelected(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            this.handleNotaVerificacionFile(input.files[0]);
        }
    }
    handleNotaVerificacionFile(file) {
        if (!file.type.startsWith('image/')) {
            this.alerts.open({
                type: 'error',
                title: 'Error',
                message: 'El archivo debe ser una imagen.',
                confirmText: 'Entendido'
            });
            return;
        }
        this.notaVerificacionFile = file;
        this.notaVerificacionFileName = file.name;
        this.verificacionForm.patchValue({ notaVerificacion: file });
        // Preview de imagen
        const reader = new FileReader();
        reader.onload = (e) => {
            this.notaVerificacionPreviewUrl = e.target?.result || null;
        };
        reader.readAsDataURL(file);
    }
    clearNotaVerificacionFile(event) {
        event.stopPropagation();
        this.notaVerificacionFile = null;
        this.notaVerificacionFileName = '';
        this.notaVerificacionPreviewUrl = null;
        this.verificacionForm.patchValue({ notaVerificacion: null });
        if (this.notaVerificacionInput?.nativeElement) {
            this.notaVerificacionInput.nativeElement.value = '';
        }
    }
    onNotaVerificacionDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.notaVerificacionDragging = true;
    }
    onNotaVerificacionDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.notaVerificacionDragging = false;
    }
    onNotaVerificacionDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.notaVerificacionDragging = false;
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            this.handleNotaVerificacionFile(file);
        }
    }
    async submit() {
        this.showRequiredMsgs = true;
        if (this.verificacionForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                verificacionActual: 'Fecha de Verificación Actual',
                proximaVerificacion: 'Fecha de Próxima Verificación',
                idInstalacion: 'Instalación',
                idOperador: 'Operador',
                notaVerificacion: 'Nota de Verificación',
                idTipoVerificacion: 'Tipo de Verificación',
                evaluacion: 'Evaluación'
            };
            const camposFaltantes = [];
            Object.keys(this.verificacionForm.controls).forEach((key) => {
                const control = this.verificacionForm.get(key);
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
        const formValue = this.verificacionForm.getRawValue();
        const formData = new FormData();
        // Agregar campos al FormData
        formData.append('verificacionActual', this.formatDate(formValue.verificacionActual));
        formData.append('proximaVerificacion', this.formatDate(formValue.proximaVerificacion));
        formData.append('idInstalacion', String(formValue.idInstalacion));
        formData.append('idOperador', String(formValue.idOperador));
        formData.append('idTipoVerificacion', String(formValue.idTipoVerificacion));
        if (formValue.notaVerificacion) {
            formData.append('notaVerificacion', formValue.notaVerificacion);
        }
        // Validar y agregar evaluación como JSON
        try {
            const evaluacionObj = typeof formValue.evaluacion === 'string'
                ? JSON.parse(formValue.evaluacion)
                : formValue.evaluacion;
            formData.append('evaluacion', JSON.stringify(evaluacionObj));
        }
        catch (error) {
            await this.alerts.open({
                type: 'error',
                title: 'Error',
                message: 'El campo evaluación debe ser un JSON válido.',
                confirmText: 'Entendido'
            });
            this.submitButton = 'Guardar';
            this.loading = false;
            return;
        }
        const request = this.isEditMode && this.idVerificacion
            ? this.mantenimientosService.actualizarVerificacion(this.idVerificacion, formData)
            : this.mantenimientosService.agregarVerificacion(formData);
        request.subscribe({
            next: async (response) => {
                this.loading = false;
                this.submitButton = 'Guardar';
                await this.alerts.open({
                    type: 'success',
                    title: '¡Éxito!',
                    message: this.isEditMode
                        ? 'La verificación se ha actualizado correctamente.'
                        : 'La verificación se ha registrado correctamente.',
                    confirmText: 'Aceptar'
                });
                this.route.navigate(['/administracion/verificaciones']);
            },
            error: async (error) => {
                this.loading = false;
                this.submitButton = 'Guardar';
                const errorMessage = error?.error?.message || error?.message ||
                    (this.isEditMode ? 'Error al actualizar la verificación.' : 'Error al registrar la verificación.');
                await this.alerts.open({
                    type: 'error',
                    title: 'Error',
                    message: errorMessage,
                    confirmText: 'Entendido'
                });
            }
        });
    }
    formatDate(date) {
        if (!date)
            return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
    }
    cancelar() {
        this.route.navigate(['/administracion/verificaciones']);
    }
};
__decorate([
    ViewChild('notaVerificacionInput')
], RegistrarVerificacionComponent.prototype, "notaVerificacionInput", void 0);
RegistrarVerificacionComponent = __decorate([
    Component({
        selector: 'vex-registrar-verificacion',
        templateUrl: './registrar-verificacion.component.html',
        styleUrl: './registrar-verificacion.component.scss',
        animations: [fadeInRight400ms]
    })
], RegistrarVerificacionComponent);
export { RegistrarVerificacionComponent };
//# sourceMappingURL=registrar-verificacion.component.js.map