import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let DispositivoBluevoxService = class DispositivoBluevoxService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/contadores`;
    }
    obtenerDispositivosBlueData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/contadores/${page}/${pageSize}`);
    }
    obtenerDispositivosBlue() {
        return this.http.get(`${environment.API_SECURITY}/contadores/list`);
    }
    obtenerDispositivosBlueByCliente(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/contadores/clientes/${idCliente}`);
    }
    agregarDispositivoBlue(data) {
        return this.http.post(environment.API_SECURITY + '/contadores', data);
    }
    eliminarDispositivoBlue(idDispositivo) {
        return this.http.delete(environment.API_SECURITY + '/contadores/' + idDispositivo);
    }
    obtenerDispositivoBlue(idDispositivo) {
        return this.http.get(environment.API_SECURITY + '/contadores/' + idDispositivo);
    }
    actualizarDispositivoBlue(idDispositivo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/contadores/` + idDispositivo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
DispositivoBluevoxService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DispositivoBluevoxService);
export { DispositivoBluevoxService };
//# sourceMappingURL=dispositivobluevox.service.js.map