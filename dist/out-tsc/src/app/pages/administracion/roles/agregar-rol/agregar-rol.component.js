import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let AgregarRolComponent = class AgregarRolComponent {
    constructor(fb, rolService, activatedRouted, router, alerts) {
        this.fb = fb;
        this.rolService = rolService;
        this.activatedRouted = activatedRouted;
        this.router = router;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Rol';
        this.listaClientes = [];
        this.selectedFileName = '';
        this.previewUrl = null;
    }
    ngOnInit() {
        // this.obtenerClientes()
        this.initForm();
        this.activatedRouted.params.subscribe((params) => {
            this.idRol = params['idRol'];
            if (this.idRol) {
                this.title = 'Actualizar Rol';
                this.obtenerRol();
            }
        });
    }
    obtenerRol() {
        this.rolService.obtenerRole(this.idRol).subscribe((response) => {
            this.rolForm.patchValue({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
                idRol: response.data.idRol,
            });
        });
    }
    initForm() {
        this.rolForm = this.fb.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
        });
    }
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idRol) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.rolForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                nombre: 'Nombre',
                descripcion: 'Descripción',
            };
            const camposFaltantes = [];
            Object.keys(this.rolForm.controls).forEach((key) => {
                const control = this.rolForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>`)
                .join('');
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
        // quitar id antes de enviar (consistencia con otros módulos)
        if (this.rolForm.contains('id'))
            this.rolForm.removeControl('id');
        const payload = this.rolForm.getRawValue();
        this.rolService.agregarRole(payload).subscribe(() => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Se agregó un nuevo rol de manera exitosa.',
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
                message: String(error ?? 'Ocurrió un error al agregar el rol.'),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.rolForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                nombre: 'Nombre',
                descripcion: 'Descripción',
            };
            const camposFaltantes = [];
            Object.keys(this.rolForm.controls).forEach((key) => {
                const control = this.rolForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>`)
                .join('');
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
            return; // salir si es inválido
        }
        const payload = this.rolForm.getRawValue();
        this.rolService.actualizarRoles(this.idRol, payload).subscribe(() => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Los datos del rol se actualizaron correctamente.',
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
                message: String(error ?? 'Ocurrió un error al actualizar el rol.'),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    regresar() {
        this.router.navigateByUrl('/administracion/roles');
    }
};
AgregarRolComponent = __decorate([
    Component({
        selector: 'vex-agregar-rol',
        templateUrl: './agregar-rol.component.html',
        styleUrl: './agregar-rol.component.scss',
        animations: [fadeInRight400ms],
    })
], AgregarRolComponent);
export { AgregarRolComponent };
//# sourceMappingURL=agregar-rol.component.js.map