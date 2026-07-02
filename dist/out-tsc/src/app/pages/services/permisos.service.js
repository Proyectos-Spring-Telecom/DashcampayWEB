import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let PermisosService = class PermisosService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/permisos`;
    }
    obtenerPermisosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/permisos/${page}/${pageSize}`);
    }
    obtenerPermisos() {
        return this.http.get(`${environment.API_SECURITY}/permisos`);
    }
    obtenerPermisosAgrupados() {
        return this.http.get(`${environment.API_SECURITY}/permisos/permisosAgrupados`);
    }
    agregarPermiso(data) {
        return this.http.post(environment.API_SECURITY + '/permisos', data);
    }
    eliminarPermiso(idPermiso) {
        return this.http.delete(environment.API_SECURITY + '/permisos/' + idPermiso);
    }
    obtenerPermiso(idPermiso) {
        return this.http.get(environment.API_SECURITY + '/permisos/' + idPermiso);
    }
    actualizarPermiso(idPermiso, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/permisos/` + idPermiso, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/${id}/estatus`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
PermisosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PermisosService);
export { PermisosService };
//# sourceMappingURL=permisos.service.js.map