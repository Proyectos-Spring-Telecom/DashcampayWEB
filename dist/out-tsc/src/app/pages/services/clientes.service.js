import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let ClientesService = class ClientesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/clientes`;
    }
    obtenerClientesData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/clientes/${page}/${pageSize}`);
    }
    obtenerClientes() {
        return this.http.get(`${environment.API_SECURITY}/clientes/public`);
    }
    obtenerClientesList() {
        return this.http.get(`${environment.API_SECURITY}/clientes/list`);
    }
    agregarCliente(data) {
        return this.http.post(environment.API_SECURITY + '/clientes', data);
    }
    eliminarCliente(idCliente) {
        return this.http.delete(environment.API_SECURITY + '/clientes/' + idCliente);
    }
    obtenerCliente(idCliente) {
        return this.http.get(environment.API_SECURITY + '/clientes/' + idCliente);
    }
    actualizarCliente(idCliente, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/clientes/` + idCliente, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
ClientesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClientesService);
export { ClientesService };
//# sourceMappingURL=clientes.service.js.map