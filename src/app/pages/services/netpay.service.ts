import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetpayService {

  // Llaves de Netpay
  private publicKey = 'pk_netpay_JGFtQNUFIENMlhkoBXdgiozmQ';
  private secretKey = 'sk_netpay_VcNiErfSqYMnxOZToQxxNYLFORdUHJZpyeFeZFoGsccny';
  
  // URL base de la API de Netpay (sandbox o producción)
  // Según la documentación: https://docs.netpay.com.mx/v1.2.1/reference/checkout-custom
  private apiUrl = 'https://api.netpay.com.mx/v1';

  constructor(private http: HttpClient) { }

  /**
   * Tokeniza una tarjeta de crédito/débito
   * Documentación: https://docs.netpay.com.mx/v1.2.1/reference/checkout-custom#tokenizar-tarjeta
   * @param cardData Datos de la tarjeta (número, cvv, mes, año, nombre)
   * @returns Observable con el token de la tarjeta
   */
  tokenizarTarjeta(cardData: {
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    holder_name: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.publicKey}`
    });

    // Endpoint para tokenizar según la documentación de Netpay
    // La documentación indica que se debe usar la llave pública para tokenizar
    return this.http.post(`${this.apiUrl}/tokens`, cardData, { headers });
  }

  /**
   * Crea un cliente en Netpay
   * Endpoint: /netpay/customers
   * @param customerData Datos del cliente
   * @returns Observable con la respuesta de creación del cliente
   */
  crearCliente(customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    token: string;
  }): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/netpay/customers`, customerData);
  }

  /**
   * Obtiene las tarjetas de un cliente
   * Endpoint: /netpay/customers?customerId=
   * @param customerId ID del cliente
   * @returns Observable con las tarjetas del cliente
   */
  obtenerTarjetasCliente(customerId: string): Observable<any> {
    return this.http.get(`${environment.API_SECURITY}/netpay/customers?customerId=${customerId}`);
  }

  /**
   * Actualiza el token de una tarjeta para un cliente existente
   * Endpoint: /netpay/customers/{customerId}/token
   * @param customerId ID del cliente
   * @param tokenData Datos del token (customerId, token, preAuth, cvv2)
   * @returns Observable con la respuesta de actualización
   */
  actualizarTokenCliente(customerId: string, tokenData: {
    customerId: string;
    token: string;
    preAuth: boolean;
    cvv2: string;
  }): Observable<any> {
    return this.http.put(`${environment.API_SECURITY}/netpay/customers/${customerId}/token`, tokenData);
  }

}

