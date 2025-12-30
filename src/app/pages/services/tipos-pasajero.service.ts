import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TiposPasajeroService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  obtenerTiposPasajero(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/catpasajero/list`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  updateEstatus(id: number, estatus: number): Observable<string> {
    const url = `${environment.API_SECURITY}/catpasajero/estatus/${id}`;
    const body = { estatus };
    return this.http.patch(url, body, { responseType: 'text' }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  obtenerTiposDescuento(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/cattipodescuento/list`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  agregarTipoPasajero(data: any): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/catpasajero`, data).pipe(
      catchError(error => throwError(() => error))
    );
  }

  actualizarTipoPasajero(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.API_SECURITY}/catpasajero/${id}`, data).pipe(
      catchError(error => throwError(() => error))
    );
  }

  obtenerTipoPasajero(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/catpasajero/${id}`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  obtenerTiposPasajeroList(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/catpasajero/list`).pipe(
      catchError(error => throwError(() => error))
    );
  }
}

