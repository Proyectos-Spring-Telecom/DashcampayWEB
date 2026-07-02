import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let TransbordosService = class TransbordosService {
    constructor(http) {
        this.http = http;
    }
    obtenerTransbordosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/transbordos/${page}/${pageSize}`);
    }
    obtenerTransbordo(id) {
        return this.http.get(`${environment.API_SECURITY}/transbordos/${id}`);
    }
    agregarTransbordo(data) {
        return this.http.post(`${environment.API_SECURITY}/transbordos`, data);
    }
    actualizarTransbordo(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/transbordos/${id}`, data);
    }
    eliminarTransbordo(id) {
        return this.http.delete(`${environment.API_SECURITY}/transbordos/${id}`);
    }
    obtenerTiposDescuento() {
        return this.http.get(`${environment.API_SECURITY}/transbordos/tipos-descuento`);
    }
};
TransbordosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TransbordosService);
export { TransbordosService };
//# sourceMappingURL=transbordos.service.js.map