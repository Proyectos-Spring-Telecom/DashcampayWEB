import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let TransaccionesService = class TransaccionesService {
    constructor(http) {
        this.http = http;
    }
    obtenerTransaccionesData(body) {
        return this.http.post(`${environment.API_SECURITY}/transacciones/paginado`, body);
    }
    obtenerTransaccion() {
        return this.http.get(`${environment.API_SECURITY}/transacciones/list`);
    }
    agregarTransaccion(data) {
        return this.http.post(environment.API_SECURITY + '/transacciones', data);
    }
    agregarRecarga(data) {
        return this.http.post(environment.API_SECURITY + '/transacciones/recarga', data);
    }
};
TransaccionesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TransaccionesService);
export { TransaccionesService };
//# sourceMappingURL=transacciones.service.js.map