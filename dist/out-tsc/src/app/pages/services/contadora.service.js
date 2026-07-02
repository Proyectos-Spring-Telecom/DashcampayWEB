import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let ContadoraService = class ContadoraService {
    constructor(http) {
        this.http = http;
    }
    obtenerContadora() {
        return this.http.get(`${environment.API_SECURITY}/api/contadora`);
    }
    actualizarEstado(id, estado) {
        const url = `${environment.API_SECURITY}/contadores/actualizar/estado/${id}`;
        const body = { estadoActual: estado };
        return this.http.patch(url, body).pipe(catchError(error => throwError(() => error)));
    }
};
ContadoraService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ContadoraService);
export { ContadoraService };
//# sourceMappingURL=contadora.service.js.map