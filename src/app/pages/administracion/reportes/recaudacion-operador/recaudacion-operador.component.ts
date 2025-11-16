import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';

@Component({
  selector: 'vex-recaudacion-operador',
  templateUrl: './recaudacion-operador.component.html',
  styleUrl: './recaudacion-operador.component.scss',
  animations: [fadeInRight400ms],
})
export class RecaudacionOperadorComponent {

  layoutCtrl = new UntypedFormControl('fullwidth');
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  informacion = [
  {
    id: 1,
    operador: 'Eduardo Cruz',
    licencia: 'ECZ-9045',
    turnos: 3,
    viajes: 14,
    validaciones: 120,
    ingresos: 2850,
    ticketPromedio: 9.5,
    evasionPorcentaje: 0.035,
    ultimoTurno: new Date(2025, 0, 2, 21, 15)
  },
  {
    id: 2,
    operador: 'Rodrigo Martinez',
    licencia: 'RMT-1120',
    turnos: 2,
    viajes: 11,
    validaciones: 95,
    ingresos: 2100,
    ticketPromedio: 9.2,
    evasionPorcentaje: 0.03,
    ultimoTurno: new Date(2025, 0, 3, 20, 40)
  },
  {
    id: 3,
    operador: 'Sergio Torres',
    licencia: 'STR-7834',
    turnos: 2,
    viajes: 10,
    validaciones: 88,
    ingresos: 1980,
    ticketPromedio: 9.1,
    evasionPorcentaje: 0.038,
    ultimoTurno: new Date(2025, 0, 4, 19, 55)
  },
  {
    id: 4,
    operador: 'Luis Herrera',
    licencia: 'LHR-5590',
    turnos: 3,
    viajes: 15,
    validaciones: 135,
    ingresos: 3050,
    ticketPromedio: 9.7,
    evasionPorcentaje: 0.034,
    ultimoTurno: new Date(2025, 0, 2, 22, 5)
  },
  {
    id: 5,
    operador: 'Carlos Medina',
    licencia: 'CMD-4412',
    turnos: 3,
    viajes: 13,
    validaciones: 120,
    ingresos: 2760,
    ticketPromedio: 9.2,
    evasionPorcentaje: 0.029,
    ultimoTurno: new Date(2025, 0, 3, 21, 10)
  },
  {
    id: 6,
    operador: 'Jorge Rivas',
    licencia: 'JRV-6648',
    turnos: 2,
    viajes: 12,
    validaciones: 110,
    ingresos: 2610,
    ticketPromedio: 9.3,
    evasionPorcentaje: 0.032,
    ultimoTurno: new Date(2025, 0, 4, 20, 20)
  },
  {
    id: 7,
    operador: 'David Sánchez',
    licencia: 'DVS-9081',
    turnos: 3,
    viajes: 14,
    validaciones: 125,
    ingresos: 2890,
    ticketPromedio: 9.4,
    evasionPorcentaje: 0.04,
    ultimoTurno: new Date(2025, 0, 2, 21, 30)
  },
  {
    id: 8,
    operador: 'Héctor Blanco',
    licencia: 'HBL-7729',
    turnos: 2,
    viajes: 12,
    validaciones: 112,
    ingresos: 2550,
    ticketPromedio: 9.1,
    evasionPorcentaje: 0.043,
    ultimoTurno: new Date(2025, 0, 3, 20, 50)
  },
  {
    id: 9,
    operador: 'Ricardo Flores',
    licencia: 'RCF-2190',
    turnos: 2,
    viajes: 10,
    validaciones: 98,
    ingresos: 2280,
    ticketPromedio: 9.0,
    evasionPorcentaje: 0.045,
    ultimoTurno: new Date(2025, 0, 4, 19, 35)
  },
  {
    id: 10,
    operador: 'Fernando Díaz',
    licencia: 'FND-3501',
    turnos: 2,
    viajes: 13,
    validaciones: 118,
    ingresos: 2720,
    ticketPromedio: 9.3,
    evasionPorcentaje: 0.033,
    ultimoTurno: new Date(2025, 0, 2, 20, 45)
  },
  {
    id: 11,
    operador: 'Mario Castillo',
    licencia: 'MCS-4873',
    turnos: 2,
    viajes: 11,
    validaciones: 102,
    ingresos: 2440,
    ticketPromedio: 9.1,
    evasionPorcentaje: 0.036,
    ultimoTurno: new Date(2025, 0, 3, 20, 5)
  },
  {
    id: 12,
    operador: 'Alejandro Cruz',
    licencia: 'ALC-6315',
    turnos: 2,
    viajes: 12,
    validaciones: 108,
    ingresos: 2560,
    ticketPromedio: 9.2,
    evasionPorcentaje: 0.034,
    ultimoTurno: new Date(2025, 0, 4, 21, 0)
  },
  {
    id: 13,
    operador: 'Andrés Molina',
    licencia: 'ANM-7102',
    turnos: 3,
    viajes: 15,
    validaciones: 130,
    ingresos: 2950,
    ticketPromedio: 9.4,
    evasionPorcentaje: 0.031,
    ultimoTurno: new Date(2025, 0, 2, 22, 15)
  },
  {
    id: 14,
    operador: 'Pablo Romero',
    licencia: 'PBR-8246',
    turnos: 2,
    viajes: 13,
    validaciones: 118,
    ingresos: 2680,
    ticketPromedio: 9.2,
    evasionPorcentaje: 0.029,
    ultimoTurno: new Date(2025, 0, 3, 21, 25)
  },
  {
    id: 15,
    operador: 'Julián Pérez',
    licencia: 'JLP-9630',
    turnos: 2,
    viajes: 11,
    validaciones: 104,
    ingresos: 2420,
    ticketPromedio: 9.0,
    evasionPorcentaje: 0.033,
    ultimoTurno: new Date(2025, 0, 4, 20, 10)
  }
];

  public paginaActual: number = 1;
  public totalRegistros: number = 0;
  public pageSize: number = 20;
  public totalPaginas: number = 0;
  public data!: string;
  public paginaActualData: any[] = [];
  public filtroActivo: string = '';
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  public autoExpandAllGroups: boolean = true;
  isGrouped: boolean = false;

  constructor(
    private alerts: AlertsService,
  ) {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
  }

  ngOnInit(): void {

  }

  limpiarCampos() {
    const today = new Date();
    this.dataGrid.instance.clearGrouping();
    this.isGrouped = false;
    // this.setupDataSource();
    this.dataGrid.instance.refresh();
  }

  toggleExpandGroups() {
    const groupedColumns = this.dataGrid.instance.getVisibleColumns()
      .filter(col => (col.groupIndex ?? -1) >= 0);
    if (groupedColumns.length === 0) {
      this.alerts.open({
        type: 'info',
        title: '¡Ops!',
        message: 'Debes arrastar un encabezado de una columna para expandir o contraer grupos.',
        backdropClose: false
      });
    } else {
      this.autoExpandAllGroups = !this.autoExpandAllGroups;
      this.dataGrid.instance.refresh();
    }
  }


}
