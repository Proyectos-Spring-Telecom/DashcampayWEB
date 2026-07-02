import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaRolesComponent = class ListaRolesComponent {
    constructor(router, alerts, rolService) {
        this.router = router;
        this.alerts = alerts;
        this.rolService = rolService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.loadingMessage = 'Cargando...';
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
        // this.obtenerlistaRoles();
    }
    // hasPermission(permission: string): boolean {
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
    obtenerlistaRoles() {
        this.loading = true;
        this.rolService.obtenerRoles().subscribe((response) => {
            this.loading = false;
            this.listaRoles = response;
        });
    }
    agregarRol() {
        this.router.navigateByUrl('/administracion/roles/agregar-rol');
    }
    actualizarRol(idRol) {
        this.router.navigateByUrl('/administracion/roles/editar-rol/' + idRol);
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el rol: <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.rolService.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El rol ha sido activado.',
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
            message: `¿Está seguro que requiere desactivar el rol: <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.rolService.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El rol ha sido desactivado.',
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
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    setupDataSource() {
        this.loading = true;
        this.listaRoles = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.rolService.obtenerRolesData(page, take));
                    this.loading = false;
                    // Filas
                    let rows = Array.isArray(resp?.data) ? resp.data : [];
                    // Meta de paginación del backend
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? toNum(resp?.pages) ??
                        Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => ({
                        ...item
                    }));
                    // Estado para tu UI
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
        const q = (e.value ?? '').toString().trim().toLowerCase();
        if (!q) {
            this.filtroActivo = '';
            grid?.option('dataSource', this.listaRoles);
            return;
        }
        this.filtroActivo = q;
        let columnas = [];
        try {
            const colsOpt = grid?.option('columns');
            if (Array.isArray(colsOpt) && colsOpt.length)
                columnas = colsOpt;
        }
        catch { }
        if (!columnas.length && grid?.getVisibleColumns) {
            columnas = grid.getVisibleColumns();
        }
        const dataFields = columnas
            .map((c) => c?.dataField)
            .filter((df) => typeof df === 'string' && df.trim().length > 0);
        const getByPath = (obj, path) => {
            if (!obj || !path)
                return undefined;
            return path.split('.').reduce((acc, key) => acc?.[key], obj);
        };
        const normalizar = (val) => {
            if (val === null || val === undefined)
                return '';
            if (val instanceof Date) {
                const dd = String(val.getDate()).padStart(2, '0');
                const mm = String(val.getMonth() + 1).padStart(2, '0');
                const yyyy = val.getFullYear();
                return `${dd}/${mm}/${yyyy}`.toLowerCase();
            }
            if (typeof val === 'string')
                return val.toLowerCase();
            if (Array.isArray(val))
                return val.map(normalizar).join(' ');
            return String(val).toLowerCase();
        };
        const dataFiltrada = (this.paginaActualData || []).filter((row) => {
            const hitCols = dataFields.some((df) => normalizar(getByPath(row, df)).includes(q));
            const estNum = Number(row?.estatus);
            const estText = (row?.estatusTexto ?? (estNum === 1 ? 'Activo' : estNum === 0 ? 'Inactivo' : '')).toLowerCase();
            const estHits = estText.includes(q) ||
                String(estNum).toLowerCase().includes(q) ||
                (q === 'activo' && estNum === 1) ||
                (q === 'inactivo' && estNum === 0);
            const hitExtras = [
                normalizar(row?.id),
                normalizar(row?.Id)
            ].some((s) => s.includes(q));
            return hitCols || estHits || hitExtras;
        });
        grid?.option('dataSource', dataFiltrada);
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
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaRolesComponent.prototype, "dataGrid", void 0);
ListaRolesComponent = __decorate([
    Component({
        selector: 'vex-lista-roles',
        templateUrl: './lista-roles.component.html',
        styleUrl: './lista-roles.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaRolesComponent);
export { ListaRolesComponent };
//# sourceMappingURL=lista-roles.component.js.map