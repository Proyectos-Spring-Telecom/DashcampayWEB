import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let TurnoService = class TurnoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/turnos`;
    }
    obtenerTurnosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/turnos/${page}/${pageSize}`);
    }
    obtenerTurnos() {
        return this.http.get(`${environment.API_SECURITY}/turnos/list`);
    }
    agregarTurno(data) {
        return this.http.post(environment.API_SECURITY + '/turnos', data);
    }
    eliminarTurno(idTurno) {
        return this.http.delete(environment.API_SECURITY + '/turnos/' + idTurno);
    }
    obtenerTurno(idTurno) {
        return this.http.get(environment.API_SECURITY + '/turnos/' + idTurno);
    }
    actualizarTurno(idTurno, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/turnos/` + idTurno, saveForm);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
};
TurnoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TurnoService);
export { TurnoService };
//# sourceMappingURL=turnos.service.js.map