import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaTurnosComponent = class ListaTurnosComponent {
    constructor(router, turnService, alerts) {
        this.router = router;
        this.turnService = turnService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.loadingMessage = 'Cargando...';
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.autoExpandAllGroups = true;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.isGrouped = false;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
        // this.obtenerListaModulos();
    }
    // hasPermission(permission: string): boolean {
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
    agregarTurno() {
        this.router.navigateByUrl('/administracion/turnos/agregar-turno');
    }
    actualizarTurno(idTurno) {
        this.router.navigateByUrl('/administracion/turnos/editar-turno/' + idTurno);
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el turno: <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.turnService.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El turno ha sido activado.',
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
            message: `¿Está seguro que requiere desactivar el turno: <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.turnService.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'El turno ha sido desactivado.',
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
        this.listaTurnos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.turnService.obtenerTurnosData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ??
                        toNum(resp?.pages) ??
                        Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => ({
                        ...item,
                        estatusTexto: item?.estatus === 1
                            ? 'Activo'
                            : item?.estatus === 0
                                ? 'Inactivo'
                                : null,
                    }));
                    this.totalRegistros = totalRegistros;
                    this.paginaActual = paginaActual;
                    this.totalPaginas = totalPaginas;
                    this.paginaActualData = dataTransformada;
                    return {
                        data: dataTransformada,
                        totalCount: totalRegistros,
                    };
                }
                catch (err) {
                    this.loading = false;
                    console.error('Error en la solicitud de datos:', err);
                    return { data: [], totalCount: 0 };
                }
            },
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
                this.dataGrid.instance.option('dataSource', this.listaTurnos);
                return;
            }
            const search = this.filtroActivo.toString().toLowerCase();
            const dataFiltrada = this.paginaActualData.filter((item) => {
                const idStr = item.id ? item.id.toString().toLowerCase() : '';
                const nombreStr = item.nombre
                    ? item.nombre.toString().toLowerCase()
                    : '';
                const descripcionStr = item.descripcion
                    ? item.descripcion.toString().toLowerCase()
                    : '';
                const moduloStr = item.estatusTexto
                    ? item.estatusTexto.toString().toLowerCase()
                    : '';
                return (nombreStr.includes(search) ||
                    descripcionStr.includes(search) ||
                    moduloStr.includes(search) ||
                    idStr.includes(search));
            });
            this.dataGrid.instance.option('dataSource', dataFiltrada);
        }
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
], ListaTurnosComponent.prototype, "dataGrid", void 0);
ListaTurnosComponent = __decorate([
    Component({
        selector: 'vex-lista-turnos',
        templateUrl: './lista-turnos.component.html',
        styleUrl: './lista-turnos.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaTurnosComponent);
export { ListaTurnosComponent };
//# sourceMappingURL=lista-turnos.component.js.map