import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListarVerificacionesComponent = class ListarVerificacionesComponent {
    constructor(mantenimientosService, router, alerts) {
        this.mantenimientosService = mantenimientosService;
        this.router = router;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.pageSize = 20;
        this.autoExpandAllGroups = true;
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
        this.listaVerificaciones = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.mantenimientosService.obtenerVerificacionesData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ??
                        toNum(resp?.total) ??
                        rows.length;
                    const dataTransformada = rows.map((item) => {
                        return {
                            ...item,
                            // Normalizar campos
                            id: Number(item?.id ?? item?.Id ?? 0),
                            placaVehiculo: item?.placaVehiculo ?? item?.PlacaVehiculo ?? '',
                            nombreOperador: item?.nombreOperador ?? item?.NombreOperador ?? '',
                            nombreCliente: item?.nombreCliente ?? item?.NombreCliente ?? item?.cliente?.nombre ?? item?.cliente?.Nombre ?? '',
                            nombreTipoVerificacion: item?.nombreTipoVerificacion ?? item?.NombreTipoVerificacion ?? item?.tipoVerificacion?.nombre ?? item?.tipoVerificacion?.Nombre ?? item?.tipoVerificacion?.descripcion ?? '',
                            verificacionActual: item?.verificacionActual ?? item?.VerificacionActual ?? null,
                            proximaVerificacion: item?.proximaVerificacion ?? item?.ProximaVerificacion ?? null,
                            notaVerificacion: item?.notaVerificacion ?? item?.NotaVerificacion ?? null,
                            imagenVehiculo: item?.imagenVehiculo ?? item?.ImagenVehiculo ?? null,
                            estatus: Number(item?.estatus ?? item?.Estatus ?? 1)
                        };
                    });
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
            grid?.option('dataSource', this.listaVerificaciones);
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
            return hitCols;
        });
        grid?.option('dataSource', dataFiltrada);
    }
    limpiarCampos() {
        this.dataGrid.instance.clearGrouping();
        this.setupDataSource();
        this.dataGrid.instance.refresh();
    }
    toggleExpandGroups() {
        const groupedColumns = this.dataGrid.instance.getVisibleColumns()
            .filter(col => (col.groupIndex ?? -1) >= 0);
        if (groupedColumns.length === 0) {
            return;
        }
        else {
            this.autoExpandAllGroups = !this.autoExpandAllGroups;
            this.dataGrid.instance.refresh();
        }
    }
    agregarRegistro() {
        this.router.navigate(['/administracion/verificaciones/registrar-verificacion']);
    }
    editarRegistro(id) {
        this.router.navigate([`/administracion/verificaciones/registrar-verificacion/${id}`]);
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar la verificación con placa: <strong>${rowData.placaVehiculo || 'N/A'}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.mantenimientosService.activarVerificacion(rowData.id).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se activó la verificación de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al activar la verificación.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                console.error('Error:', error);
            }
        });
    }
    async desactivar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Desactivar!',
            message: `¿Está seguro que requiere desactivar la verificación con placa: <strong>${rowData.placaVehiculo || 'N/A'}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.mantenimientosService.desactivarVerificacion(rowData.id).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se desactivó la verificación de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al desactivar la verificación.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                console.error('Error:', error);
            }
        });
    }
    verNotaVerificacion(url, nombre) {
        if (!url)
            return;
        window.open(url, '_blank');
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListarVerificacionesComponent.prototype, "dataGrid", void 0);
ListarVerificacionesComponent = __decorate([
    Component({
        selector: 'vex-listar-verificaciones',
        templateUrl: './listar-verificaciones.component.html',
        styleUrl: './listar-verificaciones.component.scss',
        animations: [fadeInRight400ms],
    })
], ListarVerificacionesComponent);
export { ListarVerificacionesComponent };
//# sourceMappingURL=listar-verificaciones.component.js.map