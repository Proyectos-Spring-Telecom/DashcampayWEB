import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let PerfilPasajeroComponent = class PerfilPasajeroComponent {
    obtenerNombreMesActual() {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[new Date().getMonth()];
    }
    constructor(users, tranService, moneService, pasjService, alerts) {
        this.users = users;
        this.tranService = tranService;
        this.moneService = moneService;
        this.pasjService = pasjService;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.mesActual = 'Noviembre 2025'; // o lo calculas dinámico
        this.gastoMes = 12345; // número
        this.saldoActual = 56789.34; // número
        this.ultimaRecarga = new Date(); // fecha de la última recarga
        this.movimientos = [
            {
                tipo: 'Debito',
                concepto: 'Pago de servicio',
                descripcion: 'Luz | Cargo automático',
                monto: 405.34,
                fecha: new Date(2020, 0, 20)
            },
            {
                tipo: 'Debito',
                concepto: 'Depósito',
                descripcion: 'Transferencia bancaria',
                monto: 1200,
                fecha: new Date(2020, 0, 18)
            },
            {
                tipo: 'Recarga',
                concepto: 'Recarga',
                descripcion: 'DashCam Pay',
                monto: 500,
                fecha: new Date(2020, 0, 15)
            }
        ];
        this.errorUsuarioOperador = false;
        this.loadingTx = false;
        this.paginaActualTx = 1;
        this.paginaActualDataTx = [];
        this.filtroActivoTx = '';
        this.loadingMone = false;
        this.paginaActualM = 1;
        this.totalRegistrosM = 0;
        this.pageSizeM = 14;
        this.totalPaginasM = 0;
        this.paginaActualDataM = [];
        this.filtroActivoM = '';
        this.showFilterRowTx = false;
        this.showHeaderFilterTx = false;
        this.showFilterRowM = false;
        this.showHeaderFilterM = false;
        this.mensajeAgruparTx = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.mensajeAgruparM = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
        this.ultimoLogin = null;
        this.mesActualLabel = '';
        this.saldo = 9876.33;
        this.pageSizeTx = 10;
        this.pageIndexTx = 1;
        this.totalRegistrosTx = 0;
        this.totalPaginasTx = 1;
        this.modalAnim = 'in';
        this.modalOpen = false;
        this.modalClosing = false;
        this.modalErrorOpen = false;
        this.modalErrorClosing = false;
        this.selectedTransaccion = null;
        this.MAP_ID = 'DEMO_MAP_ID';
        this.hasCoords = false;
        this.paginaActual = 1;
        this.totalRegistros = 0;
        this.pageSize = 20;
        this.totalPaginas = 0;
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.fechaInicio = null;
        this.fechaFin = null;
        this.fechaInicioFiltro = null;
        this.fechaFinFiltro = null;
        this.mesActualLabel = this.obtenerNombreMesActual();
        const sanitize = (value) => {
            if (value === null || value === undefined)
                return '';
            const str = String(value).trim();
            return str && str.toLowerCase() !== 'null' ? str : '';
        };
        const user = this.users.getUser();
        this.showNombre = sanitize(user?.nombre);
        this.showApellidoPaterno = sanitize(user?.apellidoPaterno);
        this.showApellidoMaterno = sanitize(user?.apellidoMaterno);
        this.showCreacion = this.formatFechaCreacion(user?.fechaCreacion);
        this.ultimoLogin = this.formatFechaCreacion(user?.ultimoLogin);
        const tel = user?.telefono;
        this.showTelefono =
            tel === null ||
                tel === undefined ||
                String(tel).trim().toLowerCase() === 'null'
                ? 'Sin registro'
                : String(tel).trim();
        this.showCorreo = user?.userName;
        this.showId = Number(user?.id);
        this.showNombreCliente = sanitize(user?.nombreCliente);
        this.showApellidoPaternoCliente = sanitize(user?.apellidoPaternoCliente);
        this.showApellidoMaternoCliente = sanitize(user?.apellidoMaternoCliente);
    }
    formatFechaCreacion(raw) {
        if (!raw || raw === 'null')
            return '';
        const d = new Date(raw);
        if (isNaN(d.getTime()))
            return String(raw);
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    obtenerUsuarioOperador() {
        this.errorUsuarioOperador = false;
        this.pasjService.datosUsuarioPasajero().subscribe({
            next: (response) => {
                const data = response?.data;
                this.informacion = Array.isArray(data) ? (data[0] ?? {}) : (data ?? {});
                this.errorUsuarioOperador = false;
            },
            error: () => {
                this.informacion = {};
                this.errorUsuarioOperador = true;
            }
        });
    }
    ngOnInit() {
        this.obtenerUsuarioOperador();
        this.cargarTransaccionesTx(1);
    }
    cargarTransaccionesTx(page = 1) {
        this.loadingTx = true;
        const body = {
            page,
            limit: this.pageSizeTx,
            fechaInicio: null,
            fechaFin: null
        };
        this.tranService.obtenerTransaccionesData(body).subscribe({
            next: (resp) => {
                this.loadingTx = false;
                const rows = Array.isArray(resp?.data) ? resp.data : [];
                this.paginaActualDataTx = rows;
                const meta = resp?.paginated ?? {};
                const total = Number(meta?.total);
                const lastPage = Number(meta?.lastPage);
                this.totalRegistrosTx = Number.isFinite(total) ? total : rows.length;
                this.totalPaginasTx = Number.isFinite(lastPage)
                    ? lastPage
                    : Math.max(1, Math.ceil(this.totalRegistrosTx / this.pageSizeTx));
                this.pageIndexTx = page;
            },
            error: () => {
                this.loadingTx = false;
                this.paginaActualDataTx = [];
                this.totalRegistrosTx = 0;
                this.totalPaginasTx = 1;
                this.pageIndexTx = 1;
            }
        });
    }
    verMovimiento(mov) {
        console.log('Movimiento:', mov);
        // aquí puedes abrir modal, navegar, etc.
    }
    get paginasTx() {
        const total = this.totalPaginasTx || 1;
        const actual = this.pageIndexTx || 1;
        const inicio = Math.max(1, actual - 2);
        const fin = Math.min(total, inicio + 4);
        const arr = [];
        for (let i = inicio; i <= fin; i++)
            arr.push(i);
        return arr;
    }
    irPaginaTx(page) {
        if (!page || page < 1 || page > this.totalPaginasTx || page === this.pageIndexTx)
            return;
        this.cargarTransaccionesTx(page);
    }
    prevTx() {
        if (this.pageIndexTx > 1)
            this.cargarTransaccionesTx(this.pageIndexTx - 1);
    }
    nextTx() {
        if (this.pageIndexTx < this.totalPaginasTx)
            this.cargarTransaccionesTx(this.pageIndexTx + 1);
    }
    reintentarCargaUsuario() {
        this.obtenerUsuarioOperador();
    }
    setupTransaccionesDataSource() {
        this.loadingTx = true;
        this.listaTransacciones = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSizeTx || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                const body = {
                    page,
                    limit: take,
                    fechaInicio: null,
                    fechaFin: null
                };
                try {
                    const resp = await lastValueFrom(this.tranService.obtenerTransaccionesData(body));
                    this.loadingTx = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated ?? {};
                    const totalRegistros = toNum(meta.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((x, idx) => ({
                        id: x?.id ?? `tx_${page}_${idx}`,
                        tipoTransaccion: x?.tipoTransaccion ?? null,
                        monto: toMoney(x?.monto),
                        latitud: x?.latitud ?? null,
                        longitud: x?.longitud ?? null,
                        fechaHora: x?.fechaHora ?? null,
                        fhRegistro: x?.fhRegistro ?? null,
                        numeroSerieMonedero: x?.numeroSerieMonedero ?? null,
                        numeroSerieDispositivo: x?.numeroSerieDispositivo ?? null
                    }));
                    this.totalRegistrosTx = totalRegistros;
                    this.paginaActualTx = paginaActual;
                    this.totalPaginasTx = totalPaginas;
                    this.paginaActualDataTx = dataTransformada;
                    return { data: dataTransformada, totalCount: totalRegistros };
                }
                catch (error) {
                    this.loadingTx = false;
                    console.error('[TRANSACCIONES] Error:', error);
                    return { data: [], totalCount: 0 };
                }
            }
        });
        function toNum(v) {
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        }
        function toMoney(v) {
            if (v === null || v === undefined)
                return null;
            const s = String(v).replace(',', '.').replace(/[^0-9.-]/g, '');
            const n = Number(s);
            return Number.isFinite(n) ? Number(n.toFixed(2)) : null;
        }
    }
    setupMonederosDataSource() {
        this.loadingMone = true;
        const PAGE_SIZE = this.pageSizeM || 14;
        this.listaMonederos = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = PAGE_SIZE;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.moneService.obtenerMonederosData(page, take));
                    this.loadingMone = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? toNum(resp?.pages) ?? Math.max(1, Math.ceil(totalRegistros / take));
                    const dataTransformada = rows.map((item) => ({
                        ...item,
                        estatusTexto: item?.estatus === 1 ? 'Activo' : item?.estatus === 0 ? 'Inactivo' : null
                    }));
                    const start = skip;
                    const end = skip + take;
                    const pageData = dataTransformada.slice(start, end);
                    this.totalRegistrosM = totalRegistros;
                    this.paginaActualM = paginaActual;
                    this.totalPaginasM = totalPaginas;
                    this.paginaActualDataM = pageData;
                    return { data: pageData, totalCount: totalRegistros };
                }
                catch (err) {
                    this.loadingMone = false;
                    console.error('[MONEDEROS] Error:', err);
                    return { data: [], totalCount: 0 };
                }
            }
        });
        function toNum(v) {
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        }
    }
    onGridOptionChangedTransacciones(e) {
        if (e.fullName !== 'searchPanel.text')
            return;
        this.filtroActivoTx = e.value || '';
        if (!this.filtroActivoTx) {
            e.component.option('dataSource', this.listaTransacciones);
            return;
        }
        const q = this.filtroActivoTx.toLowerCase();
        const dataFiltrada = this.paginaActualDataTx.filter((item) => {
            const fFecha = (item.fhRegistro ? String(item.fhRegistro) : '').toLowerCase();
            const fTipo = (item.tipoTransaccion ? String(item.tipoTransaccion) : '').toLowerCase();
            const fMonto = item.monto != null ? String(item.monto) : '';
            const fNSM = (item.numeroSerieMonedero ? String(item.numeroSerieMonedero) : '').toLowerCase();
            const fNSD = (item.numeroSerieDispositivo ? String(item.numeroSerieDispositivo) : '').toLowerCase();
            return fFecha.includes(q) || fTipo.includes(q) || fMonto.includes(q) || fNSM.includes(q) || fNSD.includes(q);
        });
        e.component.option('dataSource', dataFiltrada);
    }
    onGridOptionChangedMonederos(e) {
        if (e.fullName !== 'searchPanel.text')
            return;
        this.filtroActivoM = e.value || '';
        if (!this.filtroActivoM) {
            e.component.option('dataSource', this.listaMonederos);
            return;
        }
        const q = this.filtroActivoM.toLowerCase();
        const dataFiltrada = this.paginaActualDataM.filter((item) => {
            const ns = (item.numeroSerie || item.ns || '').toString().toLowerCase();
            const alias = (item.alias || '').toString().toLowerCase();
            const est = (item.estatusTexto || '').toString().toLowerCase();
            const saldo = item.saldo != null ? String(item.saldo) : '';
            return ns.includes(q) || alias.includes(q) || est.includes(q) || saldo.includes(q);
        });
        e.component.option('dataSource', dataFiltrada);
    }
    onPageIndexChangedTransacciones(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActualTx = pageIndex + 1;
        e.component.refresh();
    }
    onPageIndexChangedMonederos(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActualM = pageIndex + 1;
        e.component.refresh();
    }
    onExtravio() {
        const correo = this.informacion?.CorreoUsuario || this.showCorreo || '';
        const monederoActual = this.informacion?.Monederos || 'monedero';
        this.alerts.open({
            type: 'warning',
            title: '¡Reporte de Extravío!',
            message: `Se marcará como extraviado tu actual monedero: <strong>${monederoActual}</strong>.`,
            showCancel: true,
            backdropClose: false,
            inputEnabled: true,
            inputLabel: 'Ingresa el número de tu nuevo monedero',
            inputPlaceholder: 'Ingresa el nuevo monedero',
            inputValue: ''
        }).then(result => {
            if (result !== 'confirm')
                return;
            const nuevoMonedero = (this.alerts.getInputValue() || '').trim();
            if (!nuevoMonedero) {
                this.alerts.open({
                    type: 'warning',
                    title: 'Atención',
                    message: 'Debes ingresar el nuevo monedero',
                    backdropClose: false
                });
                return;
            }
            this.moneService.reporteExtravio(correo, nuevoMonedero).subscribe({
                next: (response) => {
                    this.alerts.open({
                        type: 'success',
                        title: '¡Operación Exitosa!',
                        message: response.message,
                        backdropClose: false
                    });
                    this.setupMonederosDataSource();
                    this.obtenerUsuarioOperador();
                },
                error: (error) => {
                    this.alerts.open({
                        type: 'error',
                        title: '¡Ops!',
                        message: error.error,
                        backdropClose: false
                    });
                }
            });
        });
    }
    async abrirModal(raw) {
        const id = raw?.id ?? raw?.Id ?? null;
        // Intentar primero con latitudInicial/longitudInicial, si no existen usar latitudFinal/longitudFinal
        const latInicial = raw?.latitudInicial != null ? raw.latitudInicial : (raw?.LatitudInicial != null ? raw.LatitudInicial : null);
        const lngInicial = raw?.longitudInicial != null ? raw.longitudInicial : (raw?.LongitudInicial != null ? raw.LongitudInicial : null);
        const latFinal = raw?.latitudFinal != null ? raw.latitudFinal : (raw?.LatitudFinal != null ? raw.LatitudFinal : null);
        const lngFinal = raw?.longitudFinal != null ? raw.longitudFinal : (raw?.LongitudFinal != null ? raw.LongitudFinal : null);
        const latStr = (latInicial != null && latInicial !== '') ? String(latInicial) : ((latFinal != null && latFinal !== '') ? String(latFinal) : '');
        const lngStr = (lngInicial != null && lngInicial !== '') ? String(lngInicial) : ((lngFinal != null && lngFinal !== '') ? String(lngFinal) : '');
        const tipoRaw = (raw?.tipoTransaccion ?? raw?.tipo ?? '').toString();
        const tipoUI = tipoRaw === 'RECARGA' ? 'Recarga' : tipoRaw === 'DEBITO' ? 'Débito' : (tipoRaw || null);
        const fechaISO = raw?.fechaHora ?? raw?.FechaHora ?? null;
        const fecha = fechaISO ? new Date(fechaISO) : null;
        const fechaHoraInicioISO = raw?.fechaHoraInicio ?? null;
        const fechaHoraInicio = fechaHoraInicioISO ? new Date(fechaHoraInicioISO) : null;
        const fechaHoraFinalISO = raw?.fechaHoraFinal ?? null;
        const fechaHoraFinal = fechaHoraFinalISO ? new Date(fechaHoraFinalISO) : null;
        const montoNum = typeof raw?.monto === 'number' ? raw.monto
            : (raw?.monto != null ? Number(raw.monto)
                : (typeof raw?.Monto === 'number' ? raw.Monto
                    : Number((raw?.Monto ?? '0').toString().replace(/[^0-9.-]/g, '')) || 0));
        this.selectedTransaccion = { id, fecha, fechaHoraInicio, fechaHoraFinal, tipo: tipoUI, monto: montoNum, lat: latStr, lng: lngStr };
        const latNum = parseFloat(latStr);
        const lngNum = parseFloat(lngStr);
        this.hasCoords =
            Number.isFinite(latNum) &&
                Number.isFinite(lngNum) &&
                !(latNum === 0 && lngNum === 0);
        this.modalOpen = true;
        this.modalAnim = 'in';
        this.modalClosing = false;
        // sólo intenta cargar mapa si hay coordenadas
        if (this.hasCoords) {
            await this.waitForGoogleMaps();
            setTimeout(() => this.initializeMap(latStr, lngStr), 120);
        }
    }
    initializeMap(lat, lng) {
        if (!this.hasCoords)
            return;
        const el = document.getElementById('map');
        if (!el)
            return;
        el.innerHTML = '';
        const position = {
            lat: Number.parseFloat(lat || '0'),
            lng: Number.parseFloat(lng || '0')
        };
        if (!Number.isFinite(position.lat) || !Number.isFinite(position.lng))
            return;
        const options = { center: position, zoom: 15 };
        if (this.MAP_ID)
            options.mapId = this.MAP_ID;
        const map = new google.maps.Map(el, options);
        const Advanced = google.maps?.marker?.AdvancedMarkerElement;
        const canUseAdvanced = Boolean(this.MAP_ID) && Boolean(Advanced);
        if (canUseAdvanced) {
            new Advanced({ map, position, title: `Transacción ${this.selectedTransaccion?.id ?? ''}` });
        }
        else {
            new google.maps.Marker({ map, position, title: `Transacción ${this.selectedTransaccion?.id ?? ''}` });
        }
    }
    cerrarModal() {
        this.modalAnim = 'out';
        setTimeout(() => {
            this.modalOpen = false;
            this.selectedTransaccion = null;
        }, 220);
    }
    cerrarModalPorBackdrop(_event) { this.cerrarModal(); }
    accionPrincipal() { this.cerrarModal(); }
    onBackdrop() { this.closeModal(); }
    closeModal() {
        this.modalClosing = true;
        setTimeout(() => {
            this.modalOpen = false;
            this.modalClosing = false;
        }, 600);
    }
    onBackdropError() { this.closeErrorModal(); }
    closeErrorModal() {
        this.modalErrorClosing = true;
        setTimeout(() => {
            this.modalErrorOpen = false;
            this.modalErrorClosing = false;
        }, 200);
    }
    waitForGoogleMaps() {
        if (window.google?.maps)
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const tick = () => {
                if (window.google?.maps)
                    return resolve();
                if (Date.now() - start > 8000)
                    return reject('Google Maps no cargó');
                requestAnimationFrame(tick);
            };
            tick();
        });
    }
};
PerfilPasajeroComponent = __decorate([
    Component({
        selector: 'vex-perfil-pasajero',
        templateUrl: './perfil-pasajero.component.html',
        styleUrl: './perfil-pasajero.component.scss',
        animations: [fadeInRight400ms],
    })
], PerfilPasajeroComponent);
export { PerfilPasajeroComponent };
//# sourceMappingURL=perfil-pasajero.component.js.map