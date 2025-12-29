import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

declare const NetPay: any;

export interface NetpayDialogData {
  monto: number;
  monederoSerie: string;
}

export interface NetpayDialogResult {
  token: string;
  deviceFingerPrint: string;
  deviceInformation: any;
  cvv?: string;
}

@Component({
  selector: 'vex-netpay-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title class="d-flex align-items-center justify-content-between">
      <span>
        <mat-icon class="me-2">credit_card</mat-icon>
        Agregar Tarjeta
      </span>
      <button mat-icon-button (click)="cancelar()" type="button" aria-label="Cerrar">
        <mat-icon>close</mat-icon>
      </button>
    </h2>

    <mat-dialog-content>
      <div class="resumen-pago mb-4 p-3 bg-light rounded">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span><strong>Monto a pagar:</strong></span>
          <span class="h5 mb-0 text-primary">{{ data.monto | currency:'MXN':'symbol':'1.2-2' }}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span><strong>Monedero:</strong></span>
          <span>{{ data.monederoSerie }}</span>
        </div>
      </div>

      <div id="netpay-form-container"></div>
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="p-3 border-top">
      <button mat-button (click)="cancelar()" type="button" [disabled]="loading">
        Cancelar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    #netpay-form-container {
      min-height: 400px;
    }
  `]
})
export class NetpayDialogComponent implements OnInit, OnDestroy {
  loading = false;
  private deviceFingerPrint: string = '';

  constructor(
    private dialogRef: MatDialogRef<NetpayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NetpayDialogData,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // Esperar un momento para que el DOM esté listo
    setTimeout(() => {
      this.initNetpayForm();
    }, 100);
  }

  ngOnDestroy(): void {
    // Limpiar el formulario de Netpay si existe
    const container = document.getElementById('netpay-form-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  private initNetpayForm(): void {
    this.ngZone.runOutsideAngular(() => {
      try {
        // Configurar Netpay
        NetPay.setApiKey('pk_netpay_JGFtQNUFIENMlhkoBXdgiozmQ');
        NetPay.setSandboxMode(true);

        // Generar device fingerprint antes de crear el formulario
        this.deviceFingerPrint = NetPay.form.generateDeviceFingerPrint();

        // Callback de éxito
        const successCallback = (e: any) => {
          this.ngZone.run(() => {
            try {
              this.loading = true;
              
              // La respuesta de Netpay puede venir en diferentes formatos
              // La API responde con 201 Created y el objeto puede venir como:
              // - e.message.data (objeto con token, lastFourDigits, etc.)
              // - e.message (objeto directo con token)
              // - e (objeto directo con token)
              console.log('Respuesta completa de tokenización:', JSON.stringify(e, null, 2));
              
              // Intentar obtener el token de diferentes ubicaciones posibles
              let responseData = null;
              let token = null;
              
              // Según la respuesta real, e.message.data es un STRING JSON que necesita ser parseado
              if (e?.message?.data) {
                try {
                  // Si es un string, parsearlo
                  if (typeof e.message.data === 'string') {
                    responseData = JSON.parse(e.message.data);
                    token = responseData?.token;
                    console.log('Token encontrado en e.message.data (parseado de string):', token);
                  }
                  // Si ya es un objeto
                  else if (typeof e.message.data === 'object' && e.message.data?.token) {
                    responseData = e.message.data;
                    token = e.message.data.token;
                    console.log('Token encontrado en e.message.data (objeto):', token);
                  }
                } catch (parseError) {
                  console.error('Error al parsear e.message.data:', parseError);
                }
              }
              
              // Si aún no encontramos el token, intentamos otras ubicaciones
              if (!token) {
                // Intentar e.message.token directamente
                if (e?.message?.token) {
                  token = e.message.token;
                  responseData = e.message;
                  console.log('Token encontrado en e.message.token:', token);
                }
                // Intentar e.token directamente
                else if (e?.token) {
                  token = e.token;
                  responseData = e;
                  console.log('Token encontrado en e.token:', token);
                }
              }
              
              // Obtener deviceInformation de e.message.deviceInformation o usar NetPay.form.deviceInformation()
              let deviceInformation = e?.message?.deviceInformation || null;
              if (!deviceInformation) {
                try {
                  deviceInformation = NetPay.form.deviceInformation();
                  console.log('Device Information obtenida de NetPay.form.deviceInformation()');
                } catch (err) {
                  console.warn('No se pudo obtener deviceInformation de NetPay.form.deviceInformation()');
                }
              } else {
                console.log('Device Information obtenida de e.message.deviceInformation');
              }

              console.log('=== RESUMEN DE EXTRACCIÓN ===');
              console.log('ResponseData:', responseData);
              console.log('Token extraído:', token);
              console.log('Token existe?', !!token);
              console.log('Device FingerPrint:', this.deviceFingerPrint);
              console.log('Device Information:', deviceInformation);
              console.log('Device Information existe?', !!deviceInformation);

              // Verificar si tenemos token y deviceInformation
              if (!token) {
                this.loading = false;
                console.error('=== ERROR: NO SE ENCONTRÓ EL TOKEN ===');
                console.error('Estructura completa recibida:', JSON.stringify(e, null, 2));
                alert('Error: No se pudo extraer el token de la respuesta. Por favor, revise la consola para más detalles.');
                return;
              }

              if (!deviceInformation) {
                this.loading = false;
                console.error('=== ERROR: NO SE PUDO OBTENER DEVICE INFORMATION ===');
                console.error('Intentando obtener deviceInformation nuevamente...');
                try {
                  deviceInformation = NetPay.form.deviceInformation();
                  console.log('Device Information obtenida en segundo intento:', deviceInformation);
                } catch (err) {
                  console.error('Error al obtener deviceInformation:', err);
                  alert('Error: No se pudo obtener la información del dispositivo. Por favor, intente nuevamente.');
                  return;
                }
              }

              // Intentar obtener el CVV del formulario antes de cerrar
              let cvv = '';
              try {
                // Intentar obtener el CVV del formulario de Netpay
                const cardData = NetPay.form.getCardData();
                if (cardData && cardData.cvv) {
                  cvv = cardData.cvv;
                  console.log('CVV obtenido del formulario:', cvv);
                } else {
                  // Intentar obtenerlo del DOM directamente (último recurso)
                  const cvvInput = document.querySelector('input[name="cvv"], input[placeholder*="CVV"], input[placeholder*="cvv"], #netpay-cvv') as HTMLInputElement;
                  if (cvvInput && cvvInput.value) {
                    cvv = cvvInput.value;
                    console.log('CVV obtenido del DOM:', cvv);
                  }
                }
              } catch (err) {
                console.warn('No se pudo obtener el CVV del formulario:', err);
              }

              // Si llegamos aquí, tenemos todo lo necesario
              console.log('=== ÉXITO: PROCESANDO TOKENIZACIÓN ===');
              console.log('CVV capturado:', cvv ? '***' : 'No disponible');
              this.dialogRef.close({
                token: token,
                deviceFingerPrint: this.deviceFingerPrint,
                deviceInformation: deviceInformation,
                cvv: cvv
              });
            } catch (error) {
              this.loading = false;
              console.error('Error en callback de éxito:', error);
              alert('Error al procesar la respuesta de tokenización. Por favor, intente nuevamente.');
            }
          });
        };

        // Callback de error
        const errorCallback = (e: any) => {
          this.ngZone.run(() => {
            this.loading = false;
            console.error('Error en tokenización:', e);
            const errorMessage = e?.message || 'Ocurrió un error al procesar la tarjeta. Por favor, verifique los datos.';
            alert(errorMessage);
          });
        };

        // Generar el formulario
        NetPay.form.generate(
          'netpay-form-container',
          successCallback,
          errorCallback,
          {
            title: 'Agregar tarjeta',
            submitText: 'Pagar'
          }
        );
      } catch (error) {
        this.ngZone.run(() => {
          console.error('Error al inicializar Netpay:', error);
          alert('Error al cargar el formulario de pago. Por favor, recargue la página.');
        });
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

