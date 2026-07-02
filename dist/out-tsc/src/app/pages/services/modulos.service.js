import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let ModulosService = class ModulosService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/modulos`;
    }
    obtenerModuloData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/modulos/${page}/${pageSize}`);
    }
    obtenerModulos() {
        return this.http.get(`${environment.API_SECURITY}/modulos/list`);
    }
    agregarModulo(data) {
        return this.http.post(environment.API_SECURITY + '/modulos', data);
    }
    eliminarModulo(idModulo) {
        return this.http.delete(environment.API_SECURITY + '/modulos/' + idModulo);
    }
    obtenerModulo(idModulo) {
        return this.http.get(environment.API_SECURITY + '/modulos/' + idModulo);
    }
    actualizarModulo(idModulo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/modulos/` + idModulo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/${id}/estatus`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
ModulosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ModulosService);
export { ModulosService };
//# sourceMappingURL=modulos.service.js.map