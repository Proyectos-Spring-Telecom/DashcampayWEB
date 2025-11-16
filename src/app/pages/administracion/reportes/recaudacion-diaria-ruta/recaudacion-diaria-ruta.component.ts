import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';

@Component({
  selector: 'vex-recaudacion-diaria-ruta',
  templateUrl: './recaudacion-diaria-ruta.component.html',
  styleUrl: './recaudacion-diaria-ruta.component.scss',
  animations: [fadeInRight400ms],
})
export class RecaudacionDiariaRutaComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  informacion = [
  {
    id: 1,
    fecha: new Date(2025, 0, 2),
    region: 'Norte',
    ruta: 'R-101',
    Variante: 'Polanco - Reforma',
    viajes: 18,
    validaciones: 420,
    ingresosMxn: 9800,
    ticketPromedio: 13.5,
    porcentajeElectronico: 0.52,
    evasionAbs: 650,
    evasionPorcentaje: 0.055
  },
  {
    id: 2,
    fecha: new Date(2025, 0, 2),
    region: 'Norte',
    ruta: 'R-101',
    Variante: 'Polanco - Centro Histórico',
    viajes: 15,
    validaciones: 360,
    ingresosMxn: 8400,
    ticketPromedio: 13.2,
    porcentajeElectronico: 0.47,
    evasionAbs: 580,
    evasionPorcentaje: 0.05
  },
  {
    id: 3,
    fecha: new Date(2025, 0, 2),
    region: 'Centro',
    ruta: 'R-201',
    Variante: 'Chapultepec - Zócalo',
    viajes: 20,
    validaciones: 510,
    ingresosMxn: 11200,
    ticketPromedio: 14,
    porcentajeElectronico: 0.6,
    evasionAbs: 720,
    evasionPorcentaje: 0.048
  },
  {
    id: 4,
    fecha: new Date(2025, 0, 2),
    region: 'Centro',
    ruta: 'R-201',
    Variante: 'Chapultepec - Buenavista',
    viajes: 13,
    validaciones: 330,
    ingresosMxn: 7600,
    ticketPromedio: 13.1,
    porcentajeElectronico: 0.55,
    evasionAbs: 520,
    evasionPorcentaje: 0.045
  },
  {
    id: 5,
    fecha: new Date(2025, 0, 2),
    region: 'Sur',
    ruta: 'R-301',
    Variante: 'Coyoacán - Centro Histórico',
    viajes: 14,
    validaciones: 290,
    ingresosMxn: 6900,
    ticketPromedio: 12.8,
    porcentajeElectronico: 0.4,
    evasionAbs: 880,
    evasionPorcentaje: 0.07
  },
  {
    id: 6,
    fecha: new Date(2025, 0, 3),
    region: 'Norte',
    ruta: 'R-102',
    Variante: 'Satélite - Polanco',
    viajes: 19,
    validaciones: 445,
    ingresosMxn: 9900,
    ticketPromedio: 13.1,
    porcentajeElectronico: 0.58,
    evasionAbs: 640,
    evasionPorcentaje: 0.052
  },
  {
    id: 7,
    fecha: new Date(2025, 0, 3),
    region: 'Norte',
    ruta: 'R-103',
    Variante: 'Lindavista - Reforma',
    viajes: 11,
    validaciones: 260,
    ingresosMxn: 6100,
    ticketPromedio: 12.9,
    porcentajeElectronico: 0.42,
    evasionAbs: 540,
    evasionPorcentaje: 0.058
  },
  {
    id: 8,
    fecha: new Date(2025, 0, 3),
    region: 'Centro',
    ruta: 'R-202',
    Variante: 'Roma Norte - Centro Histórico',
    viajes: 21,
    validaciones: 530,
    ingresosMxn: 11800,
    ticketPromedio: 14.2,
    porcentajeElectronico: 0.63,
    evasionAbs: 700,
    evasionPorcentaje: 0.049
  },
  {
    id: 9,
    fecha: new Date(2025, 0, 3),
    region: 'Centro',
    ruta: 'R-203',
    Variante: 'Condesa - Chapultepec',
    viajes: 16,
    validaciones: 380,
    ingresosMxn: 8800,
    ticketPromedio: 13.6,
    porcentajeElectronico: 0.5,
    evasionAbs: 620,
    evasionPorcentaje: 0.051
  },
  {
    id: 10,
    fecha: new Date(2025, 0, 3),
    region: 'Sur',
    ruta: 'R-302',
    Variante: 'Xochimilco - Centro',
    viajes: 17,
    validaciones: 340,
    ingresosMxn: 8200,
    ticketPromedio: 13.2,
    porcentajeElectronico: 0.39,
    evasionAbs: 930,
    evasionPorcentaje: 0.076
  },
  {
    id: 11,
    fecha: new Date(2025, 0, 4),
    region: 'Norte',
    ruta: 'R-104',
    Variante: 'Indios Verdes - Reforma',
    viajes: 19,
    validaciones: 410,
    ingresosMxn: 9600,
    ticketPromedio: 13.4,
    porcentajeElectronico: 0.57,
    evasionAbs: 710,
    evasionPorcentaje: 0.059
  },
  {
    id: 12,
    fecha: new Date(2025, 0, 4),
    region: 'Norte',
    ruta: 'R-104',
    Variante: 'Indios Verdes - Buenavista',
    viajes: 12,
    validaciones: 295,
    ingresosMxn: 7100,
    ticketPromedio: 13,
    porcentajeElectronico: 0.49,
    evasionAbs: 560,
    evasionPorcentaje: 0.057
  },
  {
    id: 13,
    fecha: new Date(2025, 0, 4),
    region: 'Centro',
    ruta: 'R-204',
    Variante: 'Observatorio - Zócalo',
    viajes: 22,
    validaciones: 550,
    ingresosMxn: 12400,
    ticketPromedio: 14.3,
    porcentajeElectronico: 0.62,
    evasionAbs: 730,
    evasionPorcentaje: 0.05
  },
  {
    id: 14,
    fecha: new Date(2025, 0, 4),
    region: 'Sur',
    ruta: 'R-303',
    Variante: 'Perisur - Centro',
    viajes: 15,
    validaciones: 320,
    ingresosMxn: 7900,
    ticketPromedio: 13,
    porcentajeElectronico: 0.45,
    evasionAbs: 860,
    evasionPorcentaje: 0.069
  },
  {
    id: 15,
    fecha: new Date(2025, 0, 4),
    region: 'Sur',
    ruta: 'R-304',
    Variante: 'Tlalpan - Centro Histórico',
    viajes: 13,
    validaciones: 300,
    ingresosMxn: 7400,
    ticketPromedio: 12.7,
    porcentajeElectronico: 0.41,
    evasionAbs: 810,
    evasionPorcentaje: 0.072
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
