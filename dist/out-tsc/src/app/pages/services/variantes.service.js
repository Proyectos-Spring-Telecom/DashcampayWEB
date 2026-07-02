import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let VariantesService = class VariantesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/variantes`;
    }
    obtenerVariantesData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/variantes/${page}/${pageSize}`);
    }
    obtenerVariantes() {
        return this.http.get(`${environment.API_SECURITY}/variantes/list`);
    }
    obtenerVariantesByRuta(idRuta) {
        return this.http.get(`${environment.API_SECURITY}/variantes/by-ruta/${idRuta}`);
    }
    agregarVariante(data) {
        return this.http.post(environment.API_SECURITY + '/variantes', data);
    }
    eliminarVariante(idVariante) {
        return this.http.delete(environment.API_SECURITY + '/variantes/eliminado/total/' + idVariante);
    }
    obtenerVariante(idVariante) {
        return this.http.get(environment.API_SECURITY + '/variantes/' + idVariante);
    }
    actualizarVariante(idVariante, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/variantes/` + idVariante, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposVariante() {
        return this.http.get(`${environment.API_SECURITY}/variantes/tipos-variante`);
    }
};
VariantesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VariantesService);
export { VariantesService };
//# sourceMappingURL=variantes.service.js.map