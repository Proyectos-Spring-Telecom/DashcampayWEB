import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
let CambiarEstadoMonederoModalComponent = class CambiarEstadoMonederoModalComponent {
    constructor(fb, dialogRef, data, pasajerosService) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.pasajerosService = pasajerosService;
        this.listaTiposPasajero = [];
        this.loading = false;
    }
    ngOnInit() {
        this.estadoForm = this.fb.group({
            idTipoPasajero: ['', Validators.required]
        });
        this.obtenerTiposPasajero();
    }
    obtenerTiposPasajero() {
        this.loading = true;
        this.pasajerosService.obtenerTiposPasajero().subscribe({
            next: (response) => {
                const data = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
                this.listaTiposPasajero = data.map((t) => ({
                    id: Number(t?.id ?? t?.Id ?? t?.ID ?? 0),
                    nombre: t?.nombre ?? t?.Nombre ?? ''
                })).filter((t) => Number.isFinite(t.id) && t.id > 0);
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al obtener tipos de pasajero:', error);
                this.listaTiposPasajero = [];
                this.loading = false;
            }
        });
    }
    cancelar() {
        this.dialogRef.close();
    }
    confirmar() {
        if (this.estadoForm.valid) {
            this.dialogRef.close(this.estadoForm.get('idTipoPasajero')?.value);
        }
    }
};
CambiarEstadoMonederoModalComponent = __decorate([
    Component({
        selector: 'vex-cambiar-estado-monedero-modal',
        standalone: true,
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatSelectModule,
            MatButtonModule,
            MatIconModule
        ],
        templateUrl: './cambiar-estado-monedero-modal.component.html',
        styleUrl: './cambiar-estado-monedero-modal.component.scss'
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], CambiarEstadoMonederoModalComponent);
export { CambiarEstadoMonederoModalComponent };
//# sourceMappingURL=cambiar-estado-monedero-modal.component.js.map