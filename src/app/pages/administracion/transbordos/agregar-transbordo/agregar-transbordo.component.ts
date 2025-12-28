import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { TransbordosService } from 'src/app/pages/services/transbordos.service';

@Component({
  selector: 'vex-agregar-transbordo',
  templateUrl: './agregar-transbordo.component.html',
  styleUrl: './agregar-transbordo.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarTransbordoComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public transbordoForm!: FormGroup;
  public title = 'Agregar Transbordo';
  public listaClientes: any[] = [];
  public listaTiposDescuento: any[] = [];
  public idTransbordo!: number;

  constructor(
    private fb: FormBuilder,
    private transbordosService: TransbordosService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private alerts: AlertsService,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.obtenerClientes();
    this.obtenerTiposDescuento();
    this.activatedRoute.params.subscribe((params) => {
      this.idTransbordo = params['id'];
      if (this.idTransbordo) {
        this.title = 'Actualizar Transbordo';
        this.obtenerTransbordo();
      }
    });
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe((response) => {
      this.listaClientes = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c?.id ?? c?.Id ?? c?.ID),
      }));
    });
  }

  obtenerTiposDescuento() {
    this.transbordosService.obtenerTiposDescuento().subscribe({
      next: (response) => {
        this.listaTiposDescuento = response.data || response || [];
      },
      error: (err) => {
        console.error('Error al obtener tipos de descuento:', err);
        this.listaTiposDescuento = [];
      }
    });
  }

  initForm() {
    this.transbordoForm = this.fb.group({
      nombre: [null, Validators.required],
      tiempo: [null, Validators.required],
      numeroTransbordos: [1, Validators.required],
      idCliente: [null, Validators.required],
      idTipoDescuento: [null],
      detalles: this.fb.array([
        this.createDetalleGroup()
      ])
    });
  }

  obtenerTransbordo() {
    this.transbordosService.obtenerTransbordo(this.idTransbordo).subscribe({
      next: (response: any) => {
        const data = response?.data;
        const item = Array.isArray(data) ? data[0] : data;

        if (!item) { return; }

        // Limpiar el array de detalles
        while (this.detallesFormArray.length !== 0) {
          this.detallesFormArray.removeAt(0);
        }

        // Agregar los detalles del item
        if (item.detalles && Array.isArray(item.detalles)) {
          item.detalles.forEach((detalle: any, index: number) => {
            this.detallesFormArray.push(this.fb.group({
              costo: [detalle.costo, Validators.required],
              nroTransbordo: [detalle.nroTransbordo || index + 1, Validators.required]
            }));
          });
        } else {
          // Si no hay detalles, agregar uno vacío
          this.detallesFormArray.push(this.createDetalleGroup());
        }

        // Convertir IDs a números
        const idClienteNum = item.idCliente ? Number(item.idCliente) : null;
        const idTipoDescuentoNum = item.idTipoDescuento ? Number(item.idTipoDescuento) : null;

        const dto = {
          nombre: item.nombre || null,
          tiempo: item.tiempo ? Number(item.tiempo) : null,
          numeroTransbordos: item.numeroTransbordos ? Number(item.numeroTransbordos) : this.detallesFormArray.length,
          idCliente: idClienteNum,
          idTipoDescuento: idTipoDescuentoNum,
        };

        this.transbordoForm.patchValue(dto, { emitEvent: false });
        this.actualizarNumeroTransbordos();
      },
      error: (e) => {
        console.error('Error obtenerTransbordo', e);
      }
    });
  }

  createDetalleGroup(): FormGroup {
    return this.fb.group({
      costo: [null, Validators.required],
      nroTransbordo: [1, Validators.required]
    });
  }

  get detallesFormArray(): FormArray {
    return this.transbordoForm.get('detalles') as FormArray;
  }

  agregarDetalle() {
    const nuevoNroTransbordo = this.detallesFormArray.length + 1;
    this.detallesFormArray.push(this.fb.group({
      costo: [null, Validators.required],
      nroTransbordo: [nuevoNroTransbordo, Validators.required]
    }));
    this.actualizarNumeroTransbordos();
  }

  eliminarDetalle(index: number) {
    if (this.detallesFormArray.length > 1) {
      this.detallesFormArray.removeAt(index);
      // Actualizar números de transbordo
      this.detallesFormArray.controls.forEach((control, i) => {
        control.patchValue({ nroTransbordo: i + 1 });
      });
      this.actualizarNumeroTransbordos();
    } else {
      this.alerts.open({
        type: 'info',
        title: '¡Ops!',
        message: 'Debe existir al menos un detalle.',
        confirmText: 'Entendido',
        backdropClose: false,
      });
    }
  }

  actualizarNumeroTransbordos() {
    this.transbordoForm.patchValue({
      numeroTransbordos: this.detallesFormArray.length
    }, { emitEvent: false });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.transbordoForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        tiempo: 'Tiempo',
        numeroTransbordos: 'Número de Transbordos',
        idCliente: 'Cliente',
        idTipoDescuento: 'Tipo Descuento',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.transbordoForm.controls).forEach((key) => {
        if (key !== 'detalles') {
          const control = this.transbordoForm.get(key);
          if (control?.invalid && control.errors?.['required']) {
            camposFaltantes.push(etiquetas[key] || key);
          }
        }
      });

      // Validar detalles
      const detallesArray = this.transbordoForm.get('detalles') as FormArray;
      detallesArray.controls.forEach((control, index) => {
        if (control.invalid) {
          camposFaltantes.push(`Detalle ${index + 1} - Costo`);
        }
      });

      const lista = camposFaltantes
        .map(
          (campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>`
        )
        .join('');

      this.alerts.open({
        type: 'warning',
        title: '¡Ops!',
        message: `
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Hay campos obligatorios sin completar.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      }).then(() => {
        this.submitButton = 'Guardar';
        this.loading = false;
      });
      return;
    }

    const payload = this.transbordoForm.getRawValue();
    
    // Asegurar que numeroTransbordos sea igual a la cantidad de detalles
    payload.numeroTransbordos = this.detallesFormArray.length;

    if (this.idTransbordo) {
      this.actualizar(payload);
    } else {
      this.agregar(payload);
    }
  }

  agregar(payload: any) {
    this.transbordosService.agregarTransbordo(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo transbordo de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      (error) => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: String(error ?? 'Ocurrió un error al agregar el transbordo.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  actualizar(payload: any) {
    this.transbordosService.actualizarTransbordo(this.idTransbordo, payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se actualizó el transbordo de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      (error) => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: String(error ?? 'Ocurrió un error al actualizar el transbordo.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  regresar() {
    this.route.navigateByUrl('/administracion/transbordos');
  }
}

