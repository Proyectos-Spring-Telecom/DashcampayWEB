import { Injectable } from '@angular/core';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
  NavigationSubheading
} from './navigation-item.interface';
import { Observable, Subject } from 'rxjs';
import { NavigationLoaderService } from './navigation-loader.service';
import { AuthenticationService } from '../services/auth.service';

const DASHBOARD_ROUTE = '/administracion/dashboard';
const FALLBACK_ROUTE = '/administracion/perfil-usuario';
const PASAJERO_ROUTE = '/administracion/perfil-pasajero';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  items$: Observable<NavigationItem[]> = this.navigationLoaderService.items$;

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor(
    private readonly navigationLoaderService: NavigationLoaderService,
    private readonly auth: AuthenticationService
  ) {}

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }

  /** Misma regla que el sidenav (`canSee`). */
  canAccessItem(
    item: NavigationItem,
    permissions?: string[],
    roleName?: string
  ): boolean {
    const role = String(
      roleName ?? this.auth.getUser()?.rol?.nombre ?? ''
    )
      .trim()
      .toLowerCase();

    const roles = (item as NavigationLink)?.roles;
    if (roles?.length) {
      if (!roles.some((r) => String(r).trim().toLowerCase() === role)) {
        return false;
      }
    }

    const req = item?.permissions || [];
    if (!req.length) return true;

    const have = (permissions ?? this.auth.getPermissions() ?? []).map((p) =>
      String(p).trim()
    );
    return req.map(String).some((p) => have.includes(p));
  }

  /**
   * Primer enlace del menú (orden del sidenav) con permiso explícito al que puede entrar.
   * Omite ítems sin `permissions` (p. ej. Perfil de Usuario) para no adelantarse a Rutas, etc.
   */
  getFirstAccessibleRoute(
    permissions?: string[],
    roleName?: string
  ): string | null {
    const have = permissions ?? this.auth.getPermissions();
    const role = roleName ?? String(this.auth.getUser()?.rol?.nombre ?? '');
    return this.findFirstRoute(
      this.navigationLoaderService.getItems(),
      have,
      role,
      true
    );
  }

  /**
   * Ruta post-login: dashboard si tiene permiso; si no, primer ítem de menú con permiso.
   */
  getHomeRoute(permissions?: string[], roleName?: string): string {
    const role = String(
      roleName ?? this.auth.getUser()?.rol?.nombre ?? ''
    )
      .trim()
      .toLowerCase();

    if (role === 'pasajero') {
      return PASAJERO_ROUTE;
    }

    const have = permissions ?? this.auth.getPermissions();
    const items = this.navigationLoaderService.getItems();
    const dashboardItem = this.findItemByRoute(items, DASHBOARD_ROUTE);

    if (
      dashboardItem &&
      this.canAccessItem(dashboardItem, have, role)
    ) {
      return DASHBOARD_ROUTE;
    }

    return this.findFirstRoute(items, have, role, true) ?? FALLBACK_ROUTE;
  }

  private findItemByRoute(
    items: NavigationItem[],
    route: string
  ): NavigationItem | null {
    for (const item of items) {
      if (this.isLink(item) && item.route === route) {
        return item;
      }
      const children =
        this.isDropdown(item) || this.isSubheading(item)
          ? item.children
          : null;
      if (children?.length) {
        const found = this.findItemByRoute(children as NavigationItem[], route);
        if (found) return found;
      }
    }
    return null;
  }

  private findFirstRoute(
    items: NavigationItem[],
    permissions: string[],
    roleName: string,
    onlyPermissionGated = false
  ): string | null {
    for (const item of items) {
      if (this.isLink(item)) {
        const hasGate =
          (item.permissions?.length ?? 0) > 0 || (item.roles?.length ?? 0) > 0;
        if (onlyPermissionGated && !hasGate) {
          continue;
        }
        if (
          this.canAccessItem(item, permissions, roleName) &&
          typeof item.route === 'string' &&
          item.route
        ) {
          return item.route;
        }
        continue;
      }

      if (this.isDropdown(item) || this.isSubheading(item)) {
        const childRoute = this.findFirstRoute(
          item.children as NavigationItem[],
          permissions,
          roleName,
          onlyPermissionGated
        );
        if (childRoute) return childRoute;
      }
    }
    return null;
  }
}
