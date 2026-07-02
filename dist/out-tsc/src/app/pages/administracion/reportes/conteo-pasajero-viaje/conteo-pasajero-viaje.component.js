import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
let ConteoPasajeroViajeComponent = class ConteoPasajeroViajeComponent {
    constructor(alerts) {
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
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
    }
    ngOnInit() {
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
        }
        else {
            this.autoExpandAllGroups = !this.autoExpandAllGroups;
            this.dataGrid.instance.refresh();
        }
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ConteoPasajeroViajeComponent.prototype, "dataGrid", void 0);
ConteoPasajeroViajeComponent = __decorate([
    Component({
        selector: 'vex-conteo-pasajero-viaje',
        templateUrl: './conteo-pasajero-viaje.component.html',
        styleUrl: './conteo-pasajero-viaje.component.scss',
        animations: [fadeInRight400ms],
    })
], ConteoPasajeroViajeComponent);
export { ConteoPasajeroViajeComponent };
//# sourceMappingURL=conteo-pasajero-viaje.component.js.map