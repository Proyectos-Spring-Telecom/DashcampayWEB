import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor(private http: HttpClient) { }

  obtenerMantenimientoVehicularData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-vehicular/${page}/${pageSize}`);
  }

  obtenerMantenimientoKilometrajeData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-kilometraje/${page}/${pageSize}`);
  }

  obtenerMantenimientoCombustibleData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-combustible/${page}/${pageSize}`);
  }

  obtenerTalleres(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/talleres/list`);
  }

  obtenerReferenciasServicio(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/cat-referencia-servicio/list`);
  }

  obtenerInstalaciones(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/instalaciones/list`);
  }

  agregarMantenimientoVehicular(data: FormData): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/mantenimiento-vehicular`, data);
  }

  agregarMantenimientoKilometraje(data: any): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/mantenimiento-kilometraje`, data);
  }

  obtenerTiposCombustible(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/cat-tipo-combustible/list`);
  }

  obtenerOperadores(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/operadores/list`);
  }

  agregarMantenimientoCombustible(data: any): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/mantenimiento-combustible`, data);
  }

  // Métodos GET por ID
  obtenerMantenimientoVehicularPorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}`);
  }

  obtenerMantenimientoKilometrajePorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}`);
  }

  obtenerMantenimientoCombustiblePorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/mantenimiento-combustible/${id}`);
  }

  // Métodos PATCH para actualizar
  actualizarMantenimientoVehicular(id: number, data: FormData): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}`, data);
  }

  actualizarMantenimientoKilometraje(id: number, data: any): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}`, data);
  }

  actualizarMantenimientoCombustible(id: number, data: any): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}`, data);
  }

  activarMantenimientoKilometraje(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}/activar`, {});
  }

  desactivarMantenimientoKilometraje(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-kilometraje/${id}/desactivar`, {});
  }

  activarMantenimientoCombustible(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}/activar`, {});
  }

  desactivarMantenimientoCombustible(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-combustible/${id}/desactivar`, {});
  }

  actualizarEstatusMantenimientoVehicular(id: number, estatus: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/estatus/${estatus}`, {});
  }

  activarMantenimientoVehicular(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/activar`, {});
  }

  desactivarMantenimientoVehicular(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/mantenimiento-vehicular/${id}/desactivar`, {});
  }

  obtenerVerificacionesData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/verificaciones?page=${page}&limit=${pageSize}`);
  }

  agregarVerificacion(data: FormData): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/verificaciones`, data);
  }

  obtenerTiposVerificacion(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/cat-tipo-verificaciones/list`);
  }

  activarVerificacion(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}/activar`, {});
  }

  desactivarVerificacion(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}/desactivar`, {});
  }

  obtenerVerificacionPorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/verificaciones/${id}`);
  }

  actualizarVerificacion(id: number, data: FormData): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/verificaciones/${id}`, data);
  }

  obtenerIncidentesData(page: number, limit: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/incidentes?page=${page}&limit=${limit}`);
  }

  obtenerIncidentePorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/incidentes/${id}`);
  }

  agregarIncidente(data: FormData): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/incidentes`, data);
  }

  actualizarIncidente(id: number, data: FormData): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}`, data);
  }

  actualizarEstatusIncidente(id: number, estatus: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/estatus/${estatus}`, {});
  }

  activarIncidente(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/activar`, {});
  }

  desactivarIncidente(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/incidentes/${id}/desactivar`, {});
  }
}

