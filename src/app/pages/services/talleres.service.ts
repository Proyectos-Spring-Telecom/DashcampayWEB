import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  constructor(private http: HttpClient) { }

  obtenerTalleresData(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/talleres/${page}/${pageSize}`);
  }

  obtenerTalleres(): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/talleres/list`);
  }

  obtenerTallerPorId(id: number): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/talleres/${id}`);
  }

  agregarTaller(data: any): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/talleres`, data);
  }

  actualizarTaller(id: number, data: any): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/talleres/${id}`, data);
  }

  activarTaller(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/talleres/activar/${id}`, {});
  }

  desactivarTaller(id: number): Observable<any> {
    return this.http.patch(`${environment.API_SECURITY}/talleres/desactivar/${id}`, {});
  }
}

