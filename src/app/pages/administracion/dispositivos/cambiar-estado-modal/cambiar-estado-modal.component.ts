import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface CambiarEstadoData {
  numeroSerie: string;
  estadoActual: number;
  tipoDispositivo?: string; // 'validador' o 'contador'
}

@Component({
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
})
export class CambiarEstadoModalComponent implements OnInit {
  estadoForm!: FormGroup;
  public tipoDispositivo: string = 'dispositivo';
  
  estados = [
    { value: 0, label: 'Inactivo' },
    { value: 1, label: 'Disponible' },
    { value: 2, label: 'Asignado' },
    { value: 3, label: 'En Mantenimiento' },
    { value: 4, label: 'Dañado' },
    { value: 5, label: 'Retirado' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CambiarEstadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CambiarEstadoData
  ) {}

  ngOnInit(): void {
    this.estadoForm = this.fb.group({
      nuevoEstado: ['', Validators.required]
    });
    this.tipoDispositivo = this.data.tipoDispositivo || 'dispositivo';
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.estadoForm.valid) {
      this.dialogRef.close(this.estadoForm.get('nuevoEstado')?.value);
    }
  }
}

