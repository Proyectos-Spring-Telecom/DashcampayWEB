import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let MonederosServices = class MonederosServices {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/monederos`;
    }
    obtenerMonederosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/monederos/${page}/${pageSize}`);
    }
    obtenerMonederos() {
        return this.http.get(`${environment.API_SECURITY}/monederos/list`);
    }
    agregarMonedero(data) {
        return this.http.post(environment.API_SECURITY + '/monederos', data);
    }
    crearTransaccion(data) {
        return this.http.post(environment.API_SECURITY + '/transacciones', data);
    }
    eliminarMonedero(idMonedero) {
        return this.http.delete(environment.API_SECURITY + '/monederos/' + idMonedero);
    }
    obtenerMonedero(idMonedero) {
        return this.http.get(environment.API_SECURITY + '/monederos/' + idMonedero);
    }
    actualizarMonedero(idMonedero, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/monederos/${idMonedero}`, saveForm);
    }
    actualizarMonederoForm(saveForm) {
        return this.http.put(`${environment.API_SECURITY}/monederos/`, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    actualizarTipoPasajero(id, idTipoPasajero) {
        const url = `${this.apiUrl}/tipo/pasajero/${id}`;
        const body = { idTipoPasajero };
        return this.http.patch(url, body).pipe(catchError(error => throwError(() => error)));
    }
    reporteExtravio(correo, numeroSerie) {
        const body = { correo, numeroSerie };
        return this.http.post(`${environment.API_SECURITY}/monederos/reporte/extravio`, body);
    }
    updateTipoPasajero(idMonedero, idTipoPasajero) {
        const url = `${this.apiUrl}/tipo/pasajero/${idMonedero}`;
        const body = { idTipoPasajero };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
MonederosServices = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MonederosServices);
export { MonederosServices };
//# sourceMappingURL=monederos.service.js.map