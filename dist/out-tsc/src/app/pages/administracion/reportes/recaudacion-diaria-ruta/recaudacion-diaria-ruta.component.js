import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
let RecaudacionDiariaRutaComponent = class RecaudacionDiariaRutaComponent {
    constructor(alerts, fb, reportesService, clientesService, zonasService, rutasService, variantesService) {
        this.alerts = alerts;
        this.fb = fb;
        this.reportesService = reportesService;
        this.clientesService = clientesService;
        this.zonasService = zonasService;
        this.rutasService = rutasService;
        this.variantesService = variantesService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.listaClientes = [];
        this.listaZonas = [];
        this.listaRutas = [];
        this.listaVariantes = [];
        this.informacion = [];
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
        this.initForm();
    }
    initForm() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.filtrosForm = this.fb.group({
            fechaInicio: [firstDay],
            fechaFin: [lastDay],
            idCliente: [null],
            idRegion: [{ value: null, disabled: true }],
            idRuta: [{ value: null, disabled: true }],
            idVariante: [{ value: null, disabled: true }]
        });
    }
    ngOnInit() {
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
            }
            else {
                // Deshabilitar campos dependientes
                this.filtrosForm.get('idRegion')?.disable();
                this.filtrosForm.get('idRuta')?.disable();
                this.filtrosForm.get('idVariante')?.disable();
            }
        });
        // Suscribirse a cambios en la zona para habilitar/deshabilitar rutas
        this.filtrosForm.get('idRegion')?.valueChanges.subscribe((idRegion) => {
            if (idRegion) {
                // Habilitar campo de rutas y cargar rutas de la zona
                this.filtrosForm.get('idRuta')?.enable();
                this.cargarRutasByZona(idRegion);
            }
            else {
                // Deshabilitar campos dependientes y limpiar valores
                this.filtrosForm.get('idRuta')?.disable();
                this.filtrosForm.get('idRuta')?.setValue(null);
                this.filtrosForm.get('idVariante')?.disable();
                this.filtrosForm.get('idVariante')?.setValue(null);
                this.listaRutas = [];
                this.listaVariantes = [];
            }
        });
        // Suscribirse a cambios en la ruta para habilitar/deshabilitar variantes
        this.filtrosForm.get('idRuta')?.valueChanges.subscribe((idRuta) => {
            if (idRuta) {
                // Habilitar campo de variantes y cargar variantes de la ruta
                this.filtrosForm.get('idVariante')?.enable();
                this.cargarVariantesByRuta(idRuta);
            }
            else {
                // Deshabilitar campo de variantes y limpiar valor
                this.filtrosForm.get('idVariante')?.disable();
                this.filtrosForm.get('idVariante')?.setValue(null);
                this.listaVariantes = [];
            }
        });
    }
    cargarListas() {
        // Cargar clientes
        this.clientesService.obtenerClientes().subscribe({
            next: (response) => {
                this.listaClientes = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
            },
            error: (error) => {
                console.error('Error al cargar clientes:', error);
            }
        });
        // No cargar zonas inicialmente, se cargarán cuando se seleccione un cliente
        this.listaZonas = [];
        // No cargar rutas inicialmente, se cargarán cuando se seleccione una zona
        this.listaRutas = [];
        // No cargar variantes inicialmente, se cargarán cuando se seleccione una ruta
        this.listaVariantes = [];
    }
    /**
     * Carga las zonas filtradas por cliente
     */
    cargarZonasByCliente(idCliente) {
        this.zonasService.obtenerZonasByCliente(idCliente).subscribe({
            next: (response) => {
                this.listaZonas = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
            },
            error: (error) => {
                console.error('Error al cargar zonas por cliente:', error);
                this.listaZonas = [];
            }
        });
    }
    /**
     * Carga las rutas filtradas por zona
     */
    cargarRutasByZona(idZona) {
        this.rutasService.obtenerRutasByZona(idZona).subscribe({
            next: (response) => {
                this.listaRutas = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
            },
            error: (error) => {
                console.error('Error al cargar rutas por zona:', error);
                this.listaRutas = [];
            }
        });
    }
    /**
     * Carga las variantes filtradas por ruta
     */
    cargarVariantesByRuta(idRuta) {
        this.variantesService.obtenerVariantesByRuta(idRuta).subscribe({
            next: (response) => {
                this.listaVariantes = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
            },
            error: (error) => {
                console.error('Error al cargar variantes por ruta:', error);
                this.listaVariantes = [];
            }
        });
    }
    aplicarFiltros() {
        this.loadingVisible = true;
        const formValue = this.filtrosForm.value;
        // Formatear fechas a YYYY-MM-DD
        const fechaInicio = formValue.fechaInicio
            ? this.formatearFecha(formValue.fechaInicio)
            : this.formatearFecha(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
        const fechaFin = formValue.fechaFin
            ? this.formatearFecha(formValue.fechaFin)
            : this.formatearFecha(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
        const payload = {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            idCliente: formValue.idCliente || null,
            idRuta: formValue.idRuta || null,
            idVariante: formValue.idVariante || null
        };
        this.reportesService.obtenerRecaudacionDiariaRuta(payload).subscribe({
            next: (response) => {
                this.loadingVisible = false;
                // Mapear la respuesta del API a la estructura esperada por el grid
                if (response && response.data && Array.isArray(response.data)) {
                    this.informacion = response.data.map((item, index) => ({
                        id: index + 1,
                        fecha: item.fecha ? new Date(item.fecha) : new Date(),
                        region: item.region || item.nombreRegion || '',
                        ruta: item.ruta || item.nombreRuta || '',
                        Variante: item.variante || item.nombreVariante || '',
                        viajes: Number(item.viajes || item.totalViajes || 0),
                        validaciones: Number(item.validaciones || item.totalValidaciones || 0),
                        ingresosMxn: Number(item.ingresos ?? item.ingresosMxn ?? item.ingresosTotales ?? 0),
                        ticketPromedio: Number(item.ticketPromedio || 0),
                        porcentajeElectronico: Number(item.porcentajeElectronico || 0) / 100,
                        evasionAbs: Number(item.evasionAbs || item.evasion || 0),
                        evasionPorcentaje: Number(item.evasionPorcentaje || 0) / 100
                    }));
                }
                else if (Array.isArray(response)) {
                    this.informacion = response.map((item, index) => ({
                        id: index + 1,
                        fecha: item.fecha ? new Date(item.fecha) : new Date(),
                        region: item.region || item.nombreRegion || '',
                        ruta: item.ruta || item.nombreRuta || '',
                        Variante: item.variante || item.nombreVariante || '',
                        viajes: Number(item.viajes || item.totalViajes || 0),
                        validaciones: Number(item.validaciones || item.totalValidaciones || 0),
                        ingresosMxn: Number(item.ingresos ?? item.ingresosMxn ?? item.ingresosTotales ?? 0),
                        ticketPromedio: Number(item.ticketPromedio || 0),
                        porcentajeElectronico: Number(item.porcentajeElectronico || 0) / 100,
                        evasionAbs: Number(item.evasionAbs || item.evasion || 0),
                        evasionPorcentaje: Number(item.evasionPorcentaje || 0) / 100
                    }));
                }
                if (this.dataGrid) {
                    this.dataGrid.instance.refresh();
                }
            },
            error: (error) => {
                this.loadingVisible = false;
                console.error('Error al cargar reporte:', error);
                this.alerts.open({
                    type: 'error',
                    title: 'Error',
                    message: 'No se pudo cargar el reporte. Por favor, intente nuevamente.',
                    confirmText: 'Aceptar',
                    backdropClose: false
                });
            }
        });
    }
    limpiarFiltros() {
        this.initForm();
        this.informacion = [];
        if (this.dataGrid) {
            this.dataGrid.instance.clearGrouping();
            this.isGrouped = false;
            this.dataGrid.instance.refresh();
        }
    }
    formatearFecha(fecha) {
        if (!fecha)
            return '';
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    limpiarCampos() {
        this.limpiarFiltros();
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
        }
        else {
            this.autoExpandAllGroups = !this.autoExpandAllGroups;
            this.dataGrid.instance.refresh();
        }
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], RecaudacionDiariaRutaComponent.prototype, "dataGrid", void 0);
RecaudacionDiariaRutaComponent = __decorate([
    Component({
        selector: 'vex-recaudacion-diaria-ruta',
        templateUrl: './recaudacion-diaria-ruta.component.html',
        styleUrl: './recaudacion-diaria-ruta.component.scss',
        animations: [fadeInRight400ms],
    })
], RecaudacionDiariaRutaComponent);
export { RecaudacionDiariaRutaComponent };
//# sourceMappingURL=recaudacion-diaria-ruta.component.js.map