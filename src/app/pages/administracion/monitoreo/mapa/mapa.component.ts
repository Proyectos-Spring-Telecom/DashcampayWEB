// mapa.component.ts
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

declare const google: any;

interface UnidadMapa {
  id: number;
  codigo: string;        // U-143, U-092, etc.
  modelo: string;        // Boxer 2022, Worker 15.190...
  conductor: string;
  ultimoPing: string;    // "08:14"
  velocidad?: string;    // "67 km/h"
  estado: 'ruta' | 'pausa' | 'desvio';
  desvioKm?: string;     // "3.1 km"
  posicion: { lat: any; lng: any };
}

@Component({
  selector: 'vex-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  animations: [fadeInRight400ms],
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  private map!: google.maps.Map;
  private infoWindow!: google.maps.InfoWindow;
  private markers = new Map<number, google.maps.Marker>();
  layoutCtrl = new UntypedFormControl('fullwidth');

  private readonly MAP_ID = 'DEMO_MAP_ID';

  // Datos de ejemplo (cámbialos por los que te regrese tu API)
  unidades: UnidadMapa[] = [
    {
      id: 143,
      codigo: 'U-143',
      modelo: 'Boxer 2022',
      conductor: 'R. García',
      ultimoPing: '08:14',
      velocidad: '67 km/h',
      estado: 'ruta',
      posicion: { lat: 19.432608, lng: -99.133209 }, // CDMX
    },
    {
      id: 92,
      codigo: 'U-092',
      modelo: 'Worker 15.190',
      conductor: 'M. Ruiz',
      ultimoPing: '08:06',
      estado: 'pausa',
      posicion: { lat: 19.302608, lng: -99.123209 },
    },
    {
      id: 218,
      codigo: 'U-218',
      modelo: 'Boxer 2021',
      conductor: 'J. Flores',
      ultimoPing: '07:58',
      estado: 'desvio',
      desvioKm: '3.1 km',
      posicion: { lat: 19.382608, lng: -99.203209 },
    },
  ];

  async ngAfterViewInit(): Promise<void> {
    try {
      await this.waitForGoogleMaps();
      this.initMap();
    } catch (e) {
      console.error('Google Maps no cargó', e);
    }
  }

  ngOnDestroy(): void {
    this.markers.forEach((m) => m.setMap(null));
    this.markers.clear();
  }

  private waitForGoogleMaps(): Promise<void> {
    if ((window as any).google?.maps) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const tick = () => {
        if ((window as any).google?.maps) return resolve();
        if (Date.now() - start > 8000) return reject('Timeout Google Maps');
        requestAnimationFrame(tick);
      };
      tick();
    });
  }

  private initMap(): void {
    const el = document.getElementById('map');
    if (!el) {
      console.error('No se encontró el elemento #map');
      return;
    }
    el.innerHTML = '';

    const options: google.maps.MapOptions = {
      center: { lat: 19.432608, lng: -99.133209 },
      zoom: 8,
      fullscreenControl: true,
      streetViewControl: false,
      mapTypeControl: true,
      mapId: this.MAP_ID,
    };

    this.map = new google.maps.Map(el, options);
    this.infoWindow = new google.maps.InfoWindow();

    this.map.addListener('click', () => this.infoWindow.close());

    this.unidades.forEach((u) => this.addMarker(u));
  }

private addMarker(u: UnidadMapa): void {
  const icon = {
    url: this.svgCarUrl('#1F5AA8'), // azul medio de tu manual
    scaledSize: new google.maps.Size(42, 42),
    anchor: new google.maps.Point(21, 36),
  };

  const marker = new google.maps.Marker({
    position: u.posicion,
    map: this.map,
    title: `${u.codigo} · ${u.modelo}`,
    icon,
  });

  marker.addListener('click', (ev: any) => {
    if (ev?.domEvent?.stopPropagation) {
      ev.domEvent.stopPropagation();
    }

    const html = this.buildInfoWindowHtml(u);
    this.infoWindow.setContent(html);
    this.infoWindow.open(this.map, marker);
  });

  this.markers.set(u.id, marker);
}


  private buildInfoWindowHtml(u: UnidadMapa): string {
    const estadoTexto =
      u.estado === 'ruta'
        ? 'En ruta'
        : u.estado === 'pausa'
        ? 'En pausa'
        : 'Fuera de ruta';

    const estadoColor =
      u.estado === 'ruta'
        ? '#22c55e'
        : u.estado === 'pausa'
        ? '#fbbf24'
        : '#ef4444';

    return `
      <div class="mp-iw">
        <div class="mp-iw-title">
          ${u.codigo} · ${u.modelo}
        </div>
        <div class="mp-iw-row">
          <span class="mp-iw-label">Conductor</span>
          <span class="mp-iw-value">${u.conductor}</span>
        </div>
        <div class="mp-iw-row">
          <span class="mp-iw-label">Último ping</span>
          <span class="mp-iw-value">${u.ultimoPing}</span>
        </div>
        ${
          u.velocidad
            ? `<div class="mp-iw-row">
                 <span class="mp-iw-label">Velocidad</span>
                 <span class="mp-iw-value">${u.velocidad}</span>
               </div>`
            : ''
        }
        ${
          u.desvioKm
            ? `<div class="mp-iw-row">
                 <span class="mp-iw-label">Desvío</span>
                 <span class="mp-iw-value">${u.desvioKm}</span>
               </div>`
            : ''
        }
        <div class="mp-iw-pill" style="background:${estadoColor}1a;color:${estadoColor}">
          ${estadoTexto}
        </div>
      </div>
    `;
  }

  centrarUnidad(id: number): void {
    const marker = this.markers.get(id);
    const unidad = this.unidades.find((u) => u.id === id);

    if (!marker || !unidad) return;

    const pos = marker.getPosition();
    if (!pos) return;

    this.map.panTo(pos);
    this.map.setZoom(14);

    const html = this.buildInfoWindowHtml(unidad);
    this.infoWindow.setContent(html);
    this.infoWindow.open(this.map, marker);
  }

  private svgCarUrl(color: string) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
    <g fill="none" fill-rule="evenodd">
      <path d="M3 13.5c0-.8.5-1.5 1.2-1.7l1-.3 1.3-3.5C6.9 7 7.7 6.5 8.6 6.5h6.8c.9 0 1.7.5 2.1 1.5l1.3 3.5 1 .3c.7.2 1.2.9 1.2 1.7V16c0 .6-.4 1-1 1h-1v1.2c0 .4-.3.8-.8.8h-1c-.4 0-.8-.3-.8-.8V17H7.3v1.2c0 .4-.3.8-.8.8h-1c-.4 0-.8-.3-.8-.8V17H3c-.6 0-1-.4-1-1v-2.5Z" fill="${color}"/>
      <circle cx="7.5" cy="15.5" r="1.3" fill="#ffffff"/>
      <circle cx="16.5" cy="15.5" r="1.3" fill="#ffffff"/>
      <rect x="8" y="8" width="8" height="3" rx=".7" fill="#ffffff" opacity=".9"/>
    </g>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

}
