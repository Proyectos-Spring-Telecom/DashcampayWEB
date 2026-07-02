import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let ZonasService = class ZonasService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/zonas`;
    }
    obtenerZonasData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/zonas/${page}/${pageSize}`);
    }
    obtenerZonas() {
        return this.http.get(`${environment.API_SECURITY}/zonas/list`);
    }
    obtenerZonasByCliente(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/zonas/by-idCliente/${idCliente}`);
    }
    agregarZona(data) {
        return this.http.post(environment.API_SECURITY + '/zonas', data);
    }
    eliminarZona(idRegion) {
        return this.http.delete(environment.API_SECURITY + '/zonas/' + idRegion);
    }
    obtenerZona(idRegion) {
        return this.http.get(environment.API_SECURITY + '/zonas/' + idRegion);
    }
    actualizarZona(idRegion, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/zonas/` + idRegion, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
ZonasService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ZonasService);
export { ZonasService };
//# sourceMappingURL=zonas.service.js.map