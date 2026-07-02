import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let AgregarRutaComponent = class AgregarRutaComponent {
    constructor(alerts, fb, zonService, rutService, ngZone, route) {
        this.alerts = alerts;
        this.fb = fb;
        this.zonService = zonService;
        this.rutService = rutService;
        this.ngZone = ngZone;
        this.route = route;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.title = 'Agregar Ruta';
        this.submitButton = 'Guardar';
        this.loading = false;
        this.puntosCompletos = false;
        this.routeName = '';
        this.nombreInicio = null;
        this.nombreFin = null;
        this.nombreClienteSeleccionado = null;
        /**
         * Zona elegida en el select (sincronizada en Angular). El listener del mapa corre fuera de NgZone;
         * leer solo el FormControl ahí puede fallar; este valor es la fuente de verdad para clics.
         */
        this.idZonaSeleccionada = null;
        this.mapInitialized = false;
        /** Zona seleccionada pendiente si el mapa aún no cargó */
        this.zonaPendienteId = null;
        /** Evita aplicar geocerca obsoleta si el usuario cambia de zona rápido */
        this.geocercaFetchSeq = 0;
        this.centroPolanco = { lat: 21.110778, lng: -86.762590 };
    }
    ngOnInit() {
        this.rutaForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.maxLength(200)]],
            idRegion: [null, Validators.required],
            estatus: [1, Validators.required],
        });
        this.obtenerRegiones();
        this.loadGoogleMaps().then(() => this.initMap()).catch(err => console.error('Error cargando Google Maps:', err));
        // Suscribirse a cambios en idRegion: cliente + geocerca en mapa
        this.rutaForm.get('idRegion')?.valueChanges.subscribe((idRegion) => {
            this.idZonaSeleccionada =
                idRegion === null || idRegion === undefined || idRegion === ''
                    ? null
                    : Number(idRegion);
            if (idRegion != null && idRegion !== '' && this.listaRegiones?.length) {
                const zonaSeleccionada = this.listaRegiones.find((z) => Number(z?.id) === Number(idRegion));
                this.nombreClienteSeleccionado = zonaSeleccionada?.nombreCliente || null;
            }
            else {
                this.nombreClienteSeleccionado = null;
            }
            this.aplicarGeocercaZona(idRegion === null || idRegion === undefined || idRegion === ''
                ? null
                : Number(idRegion));
        });
    }
    ngOnDestroy() {
        try {
            this.mapClickListener?.remove();
        }
        catch { }
        try {
            this.resizeObserver?.disconnect();
        }
        catch { }
        try {
            this.zonaPolygon?.setMap(null);
        }
        catch { }
        this.zonaPolygon = undefined;
    }
    obtenerRegiones() {
        this.zonService.obtenerZonas().subscribe((response) => {
            this.listaRegiones = response?.data ?? [];
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/rutas');
    }
    loadGoogleMaps() {
        return new Promise((resolve, reject) => {
            const finish = async () => {
                try {
                    if (typeof google !== 'undefined' && google.maps?.importLibrary) {
                        await google.maps.importLibrary('geometry');
                    }
                }
                catch (e) {
                    console.warn('[AgregarRuta] Librería geometry de Maps:', e);
                }
                resolve();
            };
            if (typeof google !== 'undefined' && google.maps?.geometry?.poly?.containsLocation) {
                resolve();
                return;
            }
            if (typeof google !== 'undefined' && google.maps?.Map) {
                void finish();
                return;
            }
            const existing = document.getElementById('gmaps-sdk');
            if (existing) {
                const onLoad = () => void finish();
                if (window.google?.maps?.Map) {
                    void finish();
                }
                else {
                    existing.addEventListener('load', onLoad, { once: true });
                }
                existing.addEventListener('error', (e) => reject(e));
                return;
            }
            const script = document.createElement('script');
            script.id = 'gmaps-sdk';
            script.async = true;
            script.defer = true;
            script.src =
                'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=quarterly&libraries=places,geometry';
            script.onload = () => void finish();
            script.onerror = (e) => reject(e);
            document.head.appendChild(script);
        });
    }
    initMap() {
        this.ngZone.runOutsideAngular(() => {
            const el = document.getElementById('map');
            if (!el) {
                console.error('Contenedor #map no encontrado.');
                return;
            }
            this.map = new google.maps.Map(el, {
                center: this.centroPolanco,
                zoom: 13,
                mapTypeControl: false,
                fullscreenControl: true,
                streetViewControl: false,
                clickableIcons: false,
                // Menos zoom accidental al hacer clic/rueda; pan con arrastre sigue disponible
                gestureHandling: 'cooperative',
                disableDoubleClickZoom: true,
                scrollwheel: false,
                styles: [
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
            this.geocoder = new google.maps.Geocoder();
            this.resizeObserver = new ResizeObserver(() => {
                google.maps.event.trigger(this.map, 'resize');
            });
            this.resizeObserver.observe(el);
            this.mapClickListener = this.map.addListener('click', (ev) => {
                if (!ev.latLng)
                    return;
                const pos = ev.latLng;
                // Ejecutar en NgZone: el FormControl y props del componente se actualizan en Angular.
                this.ngZone.run(() => {
                    const idForm = this.rutaForm.get('idRegion')?.value;
                    const idZona = this.idZonaSeleccionada ??
                        (idForm === null || idForm === undefined || idForm === '' ? null : Number(idForm));
                    const tieneZona = idZona !== null &&
                        idZona !== undefined &&
                        !Number.isNaN(Number(idZona));
                    if (!tieneZona) {
                        void this.alerts.open({
                            type: 'warning',
                            title: 'Zona requerida',
                            message: 'Selecciona primero una zona. Luego podrás marcar inicio y fin en el mapa (idealmente dentro del área azul).',
                            confirmText: 'Aceptar',
                            backdropClose: false,
                        });
                        return;
                    }
                    // Geocerca es guía visual; no bloqueamos el clic (containsLocation / ray-cast fallan en varios polígonos reales).
                    if (this.zonaPolygon &&
                        !this.isLatLngAceptadaEnZona(pos, this.zonaPolygon)) {
                        console.warn('[AgregarRuta] Clic fuera del polígono dibujado; se coloca el marcador igualmente.');
                    }
                    const literal = { lat: pos.lat(), lng: pos.lng() };
                    if (!this.inicioMarker) {
                        this.inicioMarker = new google.maps.Marker({
                            position: pos,
                            map: this.map,
                            title: 'Inicio',
                            icon: {
                                url: this.svgPinUrl('#16a34a'),
                                scaledSize: new google.maps.Size(40, 40),
                                anchor: new google.maps.Point(20, 38)
                            }
                        });
                        this.inicio = literal;
                        this.reverseGeocode(literal).then(txt => this.ngZone.run(() => (this.nombreInicio = txt)));
                        // No panTo aquí: evita que el mapa “salte” o parezca zoom al primer clic
                    }
                    else if (!this.finMarker) {
                        this.finMarker = new google.maps.Marker({
                            position: pos,
                            map: this.map,
                            title: 'Fin',
                            icon: {
                                url: this.svgPinUrl('#ef4444'),
                                scaledSize: new google.maps.Size(40, 40),
                                anchor: new google.maps.Point(20, 38)
                            }
                        });
                        this.fin = literal;
                        this.reverseGeocode(literal).then(txt => this.ngZone.run(() => (this.nombreFin = txt)));
                        this.fitBoundsIfBoth();
                    }
                    else {
                        const dInicio = this.distanceMeters(this.inicioMarker.getPosition(), pos);
                        const dFin = this.distanceMeters(this.finMarker.getPosition(), pos);
                        if (dInicio <= dFin) {
                            this.inicioMarker.setPosition(pos);
                            this.inicio = literal;
                            this.reverseGeocode(literal).then(txt => this.ngZone.run(() => (this.nombreInicio = txt)));
                        }
                        else {
                            this.finMarker.setPosition(pos);
                            this.fin = literal;
                            this.reverseGeocode(literal).then(txt => this.ngZone.run(() => (this.nombreFin = txt)));
                        }
                        this.fitBoundsIfBoth();
                    }
                    const completos = !!this.inicioMarker && !!this.finMarker;
                    if (completos !== this.puntosCompletos) {
                        this.puntosCompletos = completos;
                    }
                });
            });
            this.mapInitialized = true;
            const idZona = this.zonaPendienteId ?? this.rutaForm.get('idRegion')?.value ?? null;
            this.zonaPendienteId = null;
            if (idZona != null) {
                this.aplicarGeocercaZona(idZona);
            }
        });
    }
    /**
     * Quita el polígono de la zona del mapa.
     */
    clearZonaPolygon() {
        if (this.zonaPolygon) {
            this.zonaPolygon.setMap(null);
            this.zonaPolygon = undefined;
        }
    }
    /**
     * Igual que en zonas: FeatureCollection / Polygon / array {lat,lng}
     */
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
    drawZonaPolygon(path) {
        if (!this.map || !Array.isArray(path) || path.length < 3)
            return;
        this.clearZonaPolygon();
        this.zonaPolygon = new google.maps.Polygon({
            paths: path,
            fillColor: '#1E88E5',
            fillOpacity: 0.15,
            strokeColor: '#1E88E5',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            editable: false,
            draggable: false,
            // Sin esto, el polígono roba el clic: solo funciona fuera del área y muestra mano/zoom raro.
            clickable: false,
            map: this.map,
            zIndex: 1,
        });
    }
    fitMapToZona(path) {
        if (!this.map || !path.length)
            return;
        const bounds = new google.maps.LatLngBounds();
        path.forEach((p) => bounds.extend(p));
        this.map.fitBounds(bounds);
        google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
            const z = this.map.getZoom();
            if (z != null && z > 16) {
                this.map.setZoom(16);
            }
        });
    }
    /**
     * Al elegir zona: dibuja geocerca y acerca el mapa para trazar inicio/fin dentro.
     */
    aplicarGeocercaZona(idRegion) {
        this.clearZonaPolygon();
        this.ngZone.run(() => this.limpiarPuntos());
        if (!idRegion) {
            if (this.mapInitialized && this.map) {
                this.map.setCenter(this.centroPolanco);
                this.map.setZoom(13);
            }
            return;
        }
        if (!this.mapInitialized || !this.map) {
            this.zonaPendienteId = idRegion;
            return;
        }
        const seq = ++this.geocercaFetchSeq;
        const zonaList = this.listaRegiones?.find((z) => Number(z?.id) === Number(idRegion));
        const gxLista = zonaList?.geocerca ??
            zonaList?.poligono ??
            zonaList?.polygon ??
            zonaList?.coordenadas ??
            null;
        let path = this.extractPathFromGeo(gxLista);
        if (path.length >= 3) {
            this.drawZonaPolygon(path);
            this.fitMapToZona(path);
            return;
        }
        this.zonService.obtenerZona(Number(idRegion)).subscribe({
            next: (response) => {
                if (seq !== this.geocercaFetchSeq)
                    return;
                if (Number(this.rutaForm.get('idRegion')?.value) !== Number(idRegion))
                    return;
                const data = Array.isArray(response?.data) ? response.data[0] : response?.data;
                const gx = data?.geocerca ??
                    data?.poligono ??
                    data?.polygon ??
                    data?.coordenadas ??
                    null;
                path = this.extractPathFromGeo(gx);
                if (path.length >= 3) {
                    this.drawZonaPolygon(path);
                    this.fitMapToZona(path);
                }
                else {
                    console.warn('[AgregarRuta] La zona no tiene geocerca válida.');
                    this.map.setCenter(this.centroPolanco);
                    this.map.setZoom(13);
                }
            },
            error: (err) => {
                console.error('[AgregarRuta] Error al obtener zona para geocerca:', err);
            },
        });
    }
    reverseGeocode(latlng) {
        return new Promise((resolve) => {
            if (!this.geocoder) {
                resolve(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
                return;
            }
            this.geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results?.length)
                    resolve(results[0].formatted_address);
                else
                    resolve(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
            });
        });
    }
    fitBoundsIfBoth() {
        if (!this.inicio || !this.fin)
            return;
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(this.inicio);
        bounds.extend(this.fin);
        this.map.fitBounds(bounds);
    }
    distanceMeters(a, b) {
        const toRad = (v) => (v * Math.PI) / 180;
        const R = 6371000;
        const dLat = toRad(b.lat() - a.lat());
        const dLng = toRad(b.lng() - a.lng());
        const lat1 = toRad(a.lat());
        const lat2 = toRad(b.lat());
        const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
        return R * c;
    }
    /**
     * Comprueba si el clic cae dentro de la geocerca. No depende solo de `containsLocation`
     * (en algunos polígonos devuelve false estando el punto dentro).
     */
    isLatLngAceptadaEnZona(latLng, polygon) {
        try {
            if (google.maps.geometry?.poly?.containsLocation?.(latLng, polygon)) {
                return true;
            }
            if (google.maps.geometry?.poly?.isLocationOnEdge?.(latLng, polygon, 0.0002)) {
                return true;
            }
        }
        catch {
            /* continuar con ray casting */
        }
        const path = polygon.getPath();
        const n = path.getLength();
        if (n < 3)
            return false;
        const x = latLng.lng();
        const y = latLng.lat();
        let inside = false;
        for (let i = 0, j = n - 1; i < n; j = i++) {
            const yi = path.getAt(i).lat();
            const yj = path.getAt(j).lat();
            if ((yi > y) !== (yj > y)) {
                const xi = path.getAt(i).lng();
                const xj = path.getAt(j).lng();
                const xInt = ((xj - xi) * (y - yi)) / (yj - yi || 1e-14) + xi;
                if (x < xInt)
                    inside = !inside;
            }
        }
        if (inside)
            return true;
        const maxDistM = 60;
        for (let i = 0, j = n - 1; i < n; j = i++) {
            const d = this.distanceMetersPointToSegment(latLng, path.getAt(j), path.getAt(i));
            if (d <= maxDistM)
                return true;
        }
        return false;
    }
    /** Distancia mínima del punto al segmento AB (metros), aproximación local. */
    distanceMetersPointToSegment(p, a, b) {
        const R = 6371000;
        const cos0 = Math.cos((p.lat() * Math.PI) / 180);
        const toM = (ll) => ({
            x: R * ((ll.lng() - p.lng()) * Math.PI / 180) * cos0,
            y: R * ((ll.lat() - p.lat()) * Math.PI / 180),
        });
        const A = toM(a);
        const B = toM(b);
        const vx = B.x - A.x;
        const vy = B.y - A.y;
        const len2 = vx * vx + vy * vy;
        if (len2 < 1e-6) {
            return this.distanceMeters(a, p);
        }
        let t = (-A.x * vx - A.y * vy) / len2;
        t = Math.max(0, Math.min(1, t));
        const qx = A.x + t * vx;
        const qy = A.y + t * vy;
        return Math.sqrt(qx * qx + qy * qy);
    }
    limpiarPuntos() {
        this.inicioMarker?.setMap(null);
        this.finMarker?.setMap(null);
        this.inicioMarker = undefined;
        this.finMarker = undefined;
        this.inicio = undefined;
        this.fin = undefined;
        this.nombreInicio = null;
        this.nombreFin = null;
        this.puntosCompletos = false;
    }
    getCoordenadasInicioFin() {
        if (!this.inicio || !this.fin)
            return null;
        return { inicio: this.inicio, fin: this.fin };
    }
    async finalizarTrayecto() {
        if (!this.puedeGuardar)
            return;
        // Abrir modal preguntando si desea registrar una ruta de regreso
        const respuesta = await this.alerts.open({
            type: 'warning',
            title: 'Ruta de Regreso',
            message: '¿Desea registrar una ruta de regreso para esta ruta?',
            showCancel: true,
            confirmText: 'Sí',
            cancelText: 'No',
            backdropClose: false,
        });
        const registraRegreso = respuesta === 'confirm';
        const payload = {
            nombre: (this.rutaForm.get('nombre')?.value || '').toString().trim(),
            puntoInicio: this.inicio ? { lat: this.inicio.lat, lng: this.inicio.lng } : null,
            nombreInicio: this.nombreInicio || null,
            puntoFin: this.fin ? { lat: this.fin.lat, lng: this.fin.lng } : null,
            nombreFin: this.nombreFin || null,
            estatus: 1,
            idZona: this.rutaForm.get('idRegion')?.value ?? null,
            idZonaFin: null,
            registraRegreso: registraRegreso
        };
        this.agregar(payload);
    }
    svgPinUrl(color) {
        const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill="${color}"/>
      <circle cx="12" cy="9" r="3" fill="#ffffff"/>
    </svg>`;
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }
    limpiarProceso() {
        this.limpiarPuntos();
        this.clearZonaPolygon();
        this.zonaPendienteId = null;
        this.rutaForm.patchValue({ nombre: '', idRegion: null, estatus: 1 });
        this.rutaForm.markAsPristine();
        this.rutaForm.markAsUntouched();
        if (this.mapInitialized && this.map) {
            this.map.setCenter(this.centroPolanco);
            this.map.setZoom(13);
        }
    }
    get puedeGuardar() {
        return this.rutaForm.valid && !!this.inicio && !!this.fin;
    }
    agregar(payload) {
        this.submitButton = 'Cargando...';
        this.loading = true;
        this.rutService.agregarRuta(payload).subscribe({
            next: () => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se agregó una nueva ruta de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
                this.regresar();
            },
            error: () => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrió un error al agregar la ruta.',
                    confirmText: 'Confirmar',
                    backdropClose: false,
                });
            }
        });
    }
};
AgregarRutaComponent = __decorate([
    Component({
        selector: 'vex-agregar-ruta',
        templateUrl: './agregar-ruta.component.html',
        styleUrl: './agregar-ruta.component.scss',
        animations: [fadeInRight400ms],
    })
], AgregarRutaComponent);
export { AgregarRutaComponent };
//# sourceMappingURL=agregar-ruta.component.js.map