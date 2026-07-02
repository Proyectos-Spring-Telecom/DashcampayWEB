import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
let CambiarEstadoModalComponent = class CambiarEstadoModalComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.tipoDispositivo = 'dispositivo';
        this.estados = [
            { value: 0, label: 'Inactivo' },
            { value: 1, label: 'Disponible' },
            { value: 2, label: 'Asignado' },
            { value: 3, label: 'En Mantenimiento' },
            { value: 4, label: 'Dañado' },
            { value: 5, label: 'Retirado' }
        ];
    }
    ngOnInit() {
        this.estadoForm = this.fb.group({
            nuevoEstado: ['', Validators.required]
        });
        this.tipoDispositivo = this.data.tipoDispositivo || 'dispositivo';
    }
    cancelar() {
        this.dialogRef.close();
    }
    confirmar() {
        if (this.estadoForm.valid) {
            this.dialogRef.close(this.estadoForm.get('nuevoEstado')?.value);
        }
    }
};
CambiarEstadoModalComponent = __decorate([
    Component({
        selector: 'vex-cambiar-estado-modal',
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
        templateUrl: './cambiar-estado-modal.component.html',
        styleUrl: './cambiar-estado-modal.component.scss'
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], CambiarEstadoModalComponent);
export { CambiarEstadoModalComponent };
//# sourceMappingURL=cambiar-estado-modal.component.js.map