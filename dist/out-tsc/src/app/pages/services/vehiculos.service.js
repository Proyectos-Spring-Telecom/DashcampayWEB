import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let VehiculosService = class VehiculosService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/vehiculos`;
    }
    obtenerVehiculosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/vehiculos/${page}/${pageSize}`);
    }
    obtenerVehiculos() {
        return this.http.get(`${environment.API_SECURITY}/vehiculos/list`);
    }
    obtenerVehiculosByCliente(idCliente) {
        const base = environment.API_SECURITY;
        const u1 = `${base}/vehiculos/clientes/${idCliente}`;
        const ensureData = (resp) => {
            const arr = Array.isArray(resp) ? resp :
                Array.isArray(resp?.data) ? resp.data :
                    Array.isArray(resp?.vehiculos) ? resp.vehiculos :
                        [];
            return { data: arr };
        };
        return this.http.get(u1).pipe(map(ensureData), catchError(() => of({ data: [] })));
    }
    agregarVehiculo(data) {
        return this.http.post(environment.API_SECURITY + '/vehiculos', data);
    }
    eliminarVehiculo(idVehiculo) {
        return this.http.delete(environment.API_SECURITY + '/vehiculos/' + idVehiculo);
    }
    obtenerVehiculo(idVehiculo) {
        return this.http.get(environment.API_SECURITY + '/vehiculos/' + idVehiculo);
    }
    actualizarVehiculo(idVehiculo, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/vehiculos/` + idVehiculo, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    obtenerTiposCombustible() {
        return this.http.get(`${environment.API_SECURITY}/cat-tipo-combustible/list`).pipe(catchError(error => throwError(() => error)));
    }
};
VehiculosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VehiculosService);
export { VehiculosService };
//# sourceMappingURL=vehiculos.service.js.map