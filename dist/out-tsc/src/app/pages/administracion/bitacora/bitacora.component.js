import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { MatInputModule } from '@angular/material/input';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let BitacoraComponent = class BitacoraComponent {
    constructor(bitacoraService, usuService, alerts) {
        this.bitacoraService = bitacoraService;
        this.usuService = usuService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.searchTerm = '';
        this.startDate = '';
        this.endDate = '';
        this.isLoading = false;
        this.grid = true;
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.loading = false;
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
        this.obtenerBitacora();
        this.obtenerUsuarios();
    }
    obtenerUsuarios() {
        this.usuService.obtenerUsuarios().subscribe((response) => {
            this.listaUsuarios = response.data;
            this.mapaUsuarios = new Map((this.listaUsuarios || []).map((u) => [String(u.id), u]));
        });
    }
    obtenerBitacora() {
        this.loading = true;
        this.bitacoraList = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.bitacoraService.obtenerBitacoraData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? toNum(resp?.pages) ?? Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => {
                        const uid = String(item?.idUsuario ?? '');
                        const u = this.mapaUsuarios?.get(uid) ?? (this.listaUsuarios || []).find((x) => String(x?.id) === uid);
                        let accionTexto = null;
                        if (item?.accion === 'CREATE')
                            accionTexto = 'Crear';
                        else if (item?.accion === 'UPDATE')
                            accionTexto = 'Actualizar';
                        else if (item?.accion === 'DELETE')
                            accionTexto = 'Eliminar';
                        const nombreCompleto = u
                            ? `${u.nombre ?? ''} ${u.apellidoPaterno ?? ''}`.trim()
                            : 'Desconocido';
                        return {
                            ...item,
                            estatusTexto: item?.estatus === 1 ? 'Activo' :
                                item?.estatus === 0 ? 'Inactivo' : null,
                            usuarioNombre: nombreCompleto,
                            accionTexto
                        };
                    });
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
        if (e.fullName !== 'searchPanel.text')
            return;
        const grid = this.dataGrid?.instance;
        const q = (e.value ?? '').toString().trim().toLowerCase();
        if (!q) {
            this.filtroActivo = '';
            grid?.option('dataSource', this.bitacoraList);
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
                const hh = String(val.getHours()).padStart(2, '0');
                const mi = String(val.getMinutes()).padStart(2, '0');
                const ss = String(val.getSeconds()).padStart(2, '0');
                const ampm = val.getHours() >= 12 ? 'pm' : 'am';
                return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss} ${ampm}`.toLowerCase();
            }
            if (typeof val === 'string') {
                let s = val.toLowerCase();
                if (/\d{4}-\d{2}-\d{2}T?/.test(val)) {
                    const d = new Date(val);
                    if (!isNaN(d.getTime())) {
                        const dd = String(d.getDate()).padStart(2, '0');
                        const mm = String(d.getMonth() + 1).padStart(2, '0');
                        const yyyy = d.getFullYear();
                        const hh = String(d.getHours()).padStart(2, '0');
                        const mi = String(d.getMinutes()).padStart(2, '0');
                        const ss = String(d.getSeconds()).padStart(2, '0');
                        const ampm = d.getHours() >= 12 ? 'pm' : 'am';
                        s = `${s} ${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss} ${ampm} ${dd}/${mm}/${yyyy}`;
                    }
                }
                return s;
            }
            if (Array.isArray(val))
                return val.map(normalizar).join(' ');
            return String(val).toLowerCase();
        };
        const dataFiltrada = (this.paginaActualData || []).filter((row) => {
            const hitCols = dataFields.some((df) => normalizar(getByPath(row, df)).includes(q));
            const hitExtras = [
                normalizar(row?.id),
                normalizar(row?.modulo),
                normalizar(row?.accionTexto),
                normalizar(row?.usuarioNombre),
                normalizar(row?.estatusTexto)
            ].some((s) => s.includes(q));
            const hitFecha = normalizar(row?.fechaCreacion).includes(q);
            return hitCols || hitExtras || hitFecha;
        });
        grid?.option('dataSource', dataFiltrada);
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    getUserFromQuery(query) {
        const match = query.match(/UserName='([^']+)'/);
        return match ? match[1] : 'Desconocido';
    }
    limpiarCampos() {
        const today = new Date();
        this.dataGrid.instance.clearGrouping();
        this.isGrouped = false;
        this.obtenerBitacora();
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
], BitacoraComponent.prototype, "dataGrid", void 0);
BitacoraComponent = __decorate([
    Component({
        selector: 'vex-bitacora',
        templateUrl: './bitacora.component.html',
        styleUrl: './bitacora.component.scss',
        animations: [fadeInRight400ms],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            MatButtonToggleModule,
            ReactiveFormsModule,
            VexPageLayoutContentDirective,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatMenuModule,
            MatTableModule,
            MatSortModule,
            MatCheckboxModule,
            MatPaginatorModule,
            FormsModule,
            MatDialogModule,
            MatInputModule,
            DxDataGridModule,
            CommonModule
        ]
    })
], BitacoraComponent);
export { BitacoraComponent };
//# sourceMappingURL=bitacora.component.js.map