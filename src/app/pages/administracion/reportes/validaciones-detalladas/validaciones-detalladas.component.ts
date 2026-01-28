import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { ZonasService } from 'src/app/pages/services/zonas.service';
import { RutasService } from 'src/app/pages/services/ruta.service';
import { VariantesService } from 'src/app/pages/services/variantes.service';

@Component({
  selector: 'vex-validaciones-detalladas',
  templateUrl: './validaciones-detalladas.component.html',
  styleUrl: './validaciones-detalladas.component.scss',
  animations: [fadeInRight400ms],
})
export class ValidacionesDetalladasComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  informacion = [
  {
    id: 1,
    idTx: 'TX-20250102-0001',
    fechaHora: new Date(2025, 0, 2, 6, 15),
    monto: 9.5,
    monederoSerie: 'MON-1001',
    dispositivoSerie: 'VAL-5487',
    latitud: 19.4326,
    longitud: -99.1332,
    rutaDerrotero: 'Polanco - Reforma',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 2,
    idTx: 'TX-20250102-0002',
    fechaHora: new Date(2025, 0, 2, 6, 28),
    monto: 10,
    monederoSerie: 'MON-1002',
    dispositivoSerie: 'VAL-5487',
    latitud: 19.4352,
    longitud: -99.1401,
    rutaDerrotero: 'Polanco - Centro',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 3,
    idTx: 'TX-20250102-0003',
    fechaHora: new Date(2025, 0, 2, 6, 41),
    monto: 9.5,
    monederoSerie: 'MON-1003',
    dispositivoSerie: 'VAL-5487',
    latitud: 19.4391,
    longitud: -99.1453,
    rutaDerrotero: 'Polanco - Reforma',
    viaje: 2,
    turno: 'M1'
  },
  {
    id: 4,
    idTx: 'TX-20250102-0004',
    fechaHora: new Date(2025, 0, 2, 7, 5),
    monto: 11,
    monederoSerie: 'MON-1004',
    dispositivoSerie: 'VAL-6487',
    latitud: 19.4281,
    longitud: -99.132,
    rutaDerrotero: 'Centro - Zócalo',
    viaje: 1,
    turno: 'M2'
  },
  {
    id: 5,
    idTx: 'TX-20250102-0005',
    fechaHora: new Date(2025, 0, 2, 7, 19),
    monto: 10.5,
    monederoSerie: 'MON-1005',
    dispositivoSerie: 'VAL-6487',
    latitud: 19.4263,
    longitud: -99.1365,
    rutaDerrotero: 'Centro - Buenavista',
    viaje: 2,
    turno: 'M2'
  },
  {
    id: 6,
    idTx: 'TX-20250102-0006',
    fechaHora: new Date(2025, 0, 2, 7, 33),
    monto: 9,
    monederoSerie: 'MON-1006',
    dispositivoSerie: 'VAL-6487',
    latitud: 19.4238,
    longitud: -99.1422,
    rutaDerrotero: 'Centro - Chapultepec',
    viaje: 2,
    turno: 'M2'
  },
  {
    id: 7,
    idTx: 'TX-20250103-0001',
    fechaHora: new Date(2025, 0, 3, 6, 10),
    monto: 9.5,
    monederoSerie: 'MON-1101',
    dispositivoSerie: 'VAL-7541',
    latitud: 19.402,
    longitud: -99.151,
    rutaDerrotero: 'Coyoacán - Centro',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 8,
    idTx: 'TX-20250103-0002',
    fechaHora: new Date(2025, 0, 3, 6, 24),
    monto: 9.5,
    monederoSerie: 'MON-1102',
    dispositivoSerie: 'VAL-7541',
    latitud: 19.4065,
    longitud: -99.1473,
    rutaDerrotero: 'Coyoacán - Centro',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 9,
    idTx: 'TX-20250103-0003',
    fechaHora: new Date(2025, 0, 3, 6, 39),
    monto: 10,
    monederoSerie: 'MON-1103',
    dispositivoSerie: 'VAL-7541',
    latitud: 19.4102,
    longitud: -99.1431,
    rutaDerrotero: 'Coyoacán - Zócalo',
    viaje: 2,
    turno: 'M1'
  },
  {
    id: 10,
    idTx: 'TX-20250103-0004',
    fechaHora: new Date(2025, 0, 3, 7, 2),
    monto: 11,
    monederoSerie: 'MON-1104',
    dispositivoSerie: 'VAL-6010',
    latitud: 19.4511,
    longitud: -99.148,
    rutaDerrotero: 'Lindavista - Reforma',
    viaje: 1,
    turno: 'M2'
  },
  {
    id: 11,
    idTx: 'TX-20250103-0005',
    fechaHora: new Date(2025, 0, 3, 7, 18),
    monto: 10.5,
    monederoSerie: 'MON-1105',
    dispositivoSerie: 'VAL-6010',
    latitud: 19.455,
    longitud: -99.1426,
    rutaDerrotero: 'Lindavista - Centro',
    viaje: 2,
    turno: 'M2'
  },
  {
    id: 12,
    idTx: 'TX-20250103-0006',
    fechaHora: new Date(2025, 0, 3, 7, 32),
    monto: 9,
    monederoSerie: 'MON-1106',
    dispositivoSerie: 'VAL-6010',
    latitud: 19.459,
    longitud: -99.1379,
    rutaDerrotero: 'Lindavista - Buenavista',
    viaje: 2,
    turno: 'M2'
  },
  {
    id: 13,
    idTx: 'TX-20250104-0001',
    fechaHora: new Date(2025, 0, 4, 6, 8),
    monto: 9.5,
    monederoSerie: 'MON-1201',
    dispositivoSerie: 'VAL-7201',
    latitud: 19.36,
    longitud: -99.165,
    rutaDerrotero: 'Perisur - Centro',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 14,
    idTx: 'TX-20250104-0002',
    fechaHora: new Date(2025, 0, 4, 6, 22),
    monto: 10,
    monederoSerie: 'MON-1202',
    dispositivoSerie: 'VAL-7201',
    latitud: 19.365,
    longitud: -99.159,
    rutaDerrotero: 'Perisur - Centro',
    viaje: 1,
    turno: 'M1'
  },
  {
    id: 15,
    idTx: 'TX-20250104-0003',
    fechaHora: new Date(2025, 0, 4, 6, 37),
    monto: 9,
    monederoSerie: 'MON-1203',
    dispositivoSerie: 'VAL-7201',
    latitud: 19.369,
    longitud: -99.154,
    rutaDerrotero: 'Perisur - Zócalo',
    viaje: 2,
    turno: 'M1'
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

  filtrosForm!: FormGroup;
  listaClientes: any[] = [];
  listaZonas: any[] = [];
  listaRutas: any[] = [];
  listaVariantes: any[] = [];

  constructor(
    private alerts: AlertsService,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private zonasService: ZonasService,
    private rutasService: RutasService,
    private variantesService: VariantesService
  ) {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
    this.initForm();
  }

  initForm(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.filtrosForm = this.fb.group({
      fechaInicio: [firstDay],
      fechaFin: [lastDay],
      idCliente: [null],
      idRegion: [{value: null, disabled: true}],
      idRuta: [{value: null, disabled: true}],
      idVariante: [{value: null, disabled: true}]
    });
  }

  ngOnInit(): void {
    this.cargarListas();
    
    // Suscribirse a cambios en el cliente para habilitar/deshabilitar zonas
    this.filtrosForm.get('idCliente')?.valueChanges.subscribe((idCliente) => {
      // Limpiar siempre los filtros dependientes cuando cambia el cliente
      this.filtrosForm.get('idRegion')?.setValue(null, { emitEvent: false });
      this.filtrosForm.get('idRuta')?.setValue(null, { emitEvent: false });
      this.filtrosForm.get('idVariante')?.setValue(null, { emitEvent: false });
      this.listaZonas = [];
      this.listaRutas = [];
      this.listaVariantes = [];

      if (idCliente) {
        // Habilitar campo de zonas y cargar zonas del cliente
        this.filtrosForm.get('idRegion')?.enable();
        this.cargarZonasByCliente(idCliente);
      } else {
        // Deshabilitar campos dependientes
        this.filtrosForm.get('idRegion')?.disable();
        this.filtrosForm.get('idRuta')?.disable();
        this.filtrosForm.get('idVariante')?.disable();
      }
    });

    // Suscribirse a cambios en la zona para habilitar/deshabilitar rutas
    this.filtrosForm.get('idRegion')?.valueChanges.subscribe((idRegion) => {
      // Limpiar siempre los filtros dependientes cuando cambia la zona
      this.filtrosForm.get('idRuta')?.setValue(null, { emitEvent: false });
      this.filtrosForm.get('idVariante')?.setValue(null, { emitEvent: false });
      this.listaRutas = [];
      this.listaVariantes = [];

      if (idRegion) {
        // Habilitar campo de rutas y cargar rutas del cliente
        const idCliente = this.filtrosForm.get('idCliente')?.value;
        if (idCliente) {
          this.filtrosForm.get('idRuta')?.enable();
          this.cargarRutasByCliente(idCliente);
        }
      } else {
        // Deshabilitar campos dependientes
        this.filtrosForm.get('idRuta')?.disable();
        this.filtrosForm.get('idVariante')?.disable();
      }
    });

    // Suscribirse a cambios en la ruta para habilitar/deshabilitar variantes
    this.filtrosForm.get('idRuta')?.valueChanges.subscribe((idRuta) => {
      // Limpiar siempre el filtro de variante cuando cambia la ruta
      this.filtrosForm.get('idVariante')?.setValue(null, { emitEvent: false });
      this.listaVariantes = [];

      if (idRuta) {
        // Habilitar campo de variantes y cargar variantes de la ruta
        this.filtrosForm.get('idVariante')?.enable();
        this.cargarVariantesByRuta(idRuta);
      } else {
        // Deshabilitar campo de variantes
        this.filtrosForm.get('idVariante')?.disable();
      }
    });
  }

  cargarListas(): void {
    // Cargar clientes usando clientes/list
    this.clientesService.obtenerClientesList().subscribe({
      next: (response: any) => {
        this.listaClientes = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });

    // No cargar zonas, rutas y variantes inicialmente, se cargarán cuando se seleccione cliente/zona/ruta
    this.listaZonas = [];
    this.listaRutas = [];
    this.listaVariantes = [];
  }

  /**
   * Carga las zonas filtradas por cliente
   */
  cargarZonasByCliente(idCliente: number): void {
    this.zonasService.obtenerZonasByCliente(idCliente).subscribe({
      next: (response: any) => {
        this.listaZonas = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.error('Error al cargar zonas por cliente:', error);
        this.listaZonas = [];
      }
    });
  }

  /**
   * Carga las rutas filtradas por cliente
   */
  cargarRutasByCliente(idCliente: number): void {
    this.rutasService.obtenerRutasByIdCliente(idCliente).subscribe({
      next: (response: any) => {
        this.listaRutas = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.error('Error al cargar rutas por cliente:', error);
        this.listaRutas = [];
      }
    });
  }

  /**
   * Carga las variantes filtradas por ruta
   */
  cargarVariantesByRuta(idRuta: number): void {
    this.variantesService.obtenerVariantesByRuta(idRuta).subscribe({
      next: (response: any) => {
        this.listaVariantes = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      },
      error: (error) => {
        console.error('Error al cargar variantes por ruta:', error);
        this.listaVariantes = [];
      }
    });
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