import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  obtenerRecaudacionDiariaRuta(filtros: {
    fechaInicio: string;
    fechaFin: string;
    idCliente?: number | null;
    idRegion?: number | null;
    idRuta?: number | null;
    idVariante?: number | null;
  }): Observable<any> {
    return this.http.post(
      `${environment.API_SECURITY}/reportes/recaudacion-diaria-ruta`,
      filtros
    );
  }

  obtenerRecaudacionPorOperador(filtros: {
    fechaInicio: string;
    fechaFin: string;
    idCliente?: number | null;
    idOperador?: number | null;
  }): Observable<any> {
    return this.http.post(
      `${environment.API_SECURITY}/reportes/recaudacion-por-operador`,
      filtros
    );
  }

  obtenerRecaudacionPorVehiculo(filtros: {
    fechaInicio: string;
    fechaFin: string;
    idCliente?: number | null;
    idVehiculo?: number | null;
    idRuta?: number | null;
  }): Observable<any> {
    return this.http.post(
      `${environment.API_SECURITY}/reportes/recaudacion-por-vehiculo`,
      filtros
    );
  }

  obtenerRecaudacionPorDispositivo(filtros: {
    fechaInicio: string;
    fechaFin: string;
    idCliente?: number | null;
    idValidador?: number | null;
    idInstalacion?: number | null;
  }): Observable<any> {
    return this.http.post(
      `${environment.API_SECURITY}/reportes/recaudacion-por-dispositivo`,
      filtros
    );
  }

  /** Transacciones débit (validaciones detalladas) */
  obtenerTransaccionesDebit(filtros: {
    fechaInicio: string;
    fechaFin: string;
    idCliente?: number | null;
    idZona?: number | null;
    idRuta?: number | null;
    idVariante?: number | null;
  }): Observable<any> {
    return this.http.post(
      `${environment.API_SECURITY}/reportes/transacciones-debito`,
      filtros
    );
  }
}

