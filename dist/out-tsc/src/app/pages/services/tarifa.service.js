import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let TarifasService = class TarifasService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/tarifas`;
    }
    obtenerTarifasData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/tarifas/${page}/${pageSize}`);
    }
    obtenerTarifas() {
        return this.http.get(`${environment.API_SECURITY}/tarifas/list`);
    }
    agregarTarifa(data) {
        return this.http.post(environment.API_SECURITY + '/tarifas', data);
    }
    eliminarTarifa(idTarifa) {
        return this.http.delete(environment.API_SECURITY + '/tarifas/' + idTarifa);
    }
    obtenerTarifa(idTarifa) {
        return this.http.get(environment.API_SECURITY + '/tarifas/' + idTarifa);
    }
    actualizarTarifa(idTarifa, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/tarifas/` + idTarifa, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposTarifa() {
        return this.http.get(`${environment.API_SECURITY}/cat-tipo-tarifa`).pipe(catchError(error => throwError(() => error)));
    }
};
TarifasService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TarifasService);
export { TarifasService };
//# sourceMappingURL=tarifa.service.js.map