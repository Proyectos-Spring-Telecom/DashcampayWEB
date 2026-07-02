import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaVariantesComponent = class ListaVariantesComponent {
    constructor(variService, zone, route, alerts) {
        this.variService = variService;
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
        // =====================
        // PROPIEDADES necesarias
        // (si ya las tienes, omite duplicarlas)
        // =====================
        this.modalAnim = 'in';
        this.modalOpen = false;
        this.modalClosing = false;
        this.hasCoords = false;
        this.inicioDireccion = null;
        this.finDireccion = null;
        this.MAP_ID = 'DEMO_MAP_ID'; // usa tu mapId si ya tienes uno
        this.selectedDerrotero = null;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
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
    ngOnInit() {
        this.setupDataSource();
    }
    agregarDerrotero() {
        this.route.navigateByUrl('/derroteros/agregar-derrotero');
    }
    onPageIndexChanged(e) {
        const pageIndex = e.component.pageIndex();
        this.paginaActual = pageIndex + 1;
        e.component.refresh();
    }
    setupDataSource() {
        this.loading = true;
        this.listaDerroteros = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.variService.obtenerVariantesData(page, take));
                    this.loading = false;
                    const rows = Array.isArray(resp?.data) ? resp.data : [];
                    const meta = resp?.paginated || {};
                    const totalRegistros = toNum(meta.total) ?? toNum(resp?.total) ?? rows.length;
                    const paginaActual = toNum(meta.page) ?? toNum(resp?.page) ?? page;
                    const totalPaginas = toNum(meta.lastPage) ?? toNum(resp?.pages) ?? Math.max(1, Math.ceil(totalRegistros / take));
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
        if (e.fullName === 'searchPanel.text') {
            this.filtroActivo = e.value || '';
            if (!this.filtroActivo) {
                this.dataGrid.instance.option('dataSource', this.listaDerroteros);
                return;
            }
            const search = this.filtroActivo.toString().toLowerCase();
            const dataFiltrada = this.paginaActualData.filter((item) => {
                const idStr = item.id ? item.id.toString().toLowerCase() : '';
                const nombreStr = item.nombreRuta ? item.nombreRuta.toString().toLowerCase() : '';
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
    async eliminarDerrotero(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Eliminar!',
            message: `¿Está seguro que requiere eliminar la variante: <strong>${rowData.nombreRuta}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.variService.eliminarVariante(rowData.id).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'La variante ha sido eliminada.',
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
    agregarVariante() {
        this.route.navigateByUrl('/administracion/variantes/agregar-variante');
    }
    // =====================
    // MÉTODO PRINCIPAL: abrir modal desde el grid
    // =====================
    async abrirModalVariante(raw) {
        const nombre = (raw?.nombreRuta ?? raw?.nombre ?? raw?.Nombre ?? '').toString();
        // Tu payload: puntoInicio/puntoFin con { direccion?, coordenadas:{lat,lng} } o directamente {lat,lng}
        const inicio = this.readLatLng(raw?.puntoInicio?.coordenadas) ?? this.readLatLng(raw?.puntoInicio);
        const fin = this.readLatLng(raw?.puntoFin?.coordenadas) ?? this.readLatLng(raw?.puntoFin);
        // Recorrido detallado: array de puntos {lat,lng} con nombre opcional
        const recorrido = Array.isArray(raw?.recorridoDetallado)
            ? raw.recorridoDetallado
                .map((p) => {
                const punto = this.readLatLng(p);
                if (!punto)
                    return null;
                // Preservar el nombre si existe
                const nombre = p?.nombre ? String(p.nombre).trim() : undefined;
                return nombre ? { ...punto, nombre } : punto;
            })
                .filter((p) => !!p)
            : [];
        // Estado seleccionado
        this.selectedDerrotero = { nombre, inicio: inicio ?? undefined, fin: fin ?? undefined, recorrido };
        this.hasCoords = Boolean(inicio && fin);
        // Direcciones: usa las que vienen; si no, placeholder para geocoder
        this.inicioDireccion = raw?.puntoInicio?.direccion ?? (this.hasCoords ? 'Obteniendo dirección…' : null);
        this.finDireccion = raw?.puntoFin?.direccion ?? (this.hasCoords ? 'Obteniendo dirección…' : null);
        // Abrir modal
        this.modalOpen = true;
        this.modalAnim = 'in';
        this.modalClosing = false;
        if (this.hasCoords) {
            try {
                await this.waitForGoogleMaps();
                // Pintar mapa
                setTimeout(() => this.initializeMapDerrotero(inicio, fin, recorrido), 120);
                // Si no llegaron direcciones, hacer reverse geocoding (fix Promise<void>[]):
                const needIni = !raw?.puntoInicio?.direccion;
                const needFin = !raw?.puntoFin?.direccion;
                const tasks = [];
                if (needIni) {
                    tasks.push(this.reverseGeocode(inicio.lat, inicio.lng)
                        .then(addr => { this.inicioDireccion = addr; })
                        .catch(() => { this.inicioDireccion = 'Dirección no disponible'; }));
                }
                if (needFin) {
                    tasks.push(this.reverseGeocode(fin.lat, fin.lng)
                        .then(addr => { this.finDireccion = addr; })
                        .catch(() => { this.finDireccion = 'Dirección no disponible'; }));
                }
                if (tasks.length)
                    await Promise.all(tasks);
            }
            catch {
                this.hasCoords = false;
                this.inicioDireccion = null;
                this.finDireccion = null;
            }
        }
    }
    // =====================
    // CERRAR MODAL (unificado, sin duplicados)
    // - si le pasas un modal de Ngb/Material con .close(), lo cierra
    // - si no, cierra tu modal custom
    // =====================
    cerrarModal(modal) {
        if (modal?.close) {
            modal.close('Modal cerrado');
            return;
        }
        this.modalAnim = 'out';
        setTimeout(() => {
            this.modalOpen = false;
            this.selectedDerrotero = null;
        }, 220);
    }
    // alias por si el template llama a closeModal()
    closeModal() { this.cerrarModal(); }
    // backdrop del modal custom
    onBackdrop() { this.cerrarModal(); }
    // botón Confirmar
    accionPrincipal() { this.cerrarModal(); }
    // =====================
    // HELPERS
    // =====================
    readLatLng(obj) {
        if (!obj || typeof obj !== 'object')
            return null;
        const lat = Number(obj.lat);
        const lng = Number(obj.lng);
        return (Number.isFinite(lat) && Number.isFinite(lng)) ? { lat, lng } : null;
    }
    async waitForGoogleMaps() {
        if (window.google?.maps)
            return;
        await new Promise((resolve, reject) => {
            const start = Date.now();
            const tick = () => {
                if (window.google?.maps)
                    return resolve();
                if (Date.now() - start > 8000)
                    return reject(new Error('Google Maps no cargó'));
                requestAnimationFrame(tick);
            };
            tick();
        });
    }
    async reverseGeocode(lat, lng) {
        if (!this.geocoder)
            this.geocoder = new google.maps.Geocoder();
        const { results } = await this.geocoder.geocode({ location: { lat, lng } });
        return results?.[0]?.formatted_address ?? 'Dirección no disponible';
    }
    createFaMarker(iconClass, color, sizePx = 38) {
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
    }
    // =====================
    // MAPA: marcadores + polilínea del recorrido
    // =====================
    initializeMapDerrotero(inicio, fin, recorrido) {
        const el = document.getElementById('map');
        if (!el)
            return;
        el.innerHTML = '';
        const defaultCenter = { lat: 21.110778, lng: -86.762590 };
        const options = { center: defaultCenter, zoom: 14, clickableIcons: false };
        if (this.MAP_ID)
            options.mapId = this.MAP_ID;
        const map = new google.maps.Map(el, options);
        // Ajuste de bounds con inicio, fin y recorrido
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(inicio);
        bounds.extend(fin);
        if (Array.isArray(recorrido)) {
            for (const p of recorrido)
                bounds.extend(p);
        }
        map.fitBounds(bounds);
        const Advanced = google.maps?.marker?.AdvancedMarkerElement;
        const canAdvanced = Boolean(this.MAP_ID) && Advanced;
        const infoWindow = new google.maps.InfoWindow();
        // Marcadores (Font Awesome si Advanced; si no, Marker normal)
        if (canAdvanced) {
            new Advanced({ map, position: inicio, title: 'Inicio', content: this.createFaMarker('fa-solid fa-location-dot', '#16a34a', 38) });
            new Advanced({ map, position: fin, title: 'Fin', content: this.createFaMarker('fa-solid fa-location-dot', '#ef4444', 38) });
        }
        else {
            new google.maps.Marker({ map, position: inicio, title: 'Inicio' });
            new google.maps.Marker({ map, position: fin, title: 'Fin' });
        }
        // Path: usa recorridoDetallado si existe; si no, una línea simple inicio->fin
        const path = (Array.isArray(recorrido) && recorrido.length > 0) ? recorrido : [inicio, fin];
        new google.maps.Polyline({
            map,
            path,
            strokeColor: '#1F5AA8',
            strokeOpacity: 0.95,
            strokeWeight: 4
        });
        // Agregar marcadores discretos para puntos con nombre (estaciones)
        if (Array.isArray(recorrido) && recorrido.length > 0) {
            recorrido.forEach((punto) => {
                if (punto.nombre) {
                    // Crear marcador discreto para estaciones
                    const markerOptions = {
                        map,
                        position: { lat: punto.lat, lng: punto.lng },
                        title: punto.nombre,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: '#1F5AA8',
                            fillOpacity: 0.8,
                            strokeColor: '#ffffff',
                            strokeWeight: 2,
                            scale: 8
                        },
                        zIndex: google.maps.Marker.MAX_ZINDEX + 1
                    };
                    const marker = new google.maps.Marker(markerOptions);
                    // Agregar InfoWindow con el nombre de la estación
                    marker.addListener('click', () => {
                        infoWindow.setContent(`
            <div style="padding: 8px; font-weight: 500; color: #1F5AA8;">
              <i class="fa fa-map-marker-alt" style="margin-right: 6px;"></i>
              ${punto.nombre}
            </div>
          `);
                        infoWindow.open(map, marker);
                    });
                }
            });
        }
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaVariantesComponent.prototype, "dataGrid", void 0);
ListaVariantesComponent = __decorate([
    Component({
        selector: 'vex-lista-variantes',
        templateUrl: './lista-variantes.component.html',
        styleUrl: './lista-variantes.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaVariantesComponent);
export { ListaVariantesComponent };
//# sourceMappingURL=lista-variantes.component.js.map