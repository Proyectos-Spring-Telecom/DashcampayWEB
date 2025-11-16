import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';

@Component({
  selector: 'vex-recaudacion-vehiculo',
  templateUrl: './recaudacion-vehiculo.component.html',
  styleUrl: './recaudacion-vehiculo.component.scss',
  animations: [fadeInRight400ms],
})
export class RecaudacionVehiculoComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
    public showFilterRow: boolean;
    public showHeaderFilter: boolean;
    public loadingVisible: boolean = false;
    public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
    informacion = [
  {
    id: 1,
    noEconomico: 'U-101',
    placa: 'ABC-210-A',
    marcaModeloAnio: 'Mercedes Benz Ayco 2020',
    turnos: 3,
    viajes: 14,
    validaciones: 115,
    ingresos: 2950,
    ticketPromedio: 9.5,
    horasServicio: 8
  },
  {
    id: 2,
    noEconomico: 'U-102',
    placa: 'BCD-321-B',
    marcaModeloAnio: 'Mercedes Benz Zafiro 2019',
    turnos: 2,
    viajes: 11,
    validaciones: 92,
    ingresos: 2380,
    ticketPromedio: 9.2,
    horasServicio: 7
  },
  {
    id: 3,
    noEconomico: 'U-103',
    placa: 'CDE-432-C',
    marcaModeloAnio: 'Volkswagen MAN 2021',
    turnos: 2,
    viajes: 10,
    validaciones: 88,
    ingresos: 2240,
    ticketPromedio: 9.1,
    horasServicio: 6
  },
  {
    id: 4,
    noEconomico: 'U-104',
    placa: 'DEF-543-D',
    marcaModeloAnio: 'Mercedes Benz Ayco 2018',
    turnos: 3,
    viajes: 15,
    validaciones: 128,
    ingresos: 3150,
    ticketPromedio: 9.6,
    horasServicio: 9
  },
  {
    id: 5,
    noEconomico: 'U-105',
    placa: 'EFG-654-E',
    marcaModeloAnio: 'Volkswagen MAN 2019',
    turnos: 2,
    viajes: 12,
    validaciones: 101,
    ingresos: 2620,
    ticketPromedio: 9.3,
    horasServicio: 7
  },
  {
    id: 6,
    noEconomico: 'U-106',
    placa: 'FGH-765-F',
    marcaModeloAnio: 'Mercedes Benz Zafiro 2020',
    turnos: 3,
    viajes: 13,
    validaciones: 110,
    ingresos: 2810,
    ticketPromedio: 9.4,
    horasServicio: 8
  },
  {
    id: 7,
    noEconomico: 'U-107',
    placa: 'GHI-876-G',
    marcaModeloAnio: 'Volkswagen MAN 2018',
    turnos: 2,
    viajes: 11,
    validaciones: 95,
    ingresos: 2470,
    ticketPromedio: 9.1,
    horasServicio: 6
  },
  {
    id: 8,
    noEconomico: 'U-108',
    placa: 'HIJ-987-H',
    marcaModeloAnio: 'Mercedes Benz Ayco 2021',
    turnos: 3,
    viajes: 16,
    validaciones: 132,
    ingresos: 3360,
    ticketPromedio: 9.7,
    horasServicio: 9
  },
  {
    id: 9,
    noEconomico: 'U-109',
    placa: 'IJK-198-I',
    marcaModeloAnio: 'Mercedes Benz Zafiro 2017',
    turnos: 1,
    viajes: 9,
    validaciones: 74,
    ingresos: 1880,
    ticketPromedio: 8.9,
    horasServicio: 5
  },
  {
    id: 10,
    noEconomico: 'U-110',
    placa: 'JKL-209-J',
    marcaModeloAnio: 'Volkswagen MAN 2020',
    turnos: 2,
    viajes: 12,
    validaciones: 106,
    ingresos: 2690,
    ticketPromedio: 9.2,
    horasServicio: 7
  },
  {
    id: 11,
    noEconomico: 'U-111',
    placa: 'KLM-320-K',
    marcaModeloAnio: 'Mercedes Benz Ayco 2016',
    turnos: 1,
    viajes: 8,
    validaciones: 68,
    ingresos: 1700,
    ticketPromedio: 8.7,
    horasServicio: 5
  },
  {
    id: 12,
    noEconomico: 'U-112',
    placa: 'LMN-431-L',
    marcaModeloAnio: 'Volkswagen MAN 2017',
    turnos: 2,
    viajes: 10,
    validaciones: 85,
    ingresos: 2140,
    ticketPromedio: 9.0,
    horasServicio: 6
  },
  {
    id: 13,
    noEconomico: 'U-113',
    placa: 'MNO-542-M',
    marcaModeloAnio: 'Mercedes Benz Zafiro 2021',
    turnos: 3,
    viajes: 14,
    validaciones: 119,
    ingresos: 2920,
    ticketPromedio: 9.5,
    horasServicio: 8
  },
  {
    id: 14,
    noEconomico: 'U-114',
    placa: 'NOP-653-N',
    marcaModeloAnio: 'Mercedes Benz Ayco 2019',
    turnos: 2,
    viajes: 11,
    validaciones: 97,
    ingresos: 2390,
    ticketPromedio: 9.1,
    horasServicio: 7
  },
  {
    id: 15,
    noEconomico: 'U-115',
    placa: 'OPQ-764-O',
    marcaModeloAnio: 'Volkswagen MAN 2016',
    turnos: 1,
    viajes: 9,
    validaciones: 72,
    ingresos: 1820,
    ticketPromedio: 8.8,
    horasServicio: 5
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
