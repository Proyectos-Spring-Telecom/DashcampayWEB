import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { RutasService } from 'src/app/pages/services/ruta.service';
import { ZonasService } from 'src/app/pages/services/zonas.service';

declare const google: any;

@Component({
  selector: 'vex-agregar-ruta',
  templateUrl: './agregar-ruta.component.html',
  styleUrl: './agregar-ruta.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarRutaComponent implements OnInit, OnDestroy {
  layoutCtrl = new UntypedFormControl('fullwidth');
  title = 'Agregar Ruta';
  rutaForm!: FormGroup;
  listaRegiones: any;
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  puntosCompletos = false;

  routeName: string = '';
  inicio?: google.maps.LatLngLiteral;
  fin?: google.maps.LatLngLiteral;
  nombreInicio: string | null = null;
  nombreFin: string | null = null;

  private map!: google.maps.Map;
  private inicioMarker?: google.maps.Marker;
  private finMarker?: google.maps.Marker;
  private mapClickListener?: google.maps.MapsEventListener;
  private resizeObserver?: ResizeObserver;
  private geocoder?: google.maps.Geocoder;

  private readonly centroPolanco: google.maps.LatLngLiteral = { lat: 19.4336, lng: -99.1967 };

  constructor(
    private alerts: AlertsService,
    private fb: FormBuilder,
    private zonService: ZonasService,
    private rutService: RutasService,
    private ngZone: NgZone,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.rutaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      idRegion: [null, Validators.required],
      estatus: [1, Validators.required],
    });
    this.obtenerRegiones();
    this.loadGoogleMaps().then(() => this.initMap()).catch(err => console.error('Error cargando Google Maps:', err));
  }

  ngOnDestroy(): void {
    try { this.mapClickListener?.remove(); } catch { }
    try { this.resizeObserver?.disconnect(); } catch { }
  }

  obtenerRegiones(): void {
    this.zonService.obtenerZonas().subscribe((response) => {
      this.listaRegiones = response?.data ?? [];
    });
  }

  regresar() {
    this.route.navigateByUrl('/administracion/rutas');
  }

  private loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google?.maps) { resolve(); return; }
      const existing = document.getElementById('gmaps-sdk') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }
      const script = document.createElement('script');
      script.id = 'gmaps-sdk';
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=quarterly&libraries=places';
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  private initMap(): void {
    this.ngZone.runOutsideAngular(() => {
      const el = document.getElementById('map');
      if (!el) { console.error('Contenedor #map no encontrado.'); return; }

      this.map = new google.maps.Map(el, {
        center: this.centroPolanco,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        clickableIcons: true,
        gestureHandling: 'greedy',
      });

      this.geocoder = new google.maps.Geocoder();

      this.resizeObserver = new ResizeObserver(() => {
        google.maps.event.trigger(this.map, 'resize');
      });
      this.resizeObserver.observe(el);

      this.mapClickListener = this.map.addListener('click', (ev: google.maps.MapMouseEvent) => {
        if (!ev.latLng) return;
        const pos = ev.latLng;
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
          this.reverseGeocode(literal).then(txt => this.ngZone.run(() => this.nombreInicio = txt));
          this.map.panTo(pos);
        } else if (!this.finMarker) {
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
          this.reverseGeocode(literal).then(txt => this.ngZone.run(() => this.nombreFin = txt));
          this.fitBoundsIfBoth();
        } else {
          const dInicio = this.distanceMeters(this.inicioMarker.getPosition()!, pos);
          const dFin = this.distanceMeters(this.finMarker.getPosition()!, pos);
          if (dInicio <= dFin) {
            this.inicioMarker.setPosition(pos);
            this.inicio = literal;
            this.reverseGeocode(literal).then(txt => this.ngZone.run(() => this.nombreInicio = txt));
          } else {
            this.finMarker.setPosition(pos);
            this.fin = literal;
            this.reverseGeocode(literal).then(txt => this.ngZone.run(() => this.nombreFin = txt));
          }
          this.fitBoundsIfBoth();
        }

        const completos = !!this.inicioMarker && !!this.finMarker;
        if (completos !== this.puntosCompletos) {
          this.ngZone.run(() => (this.puntosCompletos = completos));
        }
      });
    });
  }

  private reverseGeocode(latlng: google.maps.LatLngLiteral): Promise<string> {
    return new Promise((resolve) => {
      if (!this.geocoder) { resolve(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`); return; }
      this.geocoder.geocode({ location: latlng }, (results: any, status: string) => {
        if (status === 'OK' && results?.length) resolve(results[0].formatted_address);
        else resolve(`${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
      });
    });
  }

  private fitBoundsIfBoth() {
    if (!this.inicio || !this.fin) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.inicio);
    bounds.extend(this.fin);
    this.map.fitBounds(bounds);
  }

  private distanceMeters(a: google.maps.LatLng, b: google.maps.LatLng): number {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(b.lat() - a.lat());
    const dLng = toRad(b.lng() - a.lng());
    const lat1 = toRad(a.lat());
    const lat2 = toRad(b.lat());
    const x =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    return R * c;
  }

  limpiarPuntos(): void {
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

  getCoordenadasInicioFin():
    | { inicio: google.maps.LatLngLiteral; fin: google.maps.LatLngLiteral }
    | null {
    if (!this.inicio || !this.fin) return null;
    return { inicio: this.inicio, fin: this.fin };
  }

  finalizarTrayecto(): void {
  if (!this.puedeGuardar) return;

  const payload = {
    nombre: (this.rutaForm.get('nombre')?.value || '').toString().trim(),
    puntoInicio: this.inicio ? { lat: this.inicio.lat, lng: this.inicio.lng } : null,
    nombreInicio: this.nombreInicio || null,
    puntoFin: this.fin ? { lat: this.fin.lat, lng: this.fin.lng } : null,
    nombreFin: this.nombreFin || null,
    estatus: 1,
    idZona: this.rutaForm.get('idRegion')?.value ?? null,
    idZonaFin: null
  };

  this.agregar(payload);
}

  private svgPinUrl(color: string) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill="${color}"/>
      <circle cx="12" cy="9" r="3" fill="#ffffff"/>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  limpiarProceso(): void {
    this.limpiarPuntos();
    this.rutaForm.patchValue({ nombre: '', idRegion: null, estatus: 1 });
    this.rutaForm.markAsPristine();
    this.rutaForm.markAsUntouched();
  }

  get puedeGuardar(): boolean {
    return this.rutaForm.valid && !!this.inicio && !!this.fin;
  }

agregar(payload: {
  nombre: string;
  puntoInicio: { lat: number; lng: number } | null;
  nombreInicio: string | null;
  puntoFin: { lat: number; lng: number } | null;
  nombreFin: string | null;
  estatus: number;
  idZona: number | null;
  idZonaFin: number | null;
}): void {
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


}
