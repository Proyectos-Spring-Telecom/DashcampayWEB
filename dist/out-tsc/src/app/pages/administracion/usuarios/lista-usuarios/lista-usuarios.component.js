import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaUsuariosComponent = class ListaUsuariosComponent {
    constructor(usuService, route, alerts) {
        this.usuService = usuService;
        this.route = route;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.isLoading = false;
        this.grid = false;
        this.loadingVisible = false;
        this.mensajeAgrupar = "Arrastre un encabezado de columna aquí para agrupar por esa columna";
        this.loadingMessage = 'Cargando...';
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.registros = [];
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
    }
    agregarUsuario() {
        this.route.navigateByUrl('/administracion/usuarios/agregar-usuario');
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    onGridOptionChanged(e) {
        if (e.fullName !== 'searchPanel.text')
            return;
        const grid = this.dataGrid?.instance;
        const qRaw = (e.value ?? '').toString().trim();
        if (!qRaw) {
            this.filtroActivo = '';
            grid?.option('dataSource', this.listaUsuarios);
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
        if (!columnas.length && grid?.getVisibleColumns) {
            columnas = grid.getVisibleColumns();
        }
        const dataFields = columnas
            .map((c) => c?.dataField)
            .filter((df) => typeof df === 'string' && df.trim().length > 0);
        const getByPath = (obj, path) => !obj || !path ? undefined : path.split('.').reduce((acc, k) => acc?.[k], obj);
        let qStatusNum = null;
        if (q === '1' || q === 'Activo')
            qStatusNum = 1;
        else if (q === '0' || q === 'Inactivo')
            qStatusNum = 0;
        const dataFiltrada = (this.paginaActualData || []).filter((row) => {
            const hitCols = dataFields.some((df) => norm(getByPath(row, df)).includes(q));
            const estNum = Number(row?.Estatus ?? row?.estatus);
            const estHit = Number.isFinite(estNum) &&
                (qStatusNum !== null ? estNum === qStatusNum : String(estNum).toLowerCase().includes(q));
            const hitExtras = [
                norm(row?.Id),
                norm(row?.id),
                norm(row?.NombreCompleto),
                norm(row?.UserName),
                norm(row?.Telefono),
                norm(row?.RolNombre)
            ].some((s) => s.includes(q));
            return hitCols || estHit || hitExtras;
        });
        grid?.option('dataSource', dataFiltrada);
    }
    setupDataSource() {
        this.loading = true;
        this.listaUsuarios = new CustomStore({
            key: "id",
            load: async (loadOptions) => {
                const skipValue = Number(loadOptions?.skip) || 0;
                const takeValue = Number(loadOptions?.take) || this.pageSize;
                const page = Math.floor(skipValue / takeValue) + 1;
                try {
                    const response = await lastValueFrom(this.usuService.obtenerUsuariosData(page, takeValue));
                    this.loading = false;
                    const totalPaginas = Number(response?.paginated?.limit) || 0;
                    const totalRegistros = Number(response?.paginated?.total) || 0;
                    const paginaActual = Number(response?.paginated?.page) || page;
                    this.totalRegistros = totalRegistros;
                    this.paginaActual = paginaActual;
                    this.totalPaginas = totalPaginas;
                    let dataTransformada = (Array.isArray(response?.data) ? response.data : []).map((item) => {
                        const nombre = item?.Nombre || '';
                        const paterno = item?.ApellidoPaterno || '';
                        const materno = item?.ApellidoMaterno || '';
                        return {
                            ...item,
                            id: Number(item?.Id),
                            idRol: Number(item?.IdRol),
                            idCliente: Number(item?.IdCliente),
                            NombreCompleto: [nombre, paterno, materno].filter(Boolean).join(' ')
                        };
                    });
                    this.paginaActualData = dataTransformada;
                    return {
                        data: dataTransformada,
                        totalCount: totalRegistros
                    };
                }
                catch (error) {
                    this.loading = false;
                    return { data: [], totalCount: 0 };
                }
            }
        });
    }
    toNum(v) {
        const n = Number((v ?? '').toString().trim());
        return Number.isFinite(n) ? n : 0;
    }
    actualizarUsuario(idUsuario) {
        this.route.navigateByUrl('/administracion/usuarios/editar-usuario/' + idUsuario);
    }
    ;
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el usuario: <br> <strong>${rowData.NombreCompleto}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.usuService.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El usuario ha sido activado.',
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
            message: `¿Está seguro que requiere desactivar el usuario: <br> <strong>${rowData.NombreCompleto}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.usuService.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El usuario ha sido desactivado.',
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
    // hasPermission(permission: string): boolean {
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
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
], ListaUsuariosComponent.prototype, "dataGrid", void 0);
ListaUsuariosComponent = __decorate([
    Component({
        selector: 'vex-lista-usuarios',
        templateUrl: './lista-usuarios.component.html',
        styleUrl: './lista-usuarios.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaUsuariosComponent);
export { ListaUsuariosComponent };
//# sourceMappingURL=lista-usuarios.component.js.map