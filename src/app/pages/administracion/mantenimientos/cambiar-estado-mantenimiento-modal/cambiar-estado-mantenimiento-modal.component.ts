import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EstadoMantenimientoVehicular, EstadoMantenimientoVehicularLabels } from 'src/app/entities/estado-mantenimiento-vehicular.enum';

export interface CambiarEstadoMantenimientoData {
  placaVehiculo: string;
  estadoActual: number;
}

@Component({
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
})
export class CambiarEstadoMantenimientoModalComponent implements OnInit {
  estadoForm!: FormGroup;
  
  estados = [
    { value: EstadoMantenimientoVehicular.Abierto, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Abierto] },
    { value: EstadoMantenimientoVehicular.Pendiente, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Pendiente] },
    { value: EstadoMantenimientoVehicular.Cerrado, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Cerrado] },
    { value: EstadoMantenimientoVehicular.Cancelado, label: EstadoMantenimientoVehicularLabels[EstadoMantenimientoVehicular.Cancelado] }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CambiarEstadoMantenimientoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CambiarEstadoMantenimientoData
  ) {}

  ngOnInit(): void {
    this.estadoForm = this.fb.group({
      nuevoEstado: ['', Validators.required]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.estadoForm.valid) {
      this.dialogRef.close(this.estadoForm.get('nuevoEstado')?.value);
    }
  }

  getEstadoActualLabel(): string {
    return EstadoMantenimientoVehicularLabels[this.data.estadoActual] || 'N/A';
  }
}

