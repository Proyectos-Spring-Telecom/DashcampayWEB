import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let RolesService = class RolesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/roles`;
    }
    obtenerRolesData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/roles/${page}/${pageSize}`);
    }
    obtenerRoles() {
        return this.http.get(`${environment.API_SECURITY}/roles/list`);
    }
    agregarRole(data) {
        return this.http.post(environment.API_SECURITY + '/roles', data);
    }
    eliminarRole(idModulo) {
        return this.http.delete(environment.API_SECURITY + '/roles/' + idModulo);
    }
    obtenerRole(idModulo) {
        return this.http.get(environment.API_SECURITY + '/roles/' + idModulo);
    }
    actualizarRoles(idModulo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/roles/` + idModulo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
RolesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RolesService);
export { RolesService };
//# sourceMappingURL=roles.service.js.map