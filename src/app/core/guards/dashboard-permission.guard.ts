import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { AuthenticationService } from '../services/auth.service';

/**
 * Si el usuario no tiene permiso de Tablero, redirige al primer ítem de menú disponible.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardPermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private navigation: NavigationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const home = this.navigation.getHomeRoute();
    if (home !== '/administracion/dashboard') {
      this.router.navigateByUrl(home);
      return false;
    }

    return true;
  }
}
