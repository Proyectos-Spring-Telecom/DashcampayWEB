import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
let ValidacionesDetalladasComponent = class ValidacionesDetalladasComponent {
    constructor(alerts, fb, clientesService, zonasService, rutasService, variantesService, reportesService) {
        this.alerts = alerts;
        this.fb = fb;
        this.clientesService = clientesService;
        this.zonasService = zonasService;
        this.rutasService = rutasService;
        this.variantesService = variantesService;
        this.reportesService = reportesService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.informacion = [];
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.pagerConfig = {
            showPageSizeSelector: true,
            allowedPageSizes: [50],
            showInfo: true,
            infoText: 'Página {0} de {1}',
            visible: true
        };
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.listaClientes = [];
        this.listaZonas = [];
        this.listaRutas = [];
        this.listaVariantes = [];
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
            }
            else {
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
            }
            else {
                // Deshabilitar campo de variantes
                this.filtrosForm.get('idVariante')?.disable();
            }
        });
    }
    cargarListas() {
        // Cargar clientes usando clientes/list
        this.clientesService.obtenerClientesList().subscribe({
            next: (response) => {
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
     * Carga las rutas filtradas por cliente
     */
    cargarRutasByCliente(idCliente) {
        this.rutasService.obtenerRutasByIdCliente(idCliente).subscribe({
            next: (response) => {
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
    formatearFecha(d) {
        if (!d)
            return '';
        const date = typeof d === 'string' ? new Date(d) : d;
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
    aplicarFiltros() {
        this.loadingVisible = true;
        const formValue = this.filtrosForm.getRawValue();
        const fechaInicio = formValue.fechaInicio
            ? this.formatearFecha(formValue.fechaInicio)
            : this.formatearFecha(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
        const fechaFin = formValue.fechaFin
            ? this.formatearFecha(formValue.fechaFin)
            : this.formatearFecha(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
        const payload = {
            fechaInicio,
            fechaFin,
            idCliente: formValue.idCliente || null,
            idZona: formValue.idRegion || null,
            idRuta: formValue.idRuta || null,
            idVariante: formValue.idVariante || null
        };
        this.reportesService.obtenerTransaccionesDebit(payload).subscribe({
            next: (response) => {
                this.loadingVisible = false;
                const raw = response?.data ?? response;
                const list = Array.isArray(raw) ? raw : [];
                this.informacion = list.map((item, index) => this.mapearItemTransaccion(item, index));
                if (this.dataGrid?.instance) {
                    this.dataGrid.instance.clearGrouping();
                    this.dataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.loadingVisible = false;
                console.error('Error al obtener transacciones débit:', err);
                this.alerts.open({
                    type: 'error',
                    title: 'Error',
                    message: err?.error?.message || err?.message || 'No se pudieron cargar las transacciones.',
                    backdropClose: false
                });
            }
        });
    }
    mapearItemTransaccion(item, index) {
        const get = (obj, ...keys) => {
            if (!obj)
                return null;
            for (const k of keys)
                if (obj[k] !== undefined && obj[k] !== null)
                    return obj[k];
            return null;
        };
        const id = get(item, 'id') ?? index + 1;
        const fechaRaw = get(item, 'fechaHora', 'fecha', 'fechaTransaccion', 'fechaValidacion');
        const fechaHora = fechaRaw ? (fechaRaw instanceof Date ? fechaRaw : new Date(fechaRaw)) : null;
        return {
            id,
            idTx: get(item, 'idTx', 'idTransaccion', 'numeroTransaccion') ?? `TX-${id}`,
            fechaHora,
            monto: Number(get(item, 'monto', 'importe', 'cantidad') ?? 0),
            monederoSerie: get(item, 'numeroSerieMonedero', 'monederoSerie', 'serieMonedero', 'idMonedero', 'monedero') ?? '',
            dispositivoSerie: get(item, 'numeroSerieValidador', 'dispositivoSerie', 'serieValidador', 'idValidador', 'validador') ?? '',
            latitud: Number(get(item, 'latitud', 'lat') ?? 0),
            longitud: Number(get(item, 'longitud', 'lng', 'lon') ?? 0),
            rutaDerrotero: get(item, 'nombreRuta', 'rutaDerrotero', 'ruta', 'derrotero') ?? '',
            viaje: Number(get(item, 'numeroViaje', 'viaje', 'idViaje') ?? 0),
            turno: get(item, 'numeroTurno', 'turno', 'idTurno', 'nombreTurno') ?? ''
        };
    }
    limpiarCampos() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.filtrosForm.patchValue({
            fechaInicio: firstDay,
            fechaFin: lastDay,
            idCliente: null,
            idRegion: null,
            idRuta: null,
            idVariante: null
        });
        this.filtrosForm.get('idRegion')?.setValue(null, { emitEvent: false });
        this.filtrosForm.get('idRuta')?.setValue(null, { emitEvent: false });
        this.filtrosForm.get('idVariante')?.setValue(null, { emitEvent: false });
        this.informacion = [];
        if (this.dataGrid?.instance) {
            this.dataGrid.instance.clearGrouping();
            this.dataGrid.instance.refresh();
        }
        this.isGrouped = false;
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
], ValidacionesDetalladasComponent.prototype, "dataGrid", void 0);
ValidacionesDetalladasComponent = __decorate([
    Component({
        selector: 'vex-validaciones-detalladas',
        templateUrl: './validaciones-detalladas.component.html',
        styleUrl: './validaciones-detalladas.component.scss',
        animations: [fadeInRight400ms],
    })
], ValidacionesDetalladasComponent);
export { ValidacionesDetalladasComponent };
//# sourceMappingURL=validaciones-detalladas.component.js.map