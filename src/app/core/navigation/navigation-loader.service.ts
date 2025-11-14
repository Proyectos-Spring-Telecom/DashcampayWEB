import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Trabajo',
        children: [
          {
            type: 'link',
            label: 'Tablero',
            icon: 'mat:dashboard',
            route: '/administracion/dashboard'
          },
          {
            type: 'link',
            label: 'Validadores',
            route: '/administracion/validadores',
            icon: 'mat:verified'
          },
          {
            type: 'link',
            label: 'Contadores',
            route: '/administracion/contadora',
            icon: 'mat:calculate'
          },
          {
            type: 'link',
            label: 'Vehículos',
            route: '/administracion/vehiculos',
            icon: 'mat:time_to_leave'
          },
          {
            type: 'link',
            label: 'Instalaciones',
            route: '/administracion/instalaciones',
            icon: 'mat:handyman',
          },
          {
            type: 'link',
            label: 'Operadores',
            route: '/administracion/operadores',
            icon: 'mat:group',
          },
          {
            type: 'link',
            label: 'Pasajeros',
            route: '/administracion/pasajeros',
            icon: 'mat:directions_walk',
          },
          {
            type: 'link',
            label: 'Punto de Venta',
            route: '/administracion/punto-venta',
            icon: 'mat:storefront',
          },
          {
            type: 'link',
            label: 'Monederos',
            route: '/administracion/monederos',
            icon: 'mat:monetization_on',
          },
          {
            type: 'link',
            label: 'Transacciones',
            route: '/administracion/transacciones',
            icon: 'mat:assessment'
          },
          // {
          //   type: 'link',
          //   label: 'Monitoreo',
          //   route: '/administracion/monitoreo',
          //   icon: 'mat:monitor_heart',
          // },
          {
            type: 'link',
            label: 'Zonas',
            route: '/administracion/zonas',
            icon: 'mat:map', // o 'mat:layers' / 'mat:grid_view'
          },
          {
            type: 'link',
            label: 'Rutas',
            route: '/administracion/rutas',
            icon: 'mat:alt_route', // o 'mat:route' / 'mat:signpost'
          },
          {
            type: 'link',
            label: 'Variantes',
            route: '/administracion/variantes',
            icon: 'mat:money', // o 'mat:tune' / 'mat:widgets'
          },
          {
            type: 'link',
            label: 'Tarifas',
            route: '/administracion/tarifas',
            icon: 'mat:category', // o 'mat:tune' / 'mat:widgets'
          },
          {
            type: 'link',
            label: 'Turnos',
            route: '/administracion/turnos',
            icon: 'mat:schedule',
          },
          {
            type: 'link',
            label: 'Bitácora',
            route: '/administracion/bitacora',
            icon: 'mat:event_note'
          },
          {
            type: 'link',
            label: 'En Vivo',
            route: '/administracion/monitoreo',
            icon: 'mat:location_on',
          },
          {
            type: 'link',
            label: 'Conteo de Personas',
            route: '/administracion/bitacora-viajes',
            icon: 'mat:groups'
          },
          {
            type: 'link',
            label: 'Perfil Pasajero',
            route: '/administracion/perfil-pasajero',
            icon: 'mat:description'
          }
        ]
      },
      {
        type: 'subheading',
        label: 'Administración',
        children: [
          {
            type: 'link',
            label: 'Usuarios',
            route: '/administracion/usuarios',
            icon: 'mat:manage_accounts'
          },
          {
            type: 'link',
            label: 'Clientes',
            route: '/administracion/clientes',
            icon: 'mat:badge'
          },

          {
            type: 'link',
            label: 'Permisos',
            route: '/administracion/permisos',
            icon: 'mat:lock'
          },
          {
            type: 'link',
            label: 'Módulos',
            route: '/administracion/modulos',
            icon: 'mat:apps',
            permissions: [1] 
          },
          {
            type: 'link',
            label: 'Roles',
            route: '/administracion/roles',
            icon: 'mat:group'
          },
          {
            type: 'link',
            label: 'Perfil de Usuario',
            route: '/administracion/perfil-usuario',
            icon: 'mat:person',
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Reportes',
        children: [
          {
            type: 'link',
            label: 'Recaud. Diaria por Ruta',
            route: '/administracion/reportes/recaudacion-diaria-ruta',
            icon: 'mat:analytics'
          },
          {
            type: 'link',
            label: 'Recaud. por Operador',
            route: '/administracion/reportes/recaudacion-operador',
            icon: 'mat:badge'
          },
          {
            type: 'link',
            label: 'Recaud. por Vehículo',
            route: '/administracion/reportes/recaudacion-vehiculo',
            icon: 'mat:directions_bus'
          },
          {
            type: 'link',
            label: 'Recaud. por Val/Inst',
            route: '/administracion/reportes/recaudacion-instalacionInstalacion',
            icon: 'mat:qr_code_2'
          },
          {
            type: 'link',
            label: 'Validaciones Detalladas',
            route: '/administracion/reportes/validaciones-detalladas',
            icon: 'mat:fact_check'
          },
          // {
          //   type: 'link',
          //   label: 'Conteo Pasajeros por Viaje',
          //   route: '/administracion/reportes/conteo-pasajero-viaje',
          //   icon: 'mat:groups'
          // }
        ]
      },
    ]);
  }
}