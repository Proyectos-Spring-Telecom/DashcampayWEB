import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
let ListaZonasComponent = class ListaZonasComponent {
    constructor(zonService, alerts, route) {
        this.zonService = zonService;
        this.alerts = alerts;
        this.route = route;
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
        // Modal y mapa
        this.modalOpen = false;
        this.modalClosing = false;
        this.modalAnim = 'in';
        this.selectedZona = null;
        this.defaultCenter = { lat: 21.110778, lng: -86.762590 };
        this.defaultZoom = 13;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.setupDataSource();
        // this.obtenerListaModulos();
    }
    // hasPermission(permission: string): boolean {-
    //   return this.permissionsService.getPermission(permission) !== undefined;
    // }
    agregarZona() {
        this.route.navigateByUrl('/administracion/zonas/agregar-zona');
    }
    actualizarZona(idZona) {
        this.route.navigateByUrl('/administracion/zonas/editar-zona/' + idZona);
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: '¿Está seguro que requiere activar esta zona?',
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.zonService.updateEstatus(rowData.id, 1).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'La zona ha sido activada.',
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
            message: '¿Está seguro que requiere desactivar esta zona?',
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false,
        });
        if (res !== 'confirm')
            return;
        this.zonService.updateEstatus(rowData.id, 0).subscribe(() => {
            this.alerts.open({
                type: 'success',
                title: '¡Confirmación Realizada!',
                message: 'La zona ha sido desactivada.',
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
        this.listaZonas = new CustomStore({
            key: 'id',
            load: async (loadOptions) => {
                const take = Number(loadOptions?.take) || this.pageSize || 10;
                const skip = Number(loadOptions?.skip) || 0;
                const page = Math.floor(skip / take) + 1;
                try {
                    const resp = await lastValueFrom(this.zonService.obtenerZonasData(page, take));
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
                this.dataGrid.instance.option('dataSource', this.listaZonas);
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
    agregarVehiculo() {
        this.route.navigateByUrl('/administracion/vehiculos/agregar-vehiculo');
    }
    async visualizarZona(rowData) {
        this.selectedZona = rowData;
        this.modalOpen = true;
        this.modalAnim = 'in';
        this.modalClosing = false;
        // Obtener los datos completos de la zona
        this.zonService.obtenerZona(rowData.id).subscribe({
            next: (response) => {
                const data = Array.isArray(response?.data) ? response.data[0] : response?.data;
                if (data) {
                    this.selectedZona = { ...rowData, ...data };
                    setTimeout(() => this.initMapModal(), 100);
                }
            },
            error: (err) => {
                console.error('Error al obtener zona:', err);
                setTimeout(() => this.initMapModal(), 100);
            }
        });
    }
    ngAfterViewInit() {
        // No necesitamos cargar maps aquí, se carga cuando se abre el modal
    }
    ngOnDestroy() {
        if (this.polygon) {
            this.polygon.setMap(null);
        }
        if (this.map) {
            this.map = null;
        }
    }
    cerrarModal() {
        this.modalAnim = 'out';
        this.modalClosing = true;
        setTimeout(() => {
            this.modalOpen = false;
            this.selectedZona = null;
            if (this.polygon) {
                this.polygon.setMap(null);
                this.polygon = undefined;
            }
            if (this.map) {
                this.map = null;
            }
        }, 300);
    }
    onBackdrop() {
        this.cerrarModal();
    }
    async initMapModal() {
        await this.loadGoogleMaps();
        await new Promise(requestAnimationFrame);
        const el = document.getElementById('map-modal');
        if (!el)
            return;
        if (!window.google?.maps?.Map) {
            el.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e9ecef;">
          <div style="text-align:center;">
            <div style="font-size:42px;">⚠️</div>
            <div style="font-weight:600;margin-top:8px;color:#333;">Google Maps no ha cargado</div>
          </div>
        </div>
      `;
            return;
        }
        this.map = new google.maps.Map(el, {
            center: this.defaultCenter,
            zoom: this.defaultZoom,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            clickableIcons: false, styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        // Dibujar polígono si existe geocerca
        const gxAny = this.selectedZona?.geocerca ??
            this.selectedZona?.poligono ??
            this.selectedZona?.polygon ??
            this.selectedZona?.coordenadas ??
            null;
        const path = this.extractPathFromGeo(gxAny);
        if (Array.isArray(path) && path.length >= 3) {
            this.drawPolygonFromPath(path);
            this.fitToPolygon();
        }
        else {
            // Si no hay geocerca, centrar en la ubicación por defecto
            this.map.setCenter(this.defaultCenter);
            this.map.setZoom(this.defaultZoom);
        }
    }
    extractPathFromGeo(gx) {
        if (!gx)
            return [];
        if (gx.type === 'FeatureCollection' &&
            Array.isArray(gx.features) &&
            gx.features.length) {
            const geom = gx.features[0]?.geometry;
            return this.extractPathFromGeo(geom);
        }
        if (gx.type === 'Feature' && gx.geometry) {
            return this.extractPathFromGeo(gx.geometry);
        }
        if (gx.type === 'Polygon' && Array.isArray(gx.coordinates)) {
            const ring = gx.coordinates[0] || [];
            return ring
                .map((p) => Array.isArray(p) && p.length >= 2
                ? { lat: Number(p[1]), lng: Number(p[0]) }
                : null)
                .filter(Boolean);
        }
        if (Array.isArray(gx)) {
            return gx
                .map((p) => ({ lat: Number(p?.lat), lng: Number(p?.lng) }))
                .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
        }
        return [];
    }
    drawPolygonFromPath(path) {
        if (!this.map || !Array.isArray(path) || path.length < 3)
            return;
        if (this.polygon) {
            this.polygon.setMap(null);
            this.polygon = undefined;
        }
        this.polygon = new google.maps.Polygon({
            paths: path,
            fillColor: '#1E88E5',
            fillOpacity: 0.15,
            strokeColor: '#1E88E5',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            editable: false,
            draggable: false,
            map: this.map,
            zIndex: 10,
        });
    }
    fitToPolygon() {
        if (!this.map || !this.polygon)
            return;
        const bounds = new google.maps.LatLngBounds();
        this.polygon.getPath().forEach((ll) => bounds.extend(ll));
        this.map.fitBounds(bounds);
    }
    loadGoogleMaps() {
        if (window.google?.maps?.Map) {
            return Promise.resolve();
        }
        const existing = Array.from(document.getElementsByTagName('script')).find((s) => s.src.includes('maps.googleapis.com/maps/api/js'));
        if (existing) {
            if (window.google?.maps) {
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () => reject(new Error('No se pudo cargar Google Maps')));
            });
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBpLS8xONczrVarb5aZz-mXj1hBMLxhQpU&v=weekly`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('No se pudo cargar Google Maps'));
            document.head.appendChild(script);
        });
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], ListaZonasComponent.prototype, "dataGrid", void 0);
ListaZonasComponent = __decorate([
    Component({
        selector: 'vex-lista-zonas',
        templateUrl: './lista-zonas.component.html',
        styleUrl: './lista-zonas.component.scss',
        animations: [fadeInRight400ms],
    })
], ListaZonasComponent);
export { ListaZonasComponent };
//# sourceMappingURL=lista-zonas.component.js.map