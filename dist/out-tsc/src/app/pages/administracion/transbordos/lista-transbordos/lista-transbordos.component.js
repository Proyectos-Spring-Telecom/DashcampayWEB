import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaTransbordosComponent = class ListaTransbordosComponent {
    constructor(transbordosService, alerts, route) {
        this.transbordosService = transbordosService;
        this.alerts = alerts;
        this.route = route;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.isLoading = false;
        this.autoGenerateColumns = true;
        this.grid = false;
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.loadingMessage = 'Cargando...';
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
    }
    setupDataSource() {
        this.loading = true;
        this.listaTransbordos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.transbordosService.obtenerTransbordosData(page, take));
                    this.loading = false;
                    let rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? toNum(resp?.pages) ??
                        Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => ({
                        ...item,
                        estatusTexto: Number(item?.estatus) === 1 ? 'Activo' :
                            Number(item?.estatus) === 0 ? 'Inactivo' : null
                    }));
                    this.totalRegistros = totalRegistros;
                    this.paginaActual = paginaActual;
                    this.totalPaginas = totalPaginas;
                    this.paginaActualData = dataTransformada;
                    return {
                        data: dataTransformada,
                        totalCount: totalRegistros
                    };
                }
                catch (error) {
                    this.loading = false;
                    console.error('Error en la solicitud de datos:', error);
                    return { data: [], totalCount: 0 };
                }
            }
        });
        function toNum(v) {
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        }
    }
    onGridOptionChanged(e) {
        if (e.fullName === 'searchPanel.text') {
            this.filtroActivo = e.value || '';
            if (!this.filtroActivo) {
                this.dataGrid.instance.option('dataSource', this.listaTransbordos);
                return;
            }
            const search = this.filtroActivo.toLowerCase();
            const dataFiltrada = this.paginaActualData.filter((item) => {
                const keys = Object.keys(item);
                return keys.some(key => {
                    const value = item[key];
                    return value && value.toString().toLowerCase().includes(search);
                });
            });
            this.dataGrid.instance.option('dataSource', dataFiltrada);
        }
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    limpiarCampos() {
        this.dataGrid.instance.clearGrouping();
        this.isGrouped = false;
        this.setupDataSource();
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
    agregarTransbordo() {
        this.route.navigateByUrl('/administracion/transbordos/agregar-transbordo');
    }
    editarTransbordo(id) {
        this.route.navigateByUrl('/administracion/transbordos/editar-transbordo/' + id);
    }
    async eliminarTransbordo(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Eliminar!',
            message: `¿Está seguro que requiere eliminar el transbordo: <strong>${rowData.nombre || 'este transbordo'}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.transbordosService.eliminarTransbordo(rowData.id).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El transbordo ha sido eliminado.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.setupDataSource();
            this.dataGrid.instance.refresh();
        }, (error) => {
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaTransbordosComponent.prototype, "dataGrid", void 0);
ListaTransbordosComponent = __decorate([
    Component({
        selector: 'vex-lista-transbordos',
        templateUrl: './lista-transbordos.component.html',
        styleUrl: './lista-transbordos.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaTransbordosComponent);
export { ListaTransbordosComponent };
//# sourceMappingURL=lista-transbordos.component.js.map