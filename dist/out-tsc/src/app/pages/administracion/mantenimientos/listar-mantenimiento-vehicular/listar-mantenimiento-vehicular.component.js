import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { CambiarEstadoMantenimientoModalComponent } from '../cambiar-estado-mantenimiento-modal/cambiar-estado-mantenimiento-modal.component';
import { EstadoMantenimientoVehicular, EstadoMantenimientoVehicularLabels } from "../../../../entities/estado-mantenimiento-vehicular.enum";
let ListarMantenimientoVehicularComponent = class ListarMantenimientoVehicularComponent {
    constructor(mantenimientosService, router, alerts, sanitizer, dialog) {
        this.mantenimientosService = mantenimientosService;
        this.router = router;
        this.alerts = alerts;
        this.sanitizer = sanitizer;
        this.dialog = dialog;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.pageSize = 20;
        this.autoExpandAllGroups = true;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.EstadoMantenimientoVehicular = EstadoMantenimientoVehicular;
        this.EstadoMantenimientoVehicularLabels = EstadoMantenimientoVehicularLabels;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
    }
    setupDataSource() {
        this.loading = true;
        this.listaMantenimientos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.mantenimientosService.obtenerMantenimientoVehicularData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ??
                        toNum(resp?.total) ??
                        rows.length;
                    const dataTransformada = rows.map((item) => {
                        const idNum = Number(item?.id ?? item?.Id ?? item?.ID ?? 0);
                        const idEstatus = Number(item?.idEstatus ?? item?.IdEstatus ?? item?.estatusMantenimiento?.id ?? item?.estatusMantenimiento?.Id ?? 1);
                        const estatus = Number(item?.estatus ?? item?.Estatus ?? item?.ESTATUS ?? 1);
                        return {
                            ...item,
                            // Normalizar id
                            id: Number.isFinite(idNum) ? idNum : 0,
                            // Normalizar idEstatus
                            idEstatus: Number.isFinite(idEstatus) ? idEstatus : 1,
                            // Normalizar estatus (para activar/desactivar)
                            estatus: Number.isFinite(estatus) ? estatus : 1,
                            // Aplanar campos anidados para el grid
                            nombreTaller: item?.taller?.nombre ?? item?.taller?.Nombre ?? '',
                            nombreReferencia: item?.referenciaServicio?.nombre ?? item?.referenciaServicio?.Nombre ?? '',
                            nombreEstatus: EstadoMantenimientoVehicularLabels[idEstatus] ?? item?.estatusMantenimiento?.nombre ?? item?.estatusMantenimiento?.Nombre ?? '',
                            nombreCliente: item?.cliente?.nombre ?? item?.cliente?.Nombre ?? '',
                            // Normalizar otros campos
                            placaVehiculo: item?.placaVehiculo ?? '',
                            servicioDescripcion: item?.servicioDescripcion ?? '',
                            costo: item?.costo ?? null,
                            encargado: item?.encargado ?? '',
                            fechaInicio: item?.fechaInicio ?? null,
                            fechaFinal: item?.fechaFinal ?? null,
                            fhRegistro: item?.fhRegistro ?? null,
                            notaServicio: item?.notaServicio ?? null,
                            imagenVehiculo: item?.imagenVehiculo ?? null
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
            grid?.option('dataSource', this.listaMantenimientos);
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
        this.router.navigateByUrl('/administracion/mantenimientos/registrar-mantenimiento-vehicular');
    }
    editarRegistro(id) {
        this.router.navigateByUrl(`/administracion/mantenimientos/registrar-mantenimiento-vehicular/${id}`);
    }
    verNotaServicio(url, nombre) {
        if (!url)
            return;
        const urlSanitizada = this.sanitizer.sanitize(4, url) || url;
        window.open(urlSanitizada, '_blank');
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el mantenimiento vehicular con placa: <strong>${rowData.placaVehiculo || 'N/A'}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.mantenimientosService.activarMantenimientoVehicular(rowData.id).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se activó el mantenimiento vehicular de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al activar el mantenimiento vehicular.',
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
            message: `¿Está seguro que requiere desactivar el mantenimiento vehicular con placa: <strong>${rowData.placaVehiculo || 'N/A'}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.mantenimientosService.desactivarMantenimientoVehicular(rowData.id).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se desactivó el mantenimiento vehicular de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al desactivar el mantenimiento vehicular.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                console.error('Error:', error);
            }
        });
    }
    refrescarRegistro(rowData) {
        const data = {
            placaVehiculo: rowData.placaVehiculo || 'N/A',
            estadoActual: rowData.idEstatus || rowData.estatusMantenimiento?.id || 1
        };
        const dialogRef = this.dialog.open(CambiarEstadoMantenimientoModalComponent, {
            width: '450px',
            disableClose: true,
            data: data
        });
        dialogRef.afterClosed().subscribe((nuevoEstado) => {
            if (nuevoEstado !== undefined && nuevoEstado !== null) {
                this.mantenimientosService.actualizarEstatusMantenimientoVehicular(rowData.id, nuevoEstado).subscribe({
                    next: () => {
                        this.alerts.open({
                            type: 'success',
                            title: '¡Estado Actualizado!',
                            message: `El estado del mantenimiento ha sido actualizado correctamente.`,
                            confirmText: 'Confirmar',
                            backdropClose: false
                        });
                        this.dataGrid.instance.refresh();
                    },
                    error: (error) => {
                        this.alerts.open({
                            type: 'error',
                            title: '¡Ops!',
                            message: 'Ocurrió un error al actualizar el estado del mantenimiento.',
                            confirmText: 'Confirmar',
                            backdropClose: false
                        });
                        console.error('Error:', error);
                    }
                });
            }
        });
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListarMantenimientoVehicularComponent.prototype, "dataGrid", void 0);
ListarMantenimientoVehicularComponent = __decorate([
    Component({
        selector: 'vex-listar-mantenimiento-vehicular',
        templateUrl: './listar-mantenimiento-vehicular.component.html',
        styleUrl: './listar-mantenimiento-vehicular.component.scss',
        animations: [fadeInRight400ms],
    })
], ListarMantenimientoVehicularComponent);
export { ListarMantenimientoVehicularComponent };
//# sourceMappingURL=listar-mantenimiento-vehicular.component.js.map