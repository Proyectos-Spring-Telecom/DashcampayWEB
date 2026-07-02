import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let MantenimientosService = class MantenimientosService {
    constructor(http) {
        this.http = http;
    }
    obtenerMantenimientoVehicularData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-vehicular/${page}/${pageSize}`);
    }
    obtenerMantenimientoKilometrajeData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-kilometraje/${page}/${pageSize}`);
    }
    obtenerMantenimientoCombustibleData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-combustible/${page}/${pageSize}`);
    }
    obtenerTalleres() {
        return this.http.get(`${environment.API_SECURITY}/talleres/list`);
    }
    obtenerReferenciasServicio() {
        return this.http.get(`${environment.API_SECURITY}/cat-referencia-servicio/list`);
    }
    obtenerInstalaciones() {
        return this.http.get(`${environment.API_SECURITY}/instalaciones/list`);
    }
    agregarMantenimientoVehicular(data) {
        return this.http.post(`${environment.API_SECURITY}/mantenimiento-vehicular`, data);
    }
    agregarMantenimientoKilometraje(data) {
        return this.http.post(`${environment.API_SECURITY}/mantenimiento-kilometraje`, data);
    }
    obtenerTiposCombustible() {
        return this.http.get(`${environment.API_SECURITY}/cat-tipo-combustible/list`);
    }
    obtenerOperadores() {
        return this.http.get(`${environment.API_SECURITY}/operadores/list`);
    }
    agregarMantenimientoCombustible(data) {
        return this.http.post(`${environment.API_SECURITY}/mantenimiento-combustible`, data);
    }
    // Métodos GET por ID
    obtenerMantenimientoVehicularPorId(id) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}`);
    }
    obtenerMantenimientoKilometrajePorId(id) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}`);
    }
    obtenerMantenimientoCombustiblePorId(id) {
        return this.http.get(`${environment.API_SECURITY}/mantenimiento-combustible/${id}`);
    }
    // Métodos PATCH para actualizar
    actualizarMantenimientoVehicular(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}`, data);
    }
    actualizarMantenimientoKilometraje(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}`, data);
    }
    actualizarMantenimientoCombustible(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}`, data);
    }
    activarMantenimientoKilometraje(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}/activar`, {});
    }
    desactivarMantenimientoKilometraje(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}/desactivar`, {});
    }
    activarMantenimientoCombustible(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}/activar`, {});
    }
    desactivarMantenimientoCombustible(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}/desactivar`, {});
    }
    actualizarEstatusMantenimientoVehicular(id, estatus) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/estatus/${estatus}`, {});
    }
    activarMantenimientoVehicular(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/activar`, {});
    }
    desactivarMantenimientoVehicular(id) {
        return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/desactivar`, {});
    }
    obtenerVerificacionesData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/verificaciones?page=${page}&limit=${pageSize}`);
    }
    agregarVerificacion(data) {
        return this.http.post(`${environment.API_SECURITY}/verificaciones`, data);
    }
    obtenerTiposVerificacion() {
        return this.http.get(`${environment.API_SECURITY}/cat-tipo-verificaciones/list`);
    }
    activarVerificacion(id) {
        return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}/activar`, {});
    }
    desactivarVerificacion(id) {
        return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}/desactivar`, {});
    }
    obtenerVerificacionPorId(id) {
        return this.http.get(`${environment.API_SECURITY}/verificaciones/${id}`);
    }
    actualizarVerificacion(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}`, data);
    }
    obtenerIncidentesData(page, limit) {
        return this.http.get(`${environment.API_SECURITY}/incidentes?page=${page}&limit=${limit}`);
    }
    obtenerIncidentePorId(id) {
        return this.http.get(`${environment.API_SECURITY}/incidentes/${id}`);
    }
    agregarIncidente(data) {
        return this.http.post(`${environment.API_SECURITY}/incidentes`, data);
    }
    actualizarIncidente(id, data) {
        return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}`, data);
    }
    actualizarEstatusIncidente(id, estatus) {
        return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/estatus/${estatus}`, {});
    }
    activarIncidente(id) {
        return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/activar`, {});
    }
    desactivarIncidente(id) {
        return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/desactivar`, {});
    }
};
MantenimientosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MantenimientosService);
export { MantenimientosService };
//# sourceMappingURL=mantenimientos.service.js.map