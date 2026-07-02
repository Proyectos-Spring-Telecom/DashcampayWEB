import { __decorate } from "tslib";
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { CambiarEstadoMonederoModalComponent } from '../cambiar-estado-monedero-modal/cambiar-estado-monedero-modal.component';
let ListaMonederosComponent = class ListaMonederosComponent {
    constructor(dialog, moneService, alerts, fb, route) {
        this.dialog = dialog;
        this.moneService = moneService;
        this.alerts = alerts;
        this.fb = fb;
        this.route = route;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.isLoading = false;
        this.grid = false;
        this.loadingVisible = false;
        this.mensajeAgrupar = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.destroyRef = inject(DestroyRef);
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.modalClosing = false;
        this.modalErrorOpen = false;
        this.modalErrorClosing = false;
        this.modalOpen = false;
        this.modalAnim = '';
        this.tipoOperacion = 'recarga';
        this.selectedTransaccion = null;
        this.montoIngresado = null;
        this.submitButton = 'Confirmar';
        this.loading = false;
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
        this.initForm();
        this.obtenerMonederos();
    }
    obtenerMonederos() {
        this.loading = true;
        this.listaMonederos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.moneService.obtenerMonederosData(page, take));
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
                                : null
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
        const texto = (e.value ?? '').toString().trim().toLowerCase();
        if (!texto) {
            grid?.option('dataSource', this.listaMonederos);
            this.filtroActivo = '';
            return;
        }
        this.filtroActivo = texto;
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
        const normalizar = (val) => {
            if (val === null || val === undefined)
                return '';
            if (val instanceof Date) {
                const dd = ('0' + val.getDate()).slice(2 - 2);
                const mm = ('0' + (val.getMonth() + 1)).slice(2 - 2);
                const yyyy = val.getFullYear();
                return `${dd}/${mm}/${yyyy}`.toLowerCase();
            }
            if (typeof val === 'number')
                return String(val).toLowerCase();
            const s = String(val).toLowerCase();
            return s;
        };
        const dataFiltrada = (this.paginaActualData || []).filter((row) => {
            const hitEnColumnas = dataFields.some((df) => {
                const v = row?.[df];
                if (df.toLowerCase().includes('fecha')) {
                    try {
                        const d = new Date(v);
                        if (!isNaN(d.getTime())) {
                            const dd = ('0' + d.getDate()).slice(-2);
                            const mm = ('0' + (d.getMonth() + 1)).slice(-2);
                            const yyyy = d.getFullYear();
                            const ddmmyyyy = `${dd}/${mm}/${yyyy}`.toLowerCase();
                            if (ddmmyyyy.includes(texto))
                                return true;
                        }
                    }
                    catch { }
                }
                return normalizar(v).includes(texto);
            });
            const extras = [normalizar(row?.id), normalizar(row?.estatusTexto)];
            return hitEnColumnas || extras.some((s) => s.includes(texto));
        });
        grid?.option('dataSource', dataFiltrada);
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    agregarMonedero() {
        this.route.navigateByUrl('/administracion/monederos/agregar-monedero');
    }
    limpiarCampos() {
        const today = new Date();
        this.dataGrid.instance.clearGrouping();
        this.isGrouped = false;
        this.obtenerMonederos();
        this.dataGrid.instance.refresh();
    }
    editarMonedero(idMonedero) {
        this.route.navigateByUrl(`/administracion/monederos/editar-monedero/${idMonedero}`);
    }
    cambiarEstado(rowData) {
        const data = {
            numeroSerie: rowData.numeroSerie || 'N/A',
            idMonedero: rowData.id || 0
        };
        const dialogRef = this.dialog.open(CambiarEstadoMonederoModalComponent, {
            width: '450px',
            disableClose: true,
            data: data
        });
        dialogRef.afterClosed().subscribe((idTipoPasajero) => {
            if (idTipoPasajero !== undefined && idTipoPasajero !== null) {
                this.moneService.actualizarTipoPasajero(rowData.id, idTipoPasajero).subscribe({
                    next: () => {
                        this.alerts.open({
                            type: 'success',
                            title: '¡Operación Exitosa!',
                            message: 'El tipo de pasajero del monedero se actualizó correctamente.',
                            confirmText: 'Confirmar',
                            backdropClose: false,
                        });
                        this.obtenerMonederos();
                        this.dataGrid.instance.refresh();
                    },
                    error: (error) => {
                        this.alerts.open({
                            type: 'error',
                            title: '¡Ops!',
                            message: 'Ocurrió un error al actualizar el tipo de pasajero del monedero.',
                            confirmText: 'Confirmar',
                            backdropClose: false,
                        });
                    }
                });
            }
        });
    }
    toggleExpandGroups() {
        const groupedColumns = this.dataGrid.instance
            .getVisibleColumns()
            .filter((col) => (col.groupIndex ?? -1) >= 0);
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
    onBackdropError() {
        this.closeErrorModal();
    }
    closeErrorModal() {
        this.modalErrorClosing = true;
        setTimeout(() => {
            this.modalErrorOpen = false;
            this.modalErrorClosing = false;
        }, 200);
    }
    onBackdrop() {
        this.closeModal();
    }
    closeModal() {
        this.modalClosing = true;
        setTimeout(() => {
            this.modalOpen = false;
            this.modalClosing = false;
        }, 600);
    }
    initForm() {
        this.recargaForm = this.fb.group({
            tipoTransaccion: ['Recarga'],
            monto: [null, [Validators.required]],
            latitud: [null],
            longitud: [null],
            fechaHora: [null],
            numeroSerieMonedero: [null],
            numeroSerieValidador: [null]
        });
        this.debitoForm = this.fb.group({
            tipoTransaccion: ['Recarga'],
            monto: [null, [Validators.required]],
            latitud: [null],
            longitud: [null],
            fechaHora: [null],
            numeroSerieMonedero: [null],
            numeroSerieValidador: [null]
        });
    }
    abrirModal(tipo, raw) {
        this.tipoOperacion = tipo;
        const id = raw?.Id ?? raw?.id ?? null;
        const saldo = raw?.Saldo ?? raw?.saldo ?? 0;
        const numeroSerie = raw?.numeroSerie ?? raw?.NumeroSerie ?? raw?.numSerie ?? null;
        this.selectedTransaccion = { id, saldo, numSerie: numeroSerie };
        const form = tipo === 'recarga' ? this.recargaForm : this.debitoForm;
        form.reset({
            tipoTransaccion: tipo === 'recarga' ? 'RECARGA' : 'DEBITO',
            monto: null,
            latitud: null,
            longitud: null,
            fechaHora: this.nowWithOffset(),
            numeroSerieMonedero: numeroSerie,
            numeroSerieValidador: null
        });
        this.modalOpen = true;
        this.modalAnim = 'in';
        this.modalClosing = false;
    }
    cerrarModal() {
        this.modalClosing = true;
        this.modalAnim = 'out';
        setTimeout(() => {
            this.modalOpen = false;
            this.modalClosing = false;
            this.modalAnim = '';
            this.montoIngresado = null;
        }, 300);
    }
    onAnimationEnd() {
        if (this.modalAnim === 'out') {
            this.modalOpen = false;
        }
    }
    confirmarOperacion() {
        const form = this.tipoOperacion === 'recarga' ? this.recargaForm : this.debitoForm;
        const opNombre = this.tipoOperacion === 'recarga' ? 'Recarga' : 'Débito';
        const opVerbo = this.tipoOperacion === 'recarga' ? 'recargar' : 'debitar';
        const montoVal = Number(form.get('monto')?.value);
        if (!montoVal || isNaN(montoVal) || montoVal <= 0) {
            setTimeout(() => {
                this.alerts.open({
                    type: 'warning',
                    title: 'Monto inválido',
                    message: `Ingresa un monto mayor a 0 para ${opVerbo}.`,
                    confirmText: 'Aceptar'
                });
            }, 200);
            return;
        }
        const payload = {
            tipoTransaccion: form.get('tipoTransaccion')?.value,
            monto: montoVal,
            latitud: null,
            longitud: null,
            fechaHora: form.get('fechaHora')?.value || this.nowWithOffset(),
            numeroSerieMonedero: this.selectedTransaccion?.numSerie ??
                form.get('numeroSerieMonedero')?.value ??
                null,
            numeroSerieValidador: null
        };
        this.loading = true;
        this.submitButton = 'Cargando...';
        this.moneService.crearTransaccion(payload).subscribe({
            next: () => {
                this.loading = false;
                this.submitButton = 'Confirmar';
                this.ngOnInit();
                this.cerrarModal();
                setTimeout(() => {
                    this.alerts.open({
                        type: 'success',
                        title: '¡Operación Exitosa!',
                        message: `La transacción ${opNombre} se realizó de manera correcta.`,
                        confirmText: 'Confirmar'
                    });
                }, 200);
            },
            error: (err) => {
                this.loading = false;
                this.submitButton = 'Confirmar';
                this.getErrorMessage(err).then((msg) => {
                    setTimeout(() => {
                        this.alerts.open({
                            type: 'error',
                            title: '¡Ops!',
                            message: msg,
                            confirmText: 'Aceptar',
                            backdropClose: false
                        });
                    }, 200);
                });
            }
        });
    }
    nowWithOffset() {
        const d = new Date();
        const tz = d.getTimezoneOffset();
        const sign = tz > 0 ? '-' : '+';
        const local = new Date(d.getTime() - tz * 60000);
        const iso = local.toISOString().slice(0, 19);
        const hh = String(Math.floor(Math.abs(tz) / 60)).padStart(2, '0');
        const mm = String(Math.abs(tz) % 60).padStart(2, '0');
        return `${iso}${sign}${hh}:${mm}`;
    }
    async getErrorMessage(err) {
        if (err?.status === 0 && !err?.error) {
            return 'No hay conexión con el servidor (status 0). Verifica tu red.';
        }
        if (err?.error instanceof Blob) {
            try {
                const txt = await err.error.text();
                if (txt)
                    return txt;
            }
            catch {
            }
        }
        if (typeof err?.error === 'string' && err.error.trim()) {
            return err.error;
        }
        if (typeof err?.message === 'string' && err.message.trim()) {
            return err.message;
        }
        if (err?.error?.message) {
            return String(err.error.message);
        }
        if (err?.error?.errors) {
            const e = err.error.errors;
            if (Array.isArray(e)) {
                return e.filter(Boolean).join('\n');
            }
            if (typeof e === 'object') {
                const lines = [];
                for (const k of Object.keys(e)) {
                    const val = e[k];
                    if (Array.isArray(val))
                        lines.push(`${k}: ${val.join(', ')}`);
                    else if (val)
                        lines.push(`${k}: ${val}`);
                }
                if (lines.length)
                    return lines.join('\n');
            }
        }
        const statusLine = err?.status
            ? `HTTP ${err.status}${err.statusText ? ' ' + err.statusText : ''}`
            : '';
        return statusLine;
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaMonederosComponent.prototype, "dataGrid", void 0);
ListaMonederosComponent = __decorate([
    Component({
        selector: 'vex-lista-monederos',
        templateUrl: './lista-monederos.component.html',
        styleUrl: './lista-monederos.component.scss',
        animations: [fadeInRight400ms]
    })
], ListaMonederosComponent);
export { ListaMonederosComponent };
//# sourceMappingURL=lista-monederos.component.js.map