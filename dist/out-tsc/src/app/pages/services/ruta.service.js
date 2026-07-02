import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let RutasService = class RutasService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/rutas`;
    }
    // obtenerRutas(): Observable<any> {
    //   return this.http.get<any>(`https://transmovi.mx/api/ruta/rutas`);
    // }
    // detallarRuta(saveForm: any): Observable<any> {
    //   return this.http.post(`https://transmovi.mx/api/ruta/rutas/detallar`, saveForm);
    // }
    // guardarRutas(saveForm: any): Observable<any> {
    //   return this.http.post(`https://transmovi.mx/api/ruta/rutas/guardar`, saveForm);
    // }
    // configurarTarifa(saveForm: any): Observable<any> {
    //   return this.http.post(`https://transmovi.mx/api/ruta/tarifas/configurar`, saveForm);
    // }
    // obtenerRuta(idRuta: any): Observable<any> {
    // 	return this.http.get<any>('https://transmovi.mx/api/ruta/rutas/' + idRuta);
    // }
    obtenerRutasData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/rutas/${page}/${pageSize}`);
    }
    obtenerRutas() {
        return this.http.get(`${environment.API_SECURITY}/rutas/list`);
    }
    obtenerRutasByZona(idZona) {
        return this.http.get(`${environment.API_SECURITY}/rutas/by-zona/${idZona}`);
    }
    obtenerRutasByIdCliente(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/rutas/by-idCliente/${idCliente}`);
    }
    agregarRuta(payload) {
        return this.http.post(`${environment.API_SECURITY}/rutas`, payload);
    }
    eliminarRuta(idRuta) {
        return this.http.delete(environment.API_SECURITY + '/rutas/' + idRuta);
    }
    obtenerRuta(idRuta) {
        return this.http.get(environment.API_SECURITY + '/rutas/' + idRuta);
    }
    actualizarRuta(idRuta, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/rutas/` + idRuta, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
RutasService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RutasService);
export { RutasService };
//# sourceMappingURL=ruta.service.js.map