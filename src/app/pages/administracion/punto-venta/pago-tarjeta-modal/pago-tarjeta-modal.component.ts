import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface PagoTarjetaData {
  monto: number;
  monederoSerie: string;
  pasajeroNombre?: string;
  pasajeroEmail?: string;
  pasajeroTelefono?: string;
}

@Component({
  selector: 'vex-pago-tarjeta-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pago-tarjeta-modal.component.html',
  styleUrl: './pago-tarjeta-modal.component.scss'
})
export class PagoTarjetaModalComponent implements OnInit {
  tarjetaForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PagoTarjetaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PagoTarjetaData
  ) {}

  ngOnInit(): void {
    this.tarjetaForm = this.fb.group({
      card_number: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      expiration_month: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expiration_year: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      holder_name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.tarjetaForm.valid) {
      this.dialogRef.close(this.tarjetaForm.value);
    }
  }

  // Formatear número de tarjeta (agregar espacios cada 4 dígitos)
  onCardNumberInput(event: any): void {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.tarjetaForm.patchValue({ card_number: value }, { emitEvent: false });
  }

  // Validar y formatear mes
  onMonthInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      const num = parseInt(value, 10);
      if (num > 12) value = '12';
      if (num < 1) value = '';
    }
    if (value.length === 1 && parseInt(value, 10) > 1) {
      value = '0' + value;
    }
    this.tarjetaForm.patchValue({ expiration_month: value }, { emitEvent: false });
  }

  // Validar año (2 dígitos)
  onYearInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.substring(0, 2);
    this.tarjetaForm.patchValue({ expiration_year: value }, { emitEvent: false });
  }

  // Solo números para CVV
  onCvvInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    this.tarjetaForm.patchValue({ cvv: value }, { emitEvent: false });
  }
}

