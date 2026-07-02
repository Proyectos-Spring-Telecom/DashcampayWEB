import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let NetpayService = class NetpayService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Crea un cliente en Netpay
     * Endpoint: /netpay/customers
     * @param customerData Datos del cliente
     * @returns Observable con la respuesta de creación del cliente
     */
    crearCliente(customerData) {
        return this.http.post(`${environment.API_SECURITY}/netpay/customers`, customerData);
    }
    /**
     * Obtiene las tarjetas de un cliente
     * Endpoint: /netpay/customers?customerId=
     * @param customerId ID del cliente
     * @returns Observable con las tarjetas del cliente
     */
    obtenerTarjetasCliente(customerId) {
        return this.http.get(`${environment.API_SECURITY}/netpay/customers?customerId=${customerId}`);
    }
    /**
     * Actualiza el token de una tarjeta para un cliente existente
     * Endpoint: /netpay/customers/{customerId}/token
     * @param customerId ID del cliente
     * @param tokenData Datos completos del token y cliente
     * @returns Observable con la respuesta de actualización
     */
    actualizarTokenCliente(customerId, tokenData) {
        return this.http.put(`${environment.API_SECURITY}/netpay/customers/${customerId}/token`, tokenData);
    }
    /**
     * Elimina una tarjeta de un cliente
     * Endpoint: /netpay/customers/{customerId}/cards/{tokenCard}
     * @param customerId ID del cliente
     * @param tokenCard Token de la tarjeta a eliminar
     * @returns Observable con la respuesta de eliminación
     */
    eliminarTarjeta(customerId, tokenCard) {
        return this.http.delete(`${environment.API_SECURITY}/netpay/customers/${customerId}/cards/${tokenCard}`);
    }
    /**
     * Obtiene las colonias por código postal
     * Endpoint: https://dashcampay.com/apidev/direcciones/CP/{codigoPostal}
     * @param codigoPostal Código postal (5 dígitos)
     * @returns Observable con las colonias disponibles
     */
    obtenerColoniasPorCP(codigoPostal) {
        return this.http.get(`${environment.API_SECURITY}/direcciones/CP/${codigoPostal}`);
    }
};
NetpayService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NetpayService);
export { NetpayService };
//# sourceMappingURL=netpay.service.js.map