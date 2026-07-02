import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
// import { AuthenticationService } from 'src/app/core/services/auth.service';
// import { AuthServiceService } from '../services/auth-service.service';
let AuthGuard = class AuthGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    canActivate(route, state) {
        // Verificar si el usuario está autenticado
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        // Obtener los permisos del usuario desde el local storage
        const permisos = JSON.parse(sessionStorage.getItem('permissions') || '[]');
        // console.log(permisos);
        // Verificar si la ruta actual requiere un permiso específico
        const permisoRequerido = route.data['permiso']; // Permiso requerido configurado en la ruta
        if (!permisos.includes(permisoRequerido)) {
            // Redirigir al usuario si no tiene el permiso necesario
            this.router.navigate(['/unauthorized']); // Ruta a una página de "no autorizado"
            return false;
        }
        return true;
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map