import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-perfil-pasajero',
  templateUrl: './perfil-pasajero.component.html',
  styleUrl: './perfil-pasajero.component.scss',
    animations: [fadeInRight400ms],
})
export class PerfilPasajeroComponent {

  layoutCtrl = new UntypedFormControl('fullwidth');
  mesActual = 'Noviembre 2025';          // o lo calculas dinámico
gastoMes = 12345;                      // número
saldoActual = 56789.34;                // número
ultimaRecarga: Date = new Date();      // fecha de la última recarga


movimientos = [
  {
    tipo: 'Debito',
    concepto: 'Pago de servicio',
    descripcion: 'Luz | Cargo automático',
    monto: 405.34,
    fecha: new Date(2020, 0, 20)
  },
  {
    tipo: 'Debito',
    concepto: 'Depósito',
    descripcion: 'Transferencia bancaria',
    monto: 1200,
    fecha: new Date(2020, 0, 18)
  },
  {
    tipo: 'Recarga',
    concepto: 'Recarga',
    descripcion: 'DashCam Pay',
    monto: 500,
    fecha: new Date(2020, 0, 15)
  }
];


}
