import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let BitacoraService = class BitacoraService {
    constructor(http) {
        this.http = http;
    }
    obtenerBitacoraData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/bitacora/${page}/${pageSize}`);
    }
    obtenerBitacora() {
        return this.http.get(`${environment.API_SECURITY}/bitacora/list`);
    }
    obtenerConteoPasajerosRangoAgrupado(fechaInicio, fechaFin) {
        return this.http.get(`${environment.API_SECURITY}/conteopasajeros/rango-agrupado/${fechaInicio}/${fechaFin}`);
    }
};
BitacoraService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BitacoraService);
export { BitacoraService };
//# sourceMappingURL=bitacora.service.js.map