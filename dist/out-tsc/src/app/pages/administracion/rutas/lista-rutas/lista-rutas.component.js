import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaRutasComponent = class ListaRutasComponent {
    constructor(rutaSe, zone, route, alerts) {
        this.rutaSe = rutaSe;
        this.zone = zone;
        this.route = route;
        this.alerts = alerts;
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
        this.paginaActualData = [];
        this.filtroActivo = '';
        this.isGrouped = false;
        this.modalAnim = 'in';
        this.modalOpen = false;
        this.modalClosing = false;
        this.modalErrorOpen = false;
        this.modalErrorClosing = false;
        this.selectedTransaccion = null;
        this.MAP_ID = 'DEMO_MAP_ID';
        this.hasCoords = false;
        this.selectedTransactionId = null;
        this.selectedRutaNombre = null;
        this.selectedNombreInicio = null;
        this.selectedNombreFinal = null;
        this.showMap = false;
        this.markerIconInicio = {
            url: new URL('assets/images/markerGreen.png', document.baseURI).toString(),
            scaledSize: new google.maps.Size(42, 42),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(21, 42),
        };
        this.markerIconFin = {
            url: new URL('assets/images/markerRed.png', document.baseURI).toString(),
            scaledSize: new google.maps.Size(42, 42),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(21, 42),
        };
        this.inicioDireccion = null;
        this.finDireccion = null;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
    }
    // hasPermission(permission: string): boolean {
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
    agregarRuta() {
        this.route.navigateByUrl('/administracion/rutas/agregar-ruta');
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    setupDataSource() {
        this.loading = true;
        this.listaRutas = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.rutaSe.obtenerRutasData(page, take));
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
        if (e.fullName === "searchPanel.text") {
            this.filtroActivo = e.value || '';
            if (!this.filtroActivo) {
                this.dataGrid.instance.option('dataSource', this.listaRutas);
                return;
            }
            const search = this.filtroActivo.toString().toLowerCase();
            const dataFiltrada = this.paginaActualData.filter((item) => {
                const idStr = item.id ? item.id.toString().toLowerCase() : '';
                const nombreStr = item.nombre ? item.nombre.toString().toLowerCase() : '';
                const descripcionStr = item.descripcion ? item.descripcion.toString().toLowerCase() : '';
                const moduloStr = item.estatusTexto ? item.estatusTexto.toString().toLowerCase() : '';
                return (nombreStr.includes(search) ||
                    descripcionStr.includes(search) ||
                    moduloStr.includes(search) ||
                    idStr.includes(search));
            });
            this.dataGrid.instance.option('dataSource', dataFiltrada);
        }
    }
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }
    verRuta(idRutaEspecifica) {
        this.route.navigateByUrl('/rutas/ver-ruta/' + idRutaEspecifica);
    }
    ;
    alCambiarOpcion(e) {
        if (e.name === 'paging' && e.fullName === 'paging.pageIndex') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    getCoords(geojson) {
        const c = geojson?.features?.[0]?.geometry?.coordinates;
        if (Array.isArray(c) && c.length >= 2) {
            const lng = Number(c[0]);
            const lat = Number(c[1]);
            if (!isNaN(lat) && !isNaN(lng))
                return { lat, lng };
        }
        return { lat: null, lng: null };
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar la ruta: <br> <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.rutaSe.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'La ruta ha sido activada.',
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
            message: `¿Está seguro que requiere desactivar la ruta: <br> <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.rutaSe.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'La ruta ha sido desactivada.',
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
    async eliminarRuta(ruta) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Eliminar Ruta!',
            message: `¿Está seguro que requiere eliminar la ruta: <br> <strong>${ruta.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.rutaSe.eliminarRuta(ruta.id).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Eliminado!',
                message: 'La ruta ha sido eliminada de forma exitosa.',
                confirmText: 'Confirmar',
                backdropClose: false,
            });
            this.setupDataSource();
        }, () => {
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: 'Error al intentar eliminar la ruta.',
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
    onBackdropError() { this.closeErrorModal(); }
    closeErrorModal() {
        this.modalErrorClosing = true;
        setTimeout(() => {
            this.modalErrorOpen = false;
            this.modalErrorClosing = false;
        }, 200);
    }
    onBackdrop() { this.closeModal(); }
    closeModal() {
        this.modalClosing = true;
        setTimeout(() => {
            this.modalOpen = false;
            this.modalClosing = false;
        }, 600);
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
    async abrirModal(raw) {
        const nombre = (raw?.nombre ?? raw?.Nombre ?? '').toString();
        const inicio = this.readLatLng(raw?.puntoInicio);
        const fin = this.readLatLng(raw?.puntoFin);
        this.selectedRuta = { nombre, inicio: inicio ?? undefined, fin: fin ?? undefined };
        this.hasCoords = Boolean(inicio && fin);
        this.inicioDireccion = this.hasCoords ? 'Obteniendo dirección…' : null;
        this.finDireccion = this.hasCoords ? 'Obteniendo dirección…' : null;
        this.modalOpen = true;
        this.modalAnim = 'in';
        this.modalClosing = false;
        if (this.hasCoords) {
            try {
                await this.waitForGoogleMaps();
                setTimeout(() => this.initializeMapRuta(inicio, fin), 120);
                const [dirIni, dirFin] = await Promise.all([
                    this.reverseGeocode(inicio.lat, inicio.lng).catch(() => 'Dirección no disponible'),
                    this.reverseGeocode(fin.lat, fin.lng).catch(() => 'Dirección no disponible')
                ]);
                this.inicioDireccion = dirIni;
                this.finDireccion = dirFin;
            }
            catch {
                this.hasCoords = false;
                this.inicioDireccion = null;
                this.finDireccion = null;
            }
        }
    }
    readLatLng(obj) {
        if (!obj || typeof obj !== 'object')
            return null;
        const lat = Number(obj.lat);
        const lng = Number(obj.lng);
        if (Number.isFinite(lat) && Number.isFinite(lng))
            return { lat, lng };
        return null;
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
    initializeMapRuta(inicio, fin) {
        const el = document.getElementById('map');
        if (!el)
            return;
        el.innerHTML = '';
        const defaultCenter = { lat: 21.110778, lng: -86.762590 };
        const options = { center: defaultCenter, zoom: 14, clickableIcons: false };
        if (this.MAP_ID)
            options.mapId = this.MAP_ID;
        const map = new google.maps.Map(el, options);
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(inicio);
        bounds.extend(fin);
        map.fitBounds(bounds);
        const Advanced = google.maps?.marker?.AdvancedMarkerElement;
        const Pin = google.maps?.marker?.PinElement;
        const canAdvanced = Boolean(this.MAP_ID) && Advanced && Pin;
        // ======= NUEVO: preferir AdvancedMarker con Font Awesome =======
        const canAdvancedFa = Boolean(this.MAP_ID) && Advanced; // no requiere PinElement
        if (canAdvancedFa) {
            // helper local para crear el icono FA
            const createFaMarker = (iconClass, color, sizePx = 38) => {
                const wrap = document.createElement('div');
                wrap.style.display = 'flex';
                wrap.style.alignItems = 'center';
                wrap.style.justifyContent = 'center';
                wrap.style.transform = 'translateY(-6px)';
                const i = document.createElement('i');
                i.className = iconClass; // 'fa-solid fa-location-dot'
                i.style.fontSize = `${sizePx}px`;
                i.style.color = color;
                i.style.filter = 'drop-shadow(0 1px 2px rgba(0,0,0,.35))';
                wrap.appendChild(i);
                return wrap;
            };
            const inicioEl = createFaMarker('fa-solid fa-location-dot', '#16a34a', 38);
            const finEl = createFaMarker('fa-solid fa-location-dot', '#ef4444', 38);
            new Advanced({ map, position: inicio, title: 'Inicio', content: inicioEl });
            new Advanced({ map, position: fin, title: 'Fin', content: finEl });
            return; // usamos FA; no seguimos a los otros caminos
        }
        // ======= FIN NUEVO =======
        if (canAdvanced) {
            // SIN línea: borderColor = background
            const pinInicio = new Pin({
                background: '#16a34a',
                borderColor: '#16a34a',
                glyph: this.makeWhiteDot()
            });
            const pinFin = new Pin({
                background: '#ef4444',
                borderColor: '#ef4444',
                glyph: this.makeWhiteDot()
            });
            new Advanced({ map, position: inicio, title: 'Inicio', content: pinInicio.element });
            new Advanced({ map, position: fin, title: 'Fin', content: pinFin.element });
        }
        else {
            const svgPinUrl = (color) => {
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
           <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill="${color}"/>
           <circle cx="12" cy="9" r="3" fill="#ffffff"/>
         </svg>`;
                return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
            };
            new google.maps.Marker({
                map,
                position: inicio,
                title: 'Inicio',
                icon: {
                    url: svgPinUrl('#16a34a'),
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 38)
                }
            });
            new google.maps.Marker({
                map,
                position: fin,
                title: 'Fin',
                icon: {
                    url: svgPinUrl('#ef4444'),
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 38)
                }
            });
        }
    }
    makeWhiteDot() {
        const el = document.createElement('div');
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.borderRadius = '9999px';
        el.style.background = '#fff';
        el.style.boxShadow = 'none';
        return el;
    }
    initializeMapTransaccion(lat, lng) {
        const el = document.getElementById('map');
        if (!el)
            return;
        el.innerHTML = '';
        const position = { lat, lng };
        const options = { center: position, zoom: 15, clickableIcons: false };
        if (this.MAP_ID)
            options.mapId = this.MAP_ID;
        const map = new google.maps.Map(el, options);
        this.putDotMarker(map, position, { title: `Transacción ${this.selectedTransaccion?.id ?? ''}`, color: '#3b82f6' });
    }
    putDotMarker(map, position, opts) {
        const Advanced = google.maps?.marker?.AdvancedMarkerElement;
        const Pin = google.maps?.marker?.PinElement;
        const canAdvanced = Boolean(this.MAP_ID) && Advanced && Pin;
        if (canAdvanced) {
            const dot = document.createElement('div');
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '9999px';
            dot.style.background = '#fff';
            dot.style.boxShadow = '0 0 0 2px rgba(255,255,255,.5)';
            const pin = new Pin({
                background: opts.color,
                borderColor: this.darken(opts.color, 0.3),
                glyph: dot
            });
            new Advanced({
                map,
                position,
                title: opts.title ?? '',
                content: pin.element
            });
            return;
        }
        const icon = {
            url: this.svgPinUrl(opts.color),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 38)
        };
        new google.maps.Marker({
            map,
            position,
            title: opts.title ?? '',
            icon
        });
    }
    svgPinUrl(color) {
        const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill="${color}"/>
      <circle cx="12" cy="9" r="3" fill="#ffffff"/>
    </svg>`;
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    darken(hex, amount) {
        const n = (x) => parseInt(x, 16);
        const r = Math.max(0, Math.min(255, Math.floor(n(hex.slice(1, 3)) * (1 - amount))));
        const g = Math.max(0, Math.min(255, Math.floor(n(hex.slice(3, 5)) * (1 - amount))));
        const b = Math.max(0, Math.min(255, Math.floor(n(hex.slice(5, 7)) * (1 - amount))));
        const toHex = (v) => v.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    createFaMarker(iconClass, color, sizePx = 36) {
        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'center';
        wrap.style.justifyContent = 'center';
        wrap.style.transform = 'translateY(-6px)';
        const i = document.createElement('i');
        i.className = iconClass;
        i.style.fontSize = `${sizePx}px`;
        i.style.color = color;
        i.style.filter = 'drop-shadow(0 1px 2px rgba(0,0,0,.35))';
        wrap.appendChild(i);
        return wrap;
    }
    async reverseGeocode(lat, lng) {
        if (!this.geocoder)
            this.geocoder = new google.maps.Geocoder();
        const { results } = await this.geocoder.geocode({ location: { lat, lng } });
        return results?.[0]?.formatted_address ?? 'Dirección no disponible';
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaRutasComponent.prototype, "dataGrid", void 0);
ListaRutasComponent = __decorate([
    Component({
        selector: 'vex-lista-rutas',
        templateUrl: './lista-rutas.component.html',
        styleUrl: './lista-rutas.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaRutasComponent);
export { ListaRutasComponent };
//# sourceMappingURL=lista-rutas.component.js.map