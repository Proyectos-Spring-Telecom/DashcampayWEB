import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { MonederosServices } from 'src/app/pages/services/monederos.service';
import { TransaccionesService } from 'src/app/pages/services/transacciones.service';
import { NetpayService } from 'src/app/pages/services/netpay.service';
import { NetpayDialogComponent } from '../netpay-dialog/netpay-dialog.component';

declare const NetPay: any;

@Component({
  selector: 'vex-generar-transaccion',
  templateUrl: './generar-transaccion.component.html',
  styleUrl: './generar-transaccion.component.scss',
  animations: [fadeInRight400ms]
})
export class GenerarTransaccionComponent implements OnInit {
  step = 1;
  layoutCtrl = new UntypedFormControl('fullwidth');
  query = '';
  monederos = [
    {
      id: 1,
      numeroSerie: 'MX-001-AB',
      pasajero: 'Andrea López',
      cliente: 'Transp. Aurora',
      saldo: 320.5
    },
    {
      id: 2,
      numeroSerie: 'MX-002-CD',
      pasajero: 'Luis Pérez',
      cliente: 'Transp. Aurora',
      saldo: 150.0
    },
    {
      id: 3,
      numeroSerie: 'MX-003-EF',
      pasajero: 'María Ruiz',
      cliente: 'Logística Sol',
      saldo: 980.75
    }
  ];
  monederosFiltrados = [...this.monederos];
  monederosPaginados: any[] = [];
  pageIndex = 0;
  pageSize = 9;
  monto = 0;
  montoView = '';
  metodoPago: 'efectivo' | 'tarjeta' = 'efectivo';
  tarjetaSeleccionada: any = null;

  constructor(
    private moneService: MonederosServices,
    private transaccionService: TransaccionesService,
    private alerts: AlertsService,
    private route: Router,
    private dialog: MatDialog,
    private netpayService: NetpayService
  ) {}

  ngOnInit() {
    this.aplicarPaginacion();
    this.obtenerMonederos();
  }

  irPaso(n: 1 | 2) {
    this.step = n;
  }

