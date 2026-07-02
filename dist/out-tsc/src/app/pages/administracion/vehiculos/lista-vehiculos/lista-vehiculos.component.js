import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaVehiculosComponent = class ListaVehiculosComponent {
    constructor(vehiService, alerts, router, // para navegar
    route, sanitizer) {
        this.vehiService = vehiService;
        this.alerts = alerts;
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.isLoading = false;
        this.grid = false;
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.loadingMessage = 'Cargando...';
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
    }
    // hasPermission(permission: string): boolean {
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
    setupDataSource() {
        this.loading = true;
        this.listaVehiculos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.vehiService.obtenerVehiculosData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ??
                        toNum(resp?.total) ??
                        rows.length;
                    const paginaActual = toNum(meta.page) ??
                        toNum(resp?.page) ??
                        page;
                    const totalPaginas = toNum(meta.lastPage) ??
                        toNum(resp?.pages) ??
                        Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => ({
                        ...item,
                        estatusTexto: item?.estatus === 1 ? 'Activo' :
                            item?.estatus === 0 ? 'Inactivo' : null
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
                catch (err) {
                    this.loading = false;
                    console.error('Error en la solicitud de datos:', err);
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
        if (e.fullName !== 'searchPanel.text')
            return;
        const grid = this.dataGrid?.instance;
        const qRaw = (e.value ?? '').toString().trim();
        if (!qRaw) {
            this.filtroActivo = '';
            grid?.option('dataSource', this.listaVehiculos);
            return;
        }
        this.filtroActivo = qRaw;
        const norm = (v) => (v == null ? '' : String(v))
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
        const q = norm(qRaw);
        let columnas = [];
        try {
            const colsOpt = grid?.option('columns');
            if (Array.isArray(colsOpt) && colsOpt.length)
                columnas = colsOpt;
        }
        catch { }
        if (!columnas.length && grid?.getVisibleColumns)
            columnas = grid.getVisibleColumns();
        const dataFields = columnas
            .map((c) => c?.dataField)
            .filter((df) => typeof df === 'string' && df.trim().length > 0);
        const getByPath = (obj, path) => !obj || !path ? undefined : path.split('.').reduce((acc, k) => acc?.[k], obj);
        const dataFiltrada = (this.paginaActualData || []).filter((row) => {
            const hitCols = dataFields.some((df) => norm(getByPath(row, df)).includes(q));
            const estNum = Number(row?.estatus);
            const estText = Number.isFinite(estNum) ? (estNum === 1 ? 'activo' : 'inactivo') : '';
            const estHits = estText.includes(q) ||
                ('activo'.startsWith(q) && estNum === 1) ||
                ('inactivo'.startsWith(q) && estNum === 0) ||
                (q === '1' && estNum === 1) ||
                (q === '0' && estNum === 0) ||
                String(estNum).includes(q);
            const hitExtras = [
                norm(row?.id),
                norm(row?.marca),
                norm(row?.modelo),
                norm(row?.placa),
                norm(row?.numeroEconomico),
                norm(row?.ano)
            ].some((s) => s.includes(q));
            return hitCols || estHits || hitExtras;
        });
        grid?.option('dataSource', dataFiltrada);
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    showInfo(id) {
        console.log('Mostrar información del vehículo con ID:', id);
    }
    actualizarVehiculo(idVehiculo) {
        this.router.navigateByUrl('/administracion/vehiculos/editar-vehiculo/' + idVehiculo);
    }
    ;
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el vehículo: <br> <strong>${rowData.marca} ${rowData.modelo}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.vehiService.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El vehículo ha sido activado.',
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
    async desactivar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Desactivar!',
            message: `¿Está seguro que requiere desactivar el vehículo: <br> <strong>${rowData.marca} ${rowData.modelo}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.vehiService.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El vehículo ha sido desactivado.',
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
    limpiarCampos() {
        const today = new Date();
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
    irAVerDocumento(url, titulo, fila) {
        this.router.navigate(['ver-documento'], {
            relativeTo: this.route,
            queryParams: { url, titulo }
        });
    }
    agregarVehiculo() {
        this.router.navigateByUrl('/administracion/vehiculos/agregar-vehiculo');
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaVehiculosComponent.prototype, "dataGrid", void 0);
ListaVehiculosComponent = __decorate([
    Component({
        selector: 'vex-lista-vehiculos',
        templateUrl: './lista-vehiculos.component.html',
        styleUrl: './lista-vehiculos.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaVehiculosComponent);
export { ListaVehiculosComponent };
//# sourceMappingURL=lista-vehiculos.component.js.map