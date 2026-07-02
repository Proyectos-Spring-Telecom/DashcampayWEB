import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
let UsuariosService = class UsuariosService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.API_SECURITY}/usuarios`;
    }
    obtenerUsuarios() {
        return this.http.get(`${environment.API_SECURITY}/usuarios/list`);
    }
    obtenerUsuariosData(page, pageSize) {
        return this.http.get(`${environment.API_SECURITY}/usuarios/${page}/${pageSize}`);
    }
    obtenerUsuariosRolOperador(idCliente) {
        return this.http.get(`${environment.API_SECURITY}/usuarios/list/rol/operador/${idCliente}`);
    }
    agregarUsuario(data) {
        return this.http.post(environment.API_SECURITY + '/usuarios', data);
    }
    eliminarUsuario(idUsuario) {
        return this.http.delete(environment.API_SECURITY + '/usuarios/' + idUsuario);
    }
    obtenerUsuario(idUsuario) {
        return this.http.get(environment.API_SECURITY + '/usuarios/' + idUsuario);
    }
    actualizarUsuario(idUsuario, saveForm) {
        return this.http.put(`${environment.API_SECURITY}/usuarios/` + idUsuario, saveForm);
    }
    uploadFile(data) {
        return this.http.post(`${environment.API_SECURITY}/s3/upload`, data);
    }
    actualizarContrasena(idUsuario, data) {
        return this.http.put(`${environment.API_SECURITY}/usuarios/actualizar/contrasena/` + idUsuario, data);
    }
    subirFotoPerfil(formData) {
        return this.http.post(`${environment.API_SECURITY}/usuarios/foto-perfil`, formData);
    }
    updateEstatus(id, estatus) {
        const url = `${this.apiUrl}/estatus/${id}`;
        const body = { estatus };
        return this.http.patch(url, body, { responseType: 'text' }).pipe(catchError(error => throwError(() => error)));
    }
    solicitarCambioContrasena(data) {
        return this.http.post(environment.API_SECURITY + '/login/usuario/recuperar/acceso', data, { responseType: 'text' });
    }
    cambioContrasena(data, token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(environment.API_SECURITY + '/login/cambiar/accesso', data, {
            headers,
            responseType: 'text' // <- igual que el otro: texto plano
        });
    }
};
UsuariosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsuariosService);
export { UsuariosService };
//# sourceMappingURL=usuarios.service.js.map