import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContadoraService {

  constructor(private http: HttpClient) { }

  obtenerContadora(): Observable<any> {
    return this.http.get<any>(`${environment.API_SECURITY}/api/contadora`);
  }

  actualizarEstado(id: number, estado: number): Observable<any> {
    const url = `${environment.API_SECURITY}/contadores/actualizar/estado/${id}`;
    const body = { estadoActual: estado };
    return this.http.patch(url, body).pipe(
      catchError(error => throwError(() => error))
    );
  }
  
}
