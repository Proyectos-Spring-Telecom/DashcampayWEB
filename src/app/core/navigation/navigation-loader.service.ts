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
        label: 'Administración',
        permissions: [5],
        children: [
          {
            type: 'link',
            label: 'Tablero',
            icon: 'mat:dashboard',
            route: '/administracion/dashboard',
            permissions: [95]
          },
          {
            type: 'link',
            label: 'Usuarios',
            route: '/administracion/usuarios',
            permissions: [5],
            icon: 'mat:manage_accounts'
          },
          {
            type: 'link',
            label: 'Roles',
            route: '/administracion/roles',
            icon: 'mat:group',
            permissions: [9],
          },
          {
            type: 'link',
            label: 'Bitácora',
            route: '/administracion/bitacora',
            icon: 'mat:event_note',
            permissions: [85]
          },
          {
            type: 'link',
            label: 'Clientes',
            route: '/administracion/clientes',
            icon: 'mat:badge',
            permissions: [1],
          },
          {
            type: 'link',
            label: 'Permisos',
            route: '/administracion/permisos',
            icon: 'mat:lock',
            permissions: [13],
          },
          {
            type: 'link',
            label: 'Módulos',
            route: '/administracion/modulos',
            icon: 'mat:apps',
            permissions: [17]
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
        label: 'Gestión de flota',
        children: [
          {
            type: 'link',
            label: 'Tipo de pasajeros',
            route: '/administracion/tipos-pasajero',
            icon: 'mat:category',
            permissions: [105]
          },
          {
            type: 'link',
            label: 'Operadores',
            route: '/administracion/operadores',
            icon: 'mat:group',
            permissions: [33]
          },
          {
            type: 'link',
            label: 'Validadores',
            route: '/administracion/validadores',
            icon: 'mat:verified',
            permissions: [41]
          },
          {
            type: 'link',
            label: 'Contadores',
            route: '/administracion/contadora',
            icon: 'mat:calculate',
            permissions: [45]
          },
          {
            type: 'link',
            label: 'Vehículos',
            route: '/administracion/vehiculos',
            icon: 'mat:time_to_leave',
            permissions: [37]
          },
          {
            type: 'link',
            label: 'Instalaciones',
            route: '/administracion/instalaciones',
            icon: 'mat:handyman',
            permissions: [49]
          },
          {
            type: 'link',
            label: 'Zonas',
            route: '/administracion/zonas',
            icon: 'mat:map',
            permissions: [61]
          },
          {
            type: 'link',
            label: 'Rutas',
            route: '/administracion/rutas',
            icon: 'mat:alt_route',
            permissions: [65]
          },
          {
            type: 'link',
            label: 'Variantes',
            route: '/administracion/variantes',
            icon: 'mat:tune',
            permissions: [69]
          },
          {
            type: 'link',
            label: 'Tarifas',
            route: '/administracion/tarifas',
            icon: 'mat:attach_money',
            permissions: [73]
          },
          {
            type: 'link',
            label: 'Transbordos',
            route: '/administracion/transbordos',
            icon: 'mat:swap_horiz',
            permissions: [127]
          },
          {
            type: 'link',
            label: 'Mantenimiento',
            route: '/administracion/mantenimientos',
            icon: 'mat:build',
            permissions: [110],
          },
          {
            type: 'link',
            label: 'Verificaciones',
            route: '/administracion/verificaciones',
            icon: 'mat:verified_user',
            permissions: [114],
          },
          {
            type: 'link',
            label: 'Incidentes',
            route: '/administracion/incidentes',
            icon: 'mat:warning',
            permissions: [118],
          },
          {
            type: 'link',
            label: 'Talleres',
            route: '/administracion/talleres',
            icon: 'mat:garage',
            permissions: [122],
          },
          {
            type: 'link',
            label: 'Turnos',
            route: '/administracion/turnos',
            icon: 'mat:schedule',
            permissions: [53]
          },
          {
            type: 'link',
            label: 'En Vivo',
            route: '/administracion/monitoreo',
            icon: 'mat:location_on',
            permissions: [93]
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Conteo',
        children: [
          {
            type: 'link',
            label: 'Conteo de Personas',
            route: '/administracion/bitacora-viajes',
            icon: 'mat:groups',
            permissions: [86]
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Recaudo',
        children: [
          {
            type: 'link',
            label: 'Punto de venta',
            route: '/administracion/punto-venta',
            icon: 'mat:storefront',
            permissions: [92]
          },
          {
            type: 'link',
            label: 'Monederos',
            route: '/administracion/monederos',
            icon: 'mat:monetization_on',
            permissions: [77]
          },
          {
            type: 'link',
            label: 'Transacciones',
            route: '/administracion/transacciones',
            icon: 'mat:assessment',
            permissions: [90]
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Reportes',
        permissions: [94],
        children: [
          {
            type: 'link',
            label: 'Recaud. Diaria por Ruta',
            route: '/administracion/reportes/recaudacion-diaria-ruta',
            icon: 'mat:analytics',
            permissions: [94],
          },
          {
            type: 'link',
            label: 'Recaud. por Operador',
            route: '/administracion/reportes/recaudacion-operador',
            icon: 'mat:badge',
            permissions: [94],
          },
          {
            type: 'link',
            label: 'Recaud. por Vehículo',
            route: '/administracion/reportes/recaudacion-vehiculo',
            icon: 'mat:directions_bus',
            permissions: [94],
          },
          {
            type: 'link',
            label: 'Recaud. por Val/Inst',
            route: '/administracion/reportes/recaudacion-instalacionInstalacion',
            icon: 'mat:qr_code_2',
            permissions: [94],
          },
          {
            type: 'link',
            label: 'Validaciones Detalladas',
            route: '/administracion/reportes/validaciones-detalladas',
            icon: 'mat:fact_check',
            permissions: [94],
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