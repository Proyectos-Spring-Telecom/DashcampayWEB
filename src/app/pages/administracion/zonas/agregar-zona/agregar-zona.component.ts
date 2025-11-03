import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { ZonasService } from 'src/app/pages/services/zonas.service';

@Component({
  selector: 'vex-agregar-zona',
  templateUrl: './agregar-zona.component.html',
  styleUrl: './agregar-zona.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarZonaComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');

  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public zonasForm!: FormGroup;
  public idZona!: number;
  public title = 'Agregar Zona';
  loadingDependientes = false;
  listaClientes: any[] = [];
  listaDipositivos: any[] = [];
  listaBlueVox: any[] = [];
  listaVehiculos: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  public idClienteUser!: number;
  public idRolUser!: number;
  get isAdmin(): boolean { return this.idRolUser === 1; }

  constructor(
    private fb: FormBuilder,
    private zonService: ZonasService,
    private activatedRouted: ActivatedRoute,
    private route: Router,
    private clieService: ClientesService,
    private users: AuthenticationService,
    private alerts: AlertsService,
  ) {
    const user = this.users.getUser();
    this.idClienteUser = Number(user?.idCliente);
    this.idRolUser = Number(user?.rol?.id);
  }

  ngOnInit(): void {
    this.initForm();
    this.obtenerClientes()

    this.activatedRouted.params.subscribe(
      (params) => {
        this.idZona = params['idZona'];
        if (this.idZona) {
          this.title = 'Actualizar Zona';
          this.obtenerZona();
        }
      }
    )
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe((response: any) => {
      this.listaClientes = this.normalizeId(response?.data);

      if (!this.isAdmin) {
        this.zonasForm.get('idCliente')?.setValue(this.idClienteUser, { emitEvent: false });
      }
    });
  }

  obtenerZona() {
    this.zonService.obtenerZona(this.idZona).subscribe({
      next: (response: any) => {
        const data = Array.isArray(response?.data) ? response.data[0] : response?.data;

        if (!data) {
          // console.warn('No se recibió información de la región.');
          return;
        }

        const idCliSrv = Number(
          (data as any)?.idCliente ??
          (data as any)?.idCliente2?.id ??
          null
        );

        this.zonasForm.patchValue(
          {
            nombre: data?.nombre ?? '',
            descripcion: data?.descripcion ?? '',
            idCliente: this.isAdmin ? idCliSrv : this.idClienteUser,
          },
          { emitEvent: false }
        );

        if (!this.isAdmin) {
          this.zonasForm.get('idCliente')?.disable({ onlySelf: true });
        } else {
          this.zonasForm.get('idCliente')?.enable({ onlySelf: true });
        }
      },
      error: (err) => {
        // console.error('Error al obtener región:', err);
      },
    });
  }

  private normalizeId<T extends { id: any }>(arr: T[] = []): (T & { id: number })[] {
    return arr.map((x: any) => ({ ...x, id: Number(x.id) }));
  }

  initForm() {
    this.zonasForm = this.fb.group({
      estatus: [1, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idCliente: [this.isAdmin ? null : this.idClienteUser, Validators.required],
    });

    if (!this.isAdmin) {
      this.zonasForm.get('idCliente')?.disable({ onlySelf: true });
    }
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idZona) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.zonasForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
        idCliente: 'Cliente',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.zonasForm.controls).forEach(key => {
        const control = this.zonasForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
      });

      const lista = camposFaltantes.map((campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');

      await this.alerts.open({
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
      });
      return;
    }

    // igual que en otros módulos: quitar 'id' antes de leer el payload
    this.zonasForm.removeControl('id');
    const payload = this.zonasForm.getRawValue();

    this.zonService.agregarZona(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó una nueva zona de manera exitosa.',
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
          message: String(error),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.zonasForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
        idCliente: 'Cliente',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.zonasForm.controls).forEach(key => {
        const control = this.zonasForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
      });

      const lista = camposFaltantes.map((campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');

      await this.alerts.open({
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
      });
      return; // importante salir si es inválido
    }

    const payload = this.zonasForm.getRawValue();

    // corregido: usar actualizarZona en vez de agregarZona para update
    this.zonService.actualizarZona(this.idZona, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos de la zona se actualizaron correctamente.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al actualizar la zona.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }


  regresar() {
    this.route.navigateByUrl('/administracion/zonas');
  }


}
