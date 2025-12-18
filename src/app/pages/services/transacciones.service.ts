import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: HttpClient) { }

  obtenerTransaccionesData(page: number, limit: number, fechaInicio: string | null = null, fechaFin: string | null = null): Observable<any> {
		const body = {
			page,
			limit,
			fechaInicio,
			fechaFin
		};
		return this.http.post(`${environment.API_SECURITY}/transacciones/paginado`, body);
	}

  obtenerTransaccion(): Observable<any> {
		return this.http.get(`${environment.API_SECURITY}/transacciones/list`);
	}
  
  agregarTransaccion(data: any) {
    return this.http.post(environment.API_SECURITY + '/transacciones', data);
  }

  agregarRecarga(data: any) {
    return this.http.post(environment.API_SECURITY + '/transacciones/recarga', data);
  }

  
}