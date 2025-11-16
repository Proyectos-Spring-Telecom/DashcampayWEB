import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';

@Component({
  selector: 'vex-recaudacion-dispositivo-instalacion',
  templateUrl: './recaudacion-dispositivo-instalacion.component.html',
  styleUrl: './recaudacion-dispositivo-instalacion.component.scss',
  animations: [fadeInRight400ms],
})
export class RecaudacionDispositivoInstalacionComponent implements OnInit {

   layoutCtrl = new UntypedFormControl('fullwidth');
      public showFilterRow: boolean;
      public showHeaderFilter: boolean;
      public loadingVisible: boolean = false;
      public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
      informacion = [
  {
    id: 1,
    serieDispositivo: 'AWF-5487',
    serieBlueVox: 'BV-1001',
    vehiculo: 'U-101 Mercedes Benz Ayco',
    validaciones: 120,
    ingresos: 2850,
    ultimaPosicion: 'Polanco - Reforma',
    estado: 'Operativo'
  },
  {
    id: 2,
    serieDispositivo: 'AWF-5490',
    serieBlueVox: 'BV-1002',
    vehiculo: 'U-102 Mercedes Benz Zafiro',
    validaciones: 95,
    ingresos: 2240,
    ultimaPosicion: 'Centro Histórico - Zócalo',
    estado: 'Operativo'
  },
  {
    id: 3,
    serieDispositivo: 'AWF-5493',
    serieBlueVox: 'BV-1003',
    vehiculo: 'U-103 Volkswagen MAN',
    validaciones: 88,
    ingresos: 2100,
    ultimaPosicion: 'Roma Norte - Centro',
    estado: 'Sin comunicación'
  },
  {
    id: 4,
    serieDispositivo: 'AWD-4870',
    serieBlueVox: 'BV-1004',
    vehiculo: 'U-104 Mercedes Benz Ayco',
    validaciones: 132,
    ingresos: 3010,
    ultimaPosicion: 'Condesa - Chapultepec',
    estado: 'Operativo'
  },
  {
    id: 5,
    serieDispositivo: 'AWD-4873',
    serieBlueVox: 'BV-1005',
    vehiculo: 'U-105 Volkswagen MAN',
    validaciones: 76,
    ingresos: 1820,
    ultimaPosicion: 'Xochimilco - Centro',
    estado: 'En revisión'
  },
  {
    id: 6,
    serieDispositivo: 'AWD-4876',
    serieBlueVox: 'BV-1006',
    vehiculo: 'U-106 Mercedes Benz Zafiro',
    validaciones: 101,
    ingresos: 2390,
    ultimaPosicion: 'Satélite - Polanco',
    estado: 'Operativo'
  },
  {
    id: 7,
    serieDispositivo: 'EAE-7541',
    serieBlueVox: 'BV-1007',
    vehiculo: 'U-107 Mercedes Benz Ayco',
    validaciones: 115,
    ingresos: 2680,
    ultimaPosicion: 'Indios Verdes - Reforma',
    estado: 'Operativo'
  },
  {
    id: 8,
    serieDispositivo: 'EAE-7544',
    serieBlueVox: 'BV-1008',
    vehiculo: 'U-108 Volkswagen MAN',
    validaciones: 84,
    ingresos: 1980,
    ultimaPosicion: 'Coyoacán - Centro',
    estado: 'Sin comunicación'
  },
  {
    id: 9,
    serieDispositivo: 'EAE-7547',
    serieBlueVox: 'BV-1009',
    vehiculo: 'U-109 Mercedes Benz Zafiro',
    validaciones: 92,
    ingresos: 2140,
    ultimaPosicion: 'Observatorio - Zócalo',
    estado: 'Operativo'
  },
  {
    id: 10,
    serieDispositivo: 'RTS-6010',
    serieBlueVox: 'BV-1010',
    vehiculo: 'U-110 Volkswagen MAN',
    validaciones: 73,
    ingresos: 1760,
    ultimaPosicion: 'Perisur - Centro',
    estado: 'En revisión'
  },
  {
    id: 11,
    serieDispositivo: 'RTS-6013',
    serieBlueVox: 'BV-1011',
    vehiculo: 'U-111 Mercedes Benz Ayco',
    validaciones: 67,
    ingresos: 1620,
    ultimaPosicion: 'Tlalpan - Centro Histórico',
    estado: 'Operativo'
  },
  {
    id: 12,
    serieDispositivo: 'RTS-6016',
    serieBlueVox: 'BV-1012',
    vehiculo: 'U-112 Mercedes Benz Zafiro',
    validaciones: 108,
    ingresos: 2520,
    ultimaPosicion: 'Lindavista - Reforma',
    estado: 'Operativo'
  },
  {
    id: 13,
    serieDispositivo: 'TAS-7201',
    serieBlueVox: 'BV-1013',
    vehiculo: 'U-113 Volkswagen MAN',
    validaciones: 94,
    ingresos: 2210,
    ultimaPosicion: 'Roma Norte - Chapultepec',
    estado: 'Sin comunicación'
  },
  {
    id: 14,
    serieDispositivo: 'TAS-7204',
    serieBlueVox: 'BV-1014',
    vehiculo: 'U-114 Mercedes Benz Ayco',
    validaciones: 119,
    ingresos: 2790,
    ultimaPosicion: 'Polanco - Centro',
    estado: 'Operativo'
  },
  {
    id: 15,
    serieDispositivo: 'TAS-7207',
    serieBlueVox: 'BV-1015',
    vehiculo: 'U-115 Mercedes Benz Zafiro',
    validaciones: 81,
    ingresos: 1920,
    ultimaPosicion: 'Centro - Buenavista',
    estado: 'Fuera de servicio'
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
