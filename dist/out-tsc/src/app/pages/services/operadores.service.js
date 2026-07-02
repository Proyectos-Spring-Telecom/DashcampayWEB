import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let OperadoresService = class OperadoresService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/operadores`;
    }
    obtenerOperadoresData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/operadores/${page}/${pageSize}`);
    }
    obtenerOperadores() {
        return this.http.get(`${environment.API_SECURITY}/operadores/list`);
    }
    obtenerOperadoresByCliente(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/operadores/by-cliente/${idCliente}`);
    }
    agregarOperador(data) {
        return this.http.post(environment.API_SECURITY + '/operadores', data);
    }
    eliminarOperador(idDispositivo) {
        return this.http.delete(environment.API_SECURITY + '/operadores/' + idDispositivo);
    }
    obtenerOperador(idDispositivo) {
        return this.http.get(environment.API_SECURITY + '/operadores/' + idDispositivo);
    }
    actualizarOperador(idDispositivo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/operadores/` + idDispositivo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    obtenerCategoriasLicencia() {
        return this.http.get(`${environment.API_SECURITY}/catcategorialicencia/list`).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposLicencia() {
        return this.http.get(`${environment.API_SECURITY}/cattipolicencia/list`).pipe(catchError(error => throwError(() => error)));
    }
    agregarLicencia(data) {
        return this.http.post(`${environment.API_SECURITY}/licencias`, data).pipe(catchError(error => throwError(() => error)));
    }
};
OperadoresService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OperadoresService);
export { OperadoresService };
//# sourceMappingURL=operadores.service.js.map