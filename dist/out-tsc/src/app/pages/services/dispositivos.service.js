import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let DispositivosService = class DispositivosService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/validadores`;
    }
    obtenerDispositivosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/validadores/${page}/${pageSize}`);
    }
    obtenerDispositivos() {
        return this.http.get(`${environment.API_SECURITY}/validadores/list`);
    }
    obtenerDispositivosByCliente(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/validadores/clientes/${idCliente}`);
    }
    agregarDispositivo(data) {
        return this.http.post(environment.API_SECURITY + '/validadores', data);
    }
    eliminarDispositivo(idDispositivo) {
        return this.http.delete(environment.API_SECURITY + '/validadores/' + idDispositivo);
    }
    obtenerDispositivo(idDispositivo) {
        return this.http.get(environment.API_SECURITY + '/validadores/' + idDispositivo);
    }
    actualizarDispositivo(idDispositivo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/validadores/` + idDispositivo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    actualizarEstado(id, estado) {
        const url = `${this.apiUrl}/actualizar/estado/${id}`;
        const body = { estadoActual: estado };
        return this.http.patch(url, body).pipe(catchError(error => throwError(() => error)));
    }
};
DispositivosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DispositivosService);
export { DispositivosService };
//# sourceMappingURL=dispositivos.service.js.map