import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let AltaPermisoComponent = class AltaPermisoComponent {
    constructor(fb, alerts, permiService, activatedRouted, route, moduSer) {
        this.fb = fb;
        this.alerts = alerts;
        this.permiService = permiService;
        this.activatedRouted = activatedRouted;
        this.route = route;
        this.moduSer = moduSer;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Permiso';
        this.listaClientes = [];
        this.selectedFileName = '';
        this.previewUrl = null;
    }
    ngOnInit() {
        this.initForm();
        this.obtenerModulo();
        this.activatedRouted.params.subscribe((params) => {
            this.idPermiso = params['idPermiso'];
            if (this.idPermiso) {
                this.title = 'Actualizar Permiso';
                this.obtenerPermiso();
            }
        });
    }
    obtenerModulo() {
        this.moduSer.obtenerModulos().subscribe((response) => {
            this.listaModulos = (response?.data || []).map((m) => ({
                ...m,
                id: Number(m.id)
            }));
        });
    }
    obtenerPermiso() {
        this.permiService.obtenerPermiso(this.idPermiso).subscribe((response) => {
            const idModuloNum = response.data?.idModulo != null
                ? Number(response.data.idModulo)
                : response.data?.idModulo2?.id != null
                    ? Number(response.data.idModulo2.id)
                    : null;
            this.permisoForm.patchValue({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
                idModulo: idModuloNum,
            });
        });
    }
    initForm() {
        this.permisoForm = this.fb.group({
            idModulo: [null, Validators.required],
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
        });
    }
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idPermiso) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.permisoForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                nombre: 'Nombre',
                descripcion: 'Descripción',
                idModulo: 'Módulo',
            };
            const camposFaltantes = [];
            Object.keys(this.permisoForm.controls).forEach(key => {
                const control = this.permisoForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
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
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Hay campos obligatorios sin completar.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        // igual que en zonas: quitar 'id' antes de leer el payload
        if (this.permisoForm.contains('id'))
            this.permisoForm.removeControl('id');
        const payload = {
            ...this.permisoForm.getRawValue(),
            idModulo: Number(this.permisoForm.value.idModulo),
        };
        this.permiService.agregarPermiso(payload).subscribe(() => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Se agregó un nuevo permiso de manera exitosa.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.regresar();
        }, (error) => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.permisoForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                nombre: 'Nombre',
                descripcion: 'Descripción',
                idModulo: 'Módulo',
            };
            const camposFaltantes = [];
            Object.keys(this.permisoForm.controls).forEach(key => {
                const control = this.permisoForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
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
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Hay campos obligatorios sin completar.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return; // importante salir si es inválido
        }
        const payload = {
            ...this.permisoForm.getRawValue(),
            idModulo: Number(this.permisoForm.value.idModulo),
        };
        this.permiService.actualizarPermiso(this.idPermiso, payload).subscribe(() => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Los datos del permiso se actualizaron correctamente.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.regresar();
        }, (error) => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Ocurrió un error al actualizar el permiso.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/permisos');
    }
};
AltaPermisoComponent = __decorate([
    Component({
        selector: 'vex-alta-permiso',
        templateUrl: './alta-permiso.component.html',
        styleUrl: './alta-permiso.component.scss',
        animations: [fadeInRight400ms],
    })
], AltaPermisoComponent);
export { AltaPermisoComponent };
//# sourceMappingURL=alta-permiso.component.js.map