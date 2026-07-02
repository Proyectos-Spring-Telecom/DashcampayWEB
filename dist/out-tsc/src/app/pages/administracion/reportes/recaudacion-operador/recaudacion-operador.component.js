import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
let RecaudacionOperadorComponent = class RecaudacionOperadorComponent {
    constructor(alerts, fb, reportesService, clientesService, operadoresService) {
        this.alerts = alerts;
        this.fb = fb;
        this.reportesService = reportesService;
        this.clientesService = clientesService;
        this.operadoresService = operadoresService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.listaClientes = [];
        this.listaOperadores = [];
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
            idOperador: [{ value: null, disabled: true }]
        });
    }
    ngOnInit() {
        this.cargarListas();
        // Suscribirse a cambios en el cliente para habilitar/deshabilitar operadores
        this.filtrosForm.get('idCliente')?.valueChanges.subscribe((idCliente) => {
            // Limpiar siempre el filtro de operador cuando cambia el cliente
            this.filtrosForm.get('idOperador')?.setValue(null, { emitEvent: false });
            this.listaOperadores = [];
            if (idCliente) {
                // Habilitar campo de operadores y cargar operadores del cliente
                this.filtrosForm.get('idOperador')?.enable();
                this.cargarOperadoresByCliente(idCliente);
            }
            else {
                // Deshabilitar campo de operadores
                this.filtrosForm.get('idOperador')?.disable();
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
        // No cargar operadores inicialmente, se cargarán cuando se seleccione un cliente
        this.listaOperadores = [];
    }
    /**
     * Carga los operadores filtrados por cliente
     */
    cargarOperadoresByCliente(idCliente) {
        this.operadoresService.obtenerOperadoresByCliente(idCliente).subscribe({
            next: (response) => {
                this.listaOperadores = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
            },
            error: (error) => {
                console.error('Error al cargar operadores por cliente:', error);
                this.listaOperadores = [];
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
            idOperador: formValue.idOperador || null
        };
        this.reportesService.obtenerRecaudacionPorOperador(payload).subscribe({
            next: (response) => {
                this.loadingVisible = false;
                // Mapear la respuesta del API a la estructura esperada por el grid
                if (response && response.data && Array.isArray(response.data)) {
                    this.informacion = response.data.map((item, index) => ({
                        id: index + 1,
                        operador: item.operador || item.nombreOperador || '',
                        licencia: item.licencia || item.numeroLicencia || '',
                        turnos: Number(item.turnos || item.totalTurnos || 0),
                        viajes: Number(item.viajes || item.totalViajes || 0),
                        validaciones: Number(item.validaciones || item.totalValidaciones || 0),
                        ingresos: Number(item.ingresos || item.ingresosTotales || 0),
                        ticketPromedio: Number(item.ticketPromedio || 0),
                        evasionPorcentaje: Number(item.evasionPorcentaje || 0) / 100,
                        ultimoTurno: item.ultimoTurno ? new Date(item.ultimoTurno) : new Date()
                    }));
                }
                else if (Array.isArray(response)) {
                    this.informacion = response.map((item, index) => ({
                        id: index + 1,
                        operador: item.operador || item.nombreOperador || '',
                        licencia: item.licencia || item.numeroLicencia || '',
                        turnos: Number(item.turnos || item.totalTurnos || 0),
                        viajes: Number(item.viajes || item.totalViajes || 0),
                        validaciones: Number(item.validaciones || item.totalValidaciones || 0),
                        ingresos: Number(item.ingresos || item.ingresosTotales || 0),
                        ticketPromedio: Number(item.ticketPromedio || 0),
                        evasionPorcentaje: Number(item.evasionPorcentaje || 0) / 100,
                        ultimoTurno: item.ultimoTurno ? new Date(item.ultimoTurno) : new Date()
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
], RecaudacionOperadorComponent.prototype, "dataGrid", void 0);
RecaudacionOperadorComponent = __decorate([
    Component({
        selector: 'vex-recaudacion-operador',
        templateUrl: './recaudacion-operador.component.html',
        styleUrl: './recaudacion-operador.component.scss',
        animations: [fadeInRight400ms],
    })
], RecaudacionOperadorComponent);
export { RecaudacionOperadorComponent };
//# sourceMappingURL=recaudacion-operador.component.js.map