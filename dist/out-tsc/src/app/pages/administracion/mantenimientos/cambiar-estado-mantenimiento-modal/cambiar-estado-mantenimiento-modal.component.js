import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EstadoMantenimientoVehicular, EstadoMantenimientoVehicularLabels } from "../../../../entities/estado-mantenimiento-vehicular.enum";
let CambiarEstadoMantenimientoModalComponent = class CambiarEstadoMantenimientoModalComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.estados = [
            { value: EstadoMantenimientoVehicular.Abierto, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Abierto] },
            { value: EstadoMantenimientoVehicular.Pendiente, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Pendiente] },
            { value: EstadoMantenimientoVehicular.Cerrado, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Cerrado] },
            { value: EstadoMantenimientoVehicular.Cancelado, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Cancelado] }
        ];
    }
    ngOnInit() {
        this.estadoForm = this.fb.group({
            nuevoEstado: ['', Validators.required]
        });
    }
    cancelar() {
        this.dialogRef.close();
    }
    confirmar() {
        if (this.estadoForm.valid) {
            this.dialogRef.close(this.estadoForm.get('nuevoEstado')?.value);
        }
    }
    getEstadoActualLabel() {
        return EstadoMantenimientoVehicularLabels[this.data.estadoActual] || 'N/A';
    }
};
CambiarEstadoMantenimientoModalComponent = __decorate([
    Component({
        selector: 'vex-cambiar-estado-mantenimiento-modal',
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
        templateUrl: './cambiar-estado-mantenimiento-modal.component.html',
        styleUrl: './cambiar-estado-mantenimiento-modal.component.scss'
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], CambiarEstadoMantenimientoModalComponent);
export { CambiarEstadoMantenimientoModalComponent };
//# sourceMappingURL=cambiar-estado-mantenimiento-modal.component.js.map