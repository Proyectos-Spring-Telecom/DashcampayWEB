import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { User } from '../../entities/User';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { BaseServicesService } from './base.service';
let AuthenticationService = class AuthenticationService extends BaseServicesService {
    constructor(http, router) {
        super();
        this.http = http;
        this.router = router;
        this.authenticationChanged = new Subject();
        this.user = new User();
    }
    isAuthenticated() {
        return !!this.getToken();
    }
    isAuthenticationChanged() {
        return this.authenticationChanged.asObservable();
    }
    clearUserData() {
        this.user = null;
        sessionStorage.clear();
        this.authenticationChanged.next(false);
    }
    /** ✅ Obtiene el token (o null si no existe) */
    getToken() {
        const token = sessionStorage.getItem("token");
        if (!token || token === "null" || token === "undefined") {
            return null;
        }
        return token; // ✅ Ya no usamos JSON.parse
    }
    /** ✅ Guarda datos del usuario después de login */
    setData(data) {
        this.setStorageToken(data.token);
        this.setStorageUser(data);
        this.setStoragePermissions(data.permisos);
    }
    failToken() {
        this.cleanSession();
    }
    async logout() {
        try {
            window.location.reload();
            console.log('Datos en sessionStorage antes de limpiar:', sessionStorage);
            console.log('Datos en localStorage antes de limpiar:', localStorage);
            sessionStorage.clear();
            localStorage.clear();
            console.log('Datos en sessionStorage después de limpiar:', sessionStorage);
            console.log('Datos en localStorage después de limpiar:', localStorage);
            this.authenticationChanged.next(false);
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
    }
    /** ✅ Guarda el token sin JSON.stringify */
    setStorageToken(value) {
        sessionStorage.setItem("token", value); // ✅ ya no se hace JSON.stringify
        this.authenticationChanged.next(this.isAuthenticated());
    }
    /** ✅ Guarda el usuario completo */
    setStorageUser(value) {
        const _value = JSON.stringify(value);
        sessionStorage.setItem("user", _value);
        this.authenticationChanged.next(this.isAuthenticated());
    }
    setStorageCoordinate(coordinates) {
        const coords = JSON.stringify(coordinates);
        sessionStorage.setItem("coordinates", coords);
    }
    updateUsuario(id, form) {
        return this.http.put(`${environment.API_SECURITY}/api/controlusuarios/${id}`, form);
    }
    getUsuarioControl(id) {
        return this.http.get(`${environment.API_SECURITY}/api/controlusuarios/${id}`);
    }
    setStoragePermissions(permissions) {
        const flat = (Array.isArray(permissions) ? permissions : [])
            .map(p => String((p && typeof p === 'object' && ('idPermiso' in p)) ? p.idPermiso : p).trim());
        sessionStorage.setItem('permissions', JSON.stringify(flat));
        this.authenticationChanged.next(this.isAuthenticated());
    }
    cleanSession() {
        sessionStorage.clear();
    }
    getUser() {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    getCoordinates() {
        const coords = sessionStorage.getItem("coordinates");
        return coords ? JSON.parse(coords) : null;
    }
    getPermissions() {
        try {
            const raw = sessionStorage.getItem('permissions');
            if (!raw)
                return [];
            const parsed = JSON.parse(raw);
            return (Array.isArray(parsed) ? parsed : [])
                .map(p => String((p && typeof p === 'object' && ('idPermiso' in p)) ? p.idPermiso : p).trim());
        }
        catch {
            return [];
        }
    }
    authenticate(body) {
        return this.http.post(environment.API_SECURITY + '/login', body);
    }
    // auth.service.ts
    recuperarAcceso(data) {
        // Devuelve texto plano: "Se ha enviado un correo..."
        return this.http.post(environment.API_SECURITY + '/login/recuperar/confirmacion', data, { responseType: 'text' } // evita "Http failure during parsing"
        );
    }
    // si la verificación (4 dígitos) también retorna texto, haz lo mismo:
    reenviarCodigo(payload) {
        return this.http.patch(environment.API_SECURITY + '/login/verify', payload, { responseType: 'text' });
    }
};
AuthenticationService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=auth.service.js.map