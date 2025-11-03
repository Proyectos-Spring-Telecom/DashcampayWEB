import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  constructor(private http: HttpClient) { }

  obtenerDispositivosData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/validadores/${page}/${pageSize}`);
  }

  obtenerDispositivos(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/validadores/list`);
  }

  obtenerDispositivosByCliente(idCliente: any): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/validadores/clientes/${idCliente}`);
  }

  agregarDispositivo(data: FormData) {
    return this.http.post(environment.API_SECURITY + '/validadores', data);
  }

  eliminarDispositivo(idDispositivo: Number) {
    return this.http.delete(environment.API_SECURITY + '/validadores/' + idDispositivo);
  }

  obtenerDispositivo(idDispositivo: number): Observable<any> {
    return this.http.get<any>(environment.API_SECURITY + '/validadores/' + idDispositivo);
  }

  actualizarDispositivo(idDispositivo: number, saveForm: any): Observable<any> {
    return this.http.put(`${environment.API_SECURITY}/validadores/` + idDispositivo, saveForm);
  }

  private apiUrl = `${environment.API_SECURITY}/validadores`;
  updateEstatus(id: number, estatus: number): Observable<string> {
    const url = `${this.apiUrl}/estatus/${id}`;
    const body = { estatus };
    return this.http.patch(url, body, { responseType: 'text' }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}