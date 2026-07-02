import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let TalleresService = class TalleresService {
    constructor(http) {
        this.http = http;
    }
    obtenerTalleresData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/talleres/${page}/${pageSize}`);
    }
    obtenerTalleres() {
        return this.http.get(`${environment.API_SECURITY}/talleres/list`);
    }
    obtenerTallerPorId(id) {
        return this.http.get(`${environment.API_SECURITY}/talleres/${id}`);
    }
    agregarTaller(data) {
        return this.http.post(`${environment.API_SECURITY}/talleres`, data);
    }
    actualizarTaller(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/talleres/${id}`, data);
    }
    activarTaller(id) {
        return this.http.patch(`${environment.API_SECURITY}/talleres/activar/${id}`, {});
    }
    desactivarTaller(id) {
        return this.http.patch(`${environment.API_SECURITY}/talleres/desactivar/${id}`, {});
    }
};
TalleresService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TalleresService);
export { TalleresService };
//# sourceMappingURL=talleres.service.js.map