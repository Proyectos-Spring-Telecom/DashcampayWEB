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
   * Realiza un pago con token usando la API de Dashcam
   * Endpoint: /netpay/payment/saved-card
   * @param paymentData Datos del pago con estructura completa para Dashcam
   * @returns Observable con la respuesta del pago
   */
  procesarPago(paymentData: {
    amount: number;
    description: string;
    currency: string;
    referenceId: string;
    token: string;
    sessionId: string;
    deviceFingerPrint: string;
    saveCard: string;
    billing: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street1: string;
        street2?: string;
      };
      merchantReferenceCode?: string;
    };
    deviceInformation: {
      deviceChannel: string;
      httpBrowserColorDepth: string;
      httpBrowserJavaEnabled: string;
      httpBrowserJavaScriptEnabled: string;
      httpBrowserLanguage: string;
      httpBrowserScreenHeight: string;
      httpBrowserScreenWidth: string;
      httpBrowserTimeDifference: string;
    };
  }): Observable<any> {
    return this.http.post(`${environment.API_SECURITY}/netpay/payment/saved-card`, paymentData);
  }
}

