import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let InstalacionesService = class InstalacionesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/instalaciones`;
    }
    obtenerInstalacionesData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/instalaciones/${page}/${pageSize}`);
    }
    obtenerInstalaciones() {
        return this.http.get(`${environment.API_SECURITY}/instalaciones/list`);
    }
    obtenerInstalacionesByValidador(idValidador) {
        return this.http.get(`${environment.API_SECURITY}/instalaciones/by-idValidador/${idValidador}`);
    }
    agregarInstalacion(data) {
        return this.http.post(`${environment.API_SECURITY}/instalaciones`, data, { responseType: 'text' } // <- truco
        );
    }
    eliminarInstalacion(idInstalacion) {
        return this.http.delete(environment.API_SECURITY + '/instalaciones/' + idInstalacion);
    }
    obtenerInstalacion(idInstalacion) {
        return this.http.get(environment.API_SECURITY + '/instalaciones/' + idInstalacion);
    }
    actualizarInstalacion(idInstalacion, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/instalaciones/` + idInstalacion, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
InstalacionesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], InstalacionesService);
export { InstalacionesService };
//# sourceMappingURL=instalaciones.service.js.map