  onPage(e: { pageIndex: number; pageSize: number }) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.aplicarPaginacion();
  }

  private aplicarPaginacion() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.monederosPaginados = this.monederosFiltrados.slice(start, end);
  }

  seleccionarMonedero(m: any) {
    this.monederoSeleccionado = m;
    this.metodoPago = 'efectivo'; // Resetear a efectivo al cambiar de monedero
    this.tarjetaSeleccionada = null; // Limpiar tarjeta seleccionada
    
    // Si el monedero tiene customerId, obtener las tarjetas
    if (m?.customerId !== null && m?.customerId !== undefined) {
      this.obtenerTarjetas(m.customerId);
    } else {
      this.tarjetasCliente = [];
    }
  }

  seleccionarTarjeta(tarjeta: any) {
    this.tarjetaSeleccionada = tarjeta;
    this.metodoPago = 'tarjeta'; // Cambiar automáticamente a método de pago con tarjeta
  }

  obtenerTarjetas(customerId: string) {
    this.cargandoTarjetas = true;
    this.netpayService.obtenerTarjetasCliente(customerId).subscribe(
      (response: any) => {
        this.cargandoTarjetas = false;
        // Las tarjetas vienen en el array paymentSources
        if (response?.paymentSources && Array.isArray(response.paymentSources)) {
          this.tarjetasCliente = response.paymentSources;
        } else if (Array.isArray(response)) {
          this.tarjetasCliente = response;
        } else if (response?.data?.paymentSources && Array.isArray(response.data.paymentSources)) {
          this.tarjetasCliente = response.data.paymentSources;
        } else {
          this.tarjetasCliente = [];
        }
      },
      (error: any) => {
        this.cargandoTarjetas = false;
        this.tarjetasCliente = [];
      }
    );
  }

  private sanitizeNumber(str: string): number {
    const clean = (str || '').replace(/[^\d.]/g, '');
    const parts = clean.split('.');
    const fixed =
      parts.length > 1 ? parts[0] + '.' + parts.slice(1).join('') : parts[0];
    const n = parseFloat(fixed);
    return isNaN(n) ? 0 : n;
  }

  onInputMonto(ev: Event) {
    const val = (ev.target as HTMLInputElement).value;
    const n = this.sanitizeNumber(val);
    this.monto = Math.max(0, n);
    this.montoView = val;
  }

  agregarMonto(v: number) {
    this.monto = (this.monto || 0) + v;
    this.montoView = this.monto.toFixed(2);
  }

  key(k: string) {
    if (k === '00' && this.montoView) {
      this.montoView += '00';
    } else {
      this.montoView += k;
    }
    this.monto = this.sanitizeNumber(this.montoView);
  }

  borrar() {
    this.montoView = (this.montoView || '').slice(0, -1);
    this.monto = this.sanitizeNumber(this.montoView);
  }

  cargando = false;

  private toLocalISOString(d = new Date()): string {
    const pad = (n: number) => String(Math.trunc(Math.abs(n))).padStart(2, '0');
    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    const offsetMin = -d.getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const offH = pad(Math.trunc(Math.abs(offsetMin) / 60));
    const offM = pad(Math.trunc(Math.abs(offsetMin) % 60));
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}${sign}${offH}:${offM}`;
  }

  private getNumeroSerieMonedero(): string {
    return (
      this.monederoSeleccionado?.numeroSerie ||
      this.monederoSeleccionado?.serie ||
      ''
    );
  }

  confirmarRecarga() {
    if (this.cargando) return;
    if (!this.monederoSeleccionado || !this.monto || this.monto <= 0) return;

    // Validar que si el método de pago es tarjeta, debe haber una tarjeta seleccionada
    if (this.metodoPago === 'tarjeta' && !this.tarjetaSeleccionada) {
      this.alerts.open({
        type: 'warning',
        title: '¡Atención!',
        message: 'Por favor seleccione una tarjeta para realizar el pago.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    // Determinar idMetodoPago: 1 para efectivo, 3 para tarjeta
    const idMetodoPago = this.metodoPago === 'efectivo' ? 1 : 3;

    const payload = {
      idTipoTransaccion: 1,
      monto: Number(this.monto),
      latitudInicial: null,
      longitudInicial: null,
      numeroSerieMonedero: this.getNumeroSerieMonedero(),
      numeroSerieValidador: null,
      idMetodoPago: idMetodoPago
    };
    this.agregar(payload);
  }

  pagarConTarjeta() {
    if (this.cargando) return;
    if (!this.monederoSeleccionado || !this.monto || this.monto <= 0) {
      this.alerts.open({
        type: 'warning',
        title: '¡Atención!',
        message: 'Por favor seleccione un monedero e ingrese un monto válido.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    // Cargar NetpayJS y mostrar el formulario
    this.loadNetpayScript().then(() => {
      this.abrirDialogNetpay();
    }).catch(error => {
      this.alerts.open({
        type: 'error',
        title: '¡Error!',
        message: 'No se pudo cargar el sistema de pagos. Por favor, intente nuevamente.',
        confirmText: 'Entendido',
        backdropClose: false
      });
    });
  }

  private loadNetpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar si NetPay ya está cargado
      if ((window as any).NetPay) {
        resolve();
        return;
      }

      // Verificar si el script ya existe
      const existing = document.getElementById('netpay-sdk') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }

      // Crear y cargar el script
      const script = document.createElement('script');
      script.id = 'netpay-sdk';
      script.type = 'text/javascript';
      script.src = 'https://docs.netpay.mx/cdn/v1.3/netpay.min.js';
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  private abrirDialogNetpay() {
    const dialogRef = this.dialog.open(NetpayDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        monto: this.monto,
        monederoSerie: this.getNumeroSerieMonedero()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.token && result.deviceFingerPrint && result.deviceInformation) {
        // Asegurar que el token esté completamente procesado antes de crear el cliente
        setTimeout(() => {
          // Solo crear el cliente si es necesario, NO procesar el pago (charge)
          this.crearClienteSiEsNecesario(result.token, result.deviceFingerPrint, result.deviceInformation, result.cvv);
        }, 100); // Pequeño delay para asegurar que todo esté procesado
      }
    });
  }

  private crearClienteSiEsNecesario(token: string, deviceFingerPrint: string, deviceInformation: any, cvv?: string) {
    // Validar que el token esté completamente listo antes de proceder
    if (!token || token.trim() === '') {
      this.alerts.open({
        type: 'error',
        title: '¡Error!',
        message: 'El token de la tarjeta no está disponible. Por favor, intente nuevamente.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    this.cargando = true;

    // Verificar si el monedero tiene customerId null
    const monedero = this.monederoSeleccionado;
    const customerId = monedero?.customerId;

    // Si customerId es null, crear el cliente (solo después de que el token esté listo)
    if (customerId === null || customerId === undefined) {
      this.crearClienteNetpay(token, monedero).subscribe(
        (response: any) => {
          // Obtener el customerId de la respuesta
          const nuevoCustomerId = response?.customerId || response?.data?.customerId || response?.id;
          
          if (nuevoCustomerId) {
            // Actualizar el customerId en el monedero seleccionado
            if (this.monederoSeleccionado) {
              this.monederoSeleccionado.customerId = nuevoCustomerId;
            }
            
            this.cargando = false;
            
            // Obtener las tarjetas actualizadas
            this.obtenerTarjetas(nuevoCustomerId);
            
            this.alerts.open({
              type: 'success',
              title: '¡Operación Exitosa!',
              message: 'Tarjeta tokenizada y cliente creado correctamente.',
              confirmText: 'Entendido',
              backdropClose: false
            });
          } else {
            this.cargando = false;
            
            this.alerts.open({
              type: 'warning',
              title: '¡Atención!',
              message: 'Cliente creado pero no se pudo obtener el ID del cliente. Por favor, verifique manualmente.',
              confirmText: 'Entendido',
              backdropClose: false
            });
          }
        },
        (error: any) => {
          this.cargando = false;
          
          // Construir mensaje de error detallado
          let errorMessage = 'Ocurrió un error al crear el cliente en Netpay.';
          
          if (error?.error) {
            if (typeof error.error === 'string') {
              errorMessage = error.error;
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            } else if (error.error?.error) {
              errorMessage = error.error.error;
            } else {
              errorMessage = JSON.stringify(error.error, null, 2);
            }
          } else if (error?.message) {
            errorMessage = error.message;
          }
          
          // Mostrar también el status code
          const statusInfo = error?.status ? ` (Status: ${error.status})` : '';
          errorMessage = `${errorMessage}${statusInfo}`;
          
          this.alerts.open({
            type: 'error',
            title: '¡Error!',
            message: errorMessage,
            confirmText: 'Entendido',
            backdropClose: false
          });
        }
      );
    } else {
      // Si ya tiene customerId, actualizar el token del cliente
      this.actualizarTokenCliente(customerId, token, cvv).subscribe(
        (response: any) => {
          this.cargando = false;
          
          // Obtener las tarjetas actualizadas después de agregar la nueva tarjeta
          this.obtenerTarjetas(customerId);
          
          this.alerts.open({
            type: 'success',
            title: '¡Operación Exitosa!',
            message: 'Tarjeta tokenizada y actualizada correctamente.',
            confirmText: 'Entendido',
            backdropClose: false
          });
        },
        (error: any) => {
          this.cargando = false;
          
          // Construir mensaje de error detallado
          let errorMessage = 'Ocurrió un error al actualizar el token de la tarjeta.';
          
          if (error?.error) {
            if (typeof error.error === 'string') {
              errorMessage = error.error;
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            } else if (error.error?.error) {
              errorMessage = error.error.error;
            } else {
              errorMessage = JSON.stringify(error.error, null, 2);
            }
          } else if (error?.message) {
            errorMessage = error.message;
          }
          
          const statusInfo = error?.status ? ` (Status: ${error.status})` : '';
          errorMessage = `${errorMessage}${statusInfo}`;
          
          this.alerts.open({
            type: 'error',
            title: '¡Error!',
            message: errorMessage,
            confirmText: 'Entendido',
            backdropClose: false
          });
        }
      );
    }
  }

  private actualizarTokenCliente(customerId: string, token: string, cvv?: string) {
    const tokenData = {
      customerId: String(customerId),
      token: token,
      preAuth: false,
      cvv2: cvv || ''
    };

    return this.netpayService.actualizarTokenCliente(customerId, tokenData);
  }

  private crearClienteNetpay(token: string, monedero: any) {
    // Mapear los datos del monedero a los campos requeridos
    const customerData = {
      firstName: monedero?.pasajeroNombre || '',
      lastName: monedero?.pasajeroApellidoPaterno || '',
      email: monedero?.correoUsuario || '',
      phone: monedero?.telefonoUsuario || '',
      token: token,
      idPasajero: monedero?.idPasajero || null
    };

    return this.netpayService.crearCliente(customerData);
  }

  cancelar() {
    this.step = 1;
    this.query = '';
    this.monto = 0;
    this.montoView = '';
    this.monederoSeleccionado = null;
    this.monederosFiltrados = [...this.monederos];
    this.pageIndex = 0;
    this.aplicarPaginacion();
  }

  public listaMonederos: any[] = [];
  public listaMonederosFiltrados: any[] = [];
  monederoSeleccionado: any = null;
  tarjetasCliente: any[] = [];
  cargandoTarjetas: boolean = false;

  obtenerMonederos() {
    this.moneService.obtenerMonederos().subscribe((response) => {
      this.listaMonederos = response?.data ?? [];
      this.listaMonederosFiltrados = [...this.listaMonederos];
    });
  }

  filtrarMonederos() {
    const q = (this.query || '').toLowerCase().trim();
    if (!q) {
      this.listaMonederosFiltrados = [...this.listaMonederos];
    } else {
      this.listaMonederosFiltrados = this.listaMonederos.filter((m) =>
        `${m.numeroSerie || m.serie || ''} ${m.nombreCompletoPasajero || ''} ${m.clienteNombre || m.nombreCompletoCliente || ''}`
          .toLowerCase()
          .includes(q)
      );
    }
  }

  regresar() {
    this.route.navigateByUrl('/administracion/transacciones');
  }

  agregar(payload: any) {
    this.cargando = true;
    this.transaccionService.agregarRecarga(payload).subscribe(
      (_response: any) => {
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se realizo la recarga de manera correcta.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
        this.cargando = false;
        this.regresar();
      },
      (_error: any) => {
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al agregar la transacción.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
        this.cargando = false;
      }
    );
  }

  getNombrePasajero(m: any): string {
    if (!m) return '—';
    const nombreCompleto = (m.nombreCompletoPasajero || '').trim();
    const porPartes = (
      (m.pasajeroNombre || '') +
      ' ' +
      (m.pasajeroApellidoPaterno || '') +
      ' ' +
      (m.pasajeroApellidoMaterno || '')
    )
      .replace(/\s+/g, ' ')
      .trim();
    const simple = (m.pasajero || '').trim();

    const final = nombreCompleto || porPartes || simple;
    return final || '—'; 
  }

  hasPasajero(m: any): boolean {
    if (!m) return false;
    return !!(
      (m.nombreCompletoPasajero && m.nombreCompletoPasajero.trim()) ||
      (m.pasajero && m.pasajero.trim()) ||
      (
        (m.pasajeroNombre || '') +
        (m.pasajeroApellidoPaterno || '') +
        (m.pasajeroApellidoMaterno || '')
      ).trim()
    );
  }
}
