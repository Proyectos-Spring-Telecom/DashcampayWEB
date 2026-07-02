import { __decorate } from "tslib";
import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SKIP_APP_AUTH } from '../pages/auth/login/intercept.service';
let PasajerosService = class PasajerosService {
    constructor(http) {
        this.http = http;
        this.VERIFY_TOKEN_KEY = 'verify_token';
        this.apiUrl = `${environment.API_SECURITY}/pasajeros`;
    }
    setVerificationToken(token) {
        sessionStorage.setItem(this.VERIFY_TOKEN_KEY, token);
    }
    getVerificationToken() {
        return sessionStorage.getItem(this.VERIFY_TOKEN_KEY);
    }
    clearVerificationToken() {
        sessionStorage.removeItem(this.VERIFY_TOKEN_KEY);
    }
    obtenerPasajerosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/pasajeros/${page}/${pageSize}`);
    }
    obtenerPasajeros() {
        return this.http.get(`${environment.API_SECURITY}/pasajeros/list`);
    }
    agregarPasajero(data) {
        return this.http.post(`${environment.API_SECURITY}/pasajeros`, data);
    }
    eliminarPasajero(idPasajero) {
        return this.http.delete(`${environment.API_SECURITY}/pasajeros/${idPasajero}`);
    }
    obtenerPasajero(idPasajero) {
        return this.http.get(`${environment.API_SECURITY}/pasajeros/${idPasajero}`);
    }
    actualizarPasajero(idPasajero, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/pasajeros/${idPasajero}`, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    agregarPasajeroAfiliacion(data) {
        return this.http.post(`${environment.API_SECURITY}/login/pasajero/registro`, data);
    }
    verificarPasajero(codigo) {
        // Sin autenticación; sigue siendo PATCH y envía { codigo }
        const context = new HttpContext().set(SKIP_APP_AUTH, true);
        return this.http.patch(`${environment.API_SECURITY}/login/verify`, { codigo }, { responseType: 'text', context }).pipe(catchError(err => throwError(() => err)));
    }
    verificarPorCodigo(codigo) {
        return this.verificarPasajero(codigo);
    }
    datosUsuarioPasajero() {
        return this.http.get(`${environment.API_SECURITY}/pasajeros/wallet`);
    }
    obtenerTiposPasajero() {
        return this.http.get(`${environment.API_SECURITY}/catpasajero/list`).pipe(catchError(error => throwError(() => error)));
    }
};
PasajerosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PasajerosService);
export { PasajerosService };
//# sourceMappingURL=pasajeros.service.js.map