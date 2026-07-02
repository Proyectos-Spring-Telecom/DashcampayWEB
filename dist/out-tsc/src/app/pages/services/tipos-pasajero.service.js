import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let TiposPasajeroService = class TiposPasajeroService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    obtenerTiposPasajero() {
        return this.http.get(`${environment.API_SECURITY}/catpasajero/list`).pipe(catchError(error => throwError(() => error)));
    }
    updateEstatus(id, estatus) {
        const url = `${environment.API_SECURITY}/catpasajero/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposDescuento() {
        return this.http.get(`${environment.API_SECURITY}/cattipodescuento/list`).pipe(catchError(error => throwError(() => error)));
    }
    agregarTipoPasajero(data) {
        return this.http.post(`${environment.API_SECURITY}/catpasajero`, data).pipe(catchError(error => throwError(() => error)));
    }
    actualizarTipoPasajero(id, data) {
        return this.http.put(`${environment.API_SECURITY}/catpasajero/${id}`, data).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTipoPasajero(id) {
        return this.http.get(`${environment.API_SECURITY}/catpasajero/${id}`).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposPasajeroList() {
        return this.http.get(`${environment.API_SECURITY}/catpasajero/list`).pipe(catchError(error => throwError(() => error)));
    }
};
TiposPasajeroService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TiposPasajeroService);
export { TiposPasajeroService };
//# sourceMappingURL=tipos-pasajero.service.js.map