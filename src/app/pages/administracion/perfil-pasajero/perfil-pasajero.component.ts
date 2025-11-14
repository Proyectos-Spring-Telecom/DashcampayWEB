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
  gastoMes = 1213;                      // número
  saldoActual = 230;                // número
  ultimaRecarga: Date = new Date();      // fecha de la última recarga
movimientos = [
  {
    tipo: 'Debito',
    concepto: 'Transport',
    descripcion: 'City bus ride',
    monto: 22,
    fecha: new Date(2025, 10, 14, 13, 42) // 14 nov 2025 13:42
  },
  {
    tipo: 'Debito',
    concepto: 'Food delivery',
    descripcion: 'Restaurant order',
    monto: 32,
    fecha: new Date(2025, 10, 14, 12, 10) // 14 nov 2025 12:10
  },
  {
    tipo: 'Recarga',
    concepto: 'Top up',
    descripcion: 'DashCam Pay',
    monto: 30,
    fecha: new Date(2025, 10, 14, 11, 20) // 14 nov 2025 11:20
  },
  {
    tipo: 'Debito',
    concepto: 'Pago de servicio',
    descripcion: 'Electricity | Auto payment',
    monto: 32,
    fecha: new Date(2025, 10, 14, 10, 5) // 14 nov 2025 10:05
  },
  {
    tipo: 'Debito',
    concepto: 'Subscription',
    descripcion: 'Streaming platform',
    monto: 19,
    fecha: new Date(2025, 10, 14, 9, 15) // 14 nov 2025 09:15
  },
  {
    tipo: 'Recarga',
    concepto: 'Top up',
    descripcion: 'Oxxo recharge',
    monto: 27,
    fecha: new Date(2025, 10, 14, 8, 30) // 14 nov 2025 08:30
  },
  {
    tipo: 'Debito',
    concepto: 'Online purchase',
    descripcion: 'Electronics store',
    monto: 23,
    fecha: new Date(2025, 10, 14, 7, 50) // 14 nov 2025 07:50
  },
];





}
