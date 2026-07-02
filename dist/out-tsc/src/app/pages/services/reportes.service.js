import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let ReportesService = class ReportesService {
    constructor(http) {
        this.http = http;
    }
    obtenerRecaudacionDiariaRuta(filtros) {
        return this.http.post(`${environment.API_SECURITY}/reportes/recaudacion-diaria-ruta`, filtros);
    }
    obtenerRecaudacionPorOperador(filtros) {
        return this.http.post(`${environment.API_SECURITY}/reportes/recaudacion-por-operador`, filtros);
    }
    obtenerRecaudacionPorVehiculo(filtros) {
        return this.http.post(`${environment.API_SECURITY}/reportes/recaudacion-por-vehiculo`, filtros);
    }
    obtenerRecaudacionPorDispositivo(filtros) {
        return this.http.post(`${environment.API_SECURITY}/reportes/recaudacion-por-dispositivo`, filtros);
    }
    /** Transacciones débit (validaciones detalladas) */
    obtenerTransaccionesDebit(filtros) {
        return this.http.post(`${environment.API_SECURITY}/reportes/transacciones-debito`, filtros);
    }
};
ReportesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ReportesService);
export { ReportesService };
//# sourceMappingURL=reportes.service.js.map