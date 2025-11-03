import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { PasajerosService } from 'src/app/pages/services/pasajeros.service';

@Component({
  selector: 'vex-agregar-pasajero',
  templateUrl: './agregar-pasajero.component.html',
  styleUrl: './agregar-pasajero.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarPasajeroComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');

  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public pasajeroForm!: FormGroup;
  public idPasajero!: number;
  public title = 'Agregar Pasajero';
  public showCorreo: boolean = true;
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private pasajService: PasajerosService,
    private activatedRouted: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.activatedRouted.params.subscribe(
      (params) => {
        this.idPasajero = params['idPasajero'];
        if (this.idPasajero) {
          this.title = 'Actualizar Pasajero';
          this.obtenerPasajeroID();
          this.showCorreo = false;
          this.pasajeroForm.get('correo')?.disable();
        }
      }
    )
  }

  obtenerPasajeroID() {
    this.pasajService.obtenerPasajero(this.idPasajero).subscribe(
      (response: any) => {
        const fecha = response.data.fechaNacimiento
          ? response.data.fechaNacimiento.split('T')[0]
          : '';
        this.pasajeroForm.patchValue({
          estatus: response.data.estatus,
          nombre: response.data.nombre,
          apellidoPaterno: response.data.apellidoPaterno,
          apellidoMaterno: response.data.apellidoMaterno,
          telefono: response.data.telefono,
          correo: response.data.correo,
          fechaNacimiento: fecha,
        });
      }
    );
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  initForm() {
    this.pasajeroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      estatus: [1, Validators.required],
    });
  }

  submit() {
    if (this.idPasajero) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.pasajeroForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        nombre: 'Nombre',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        fechaNacimiento: 'Fecha de Nacimiento',
        telefono: 'Teléfono',
        estatus: 'Estatus',
        correo: 'Correo Electrónico',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.pasajeroForm.controls).forEach((key) => {
        const control = this.pasajeroForm.get(key);
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
          Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    // igual que en dispositivos: quitar 'id' antes de leer payload
    this.pasajeroForm.removeControl('id');
    this.pasajService.agregarPasajero(this.pasajeroForm.value).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo pasajero de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
        this.regresar();
      },
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al agregar el pasajero.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.pasajeroForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        fechaNacimiento: 'Fecha de Nacimiento',
        telefono: 'Teléfono',
        estatus: 'Estatus',
        correo: 'Correo Electrónico',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.pasajeroForm.controls).forEach((key) => {
        const control = this.pasajeroForm.get(key);
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
          Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    // Excluir "correo" SIEMPRE del payload
    const { correo, ...payload } = this.pasajeroForm.value;

    // Normalizar fechaNacimiento a YYYY-MM-DD
    if (payload.fechaNacimiento instanceof Date) {
      const y = payload.fechaNacimiento.getFullYear();
      const m = String(payload.fechaNacimiento.getMonth() + 1).padStart(2, '0');
      const d = String(payload.fechaNacimiento.getDate()).padStart(2, '0');
      payload.fechaNacimiento = `${y}-${m}-${d}`;
    } else if (typeof payload.fechaNacimiento === 'string' && payload.fechaNacimiento.includes('T')) {
      payload.fechaNacimiento = payload.fechaNacimiento.split('T')[0];
    }

    this.pasajService.actualizarPasajero(this.idPasajero, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del pasajero se actualizaron correctamente.',
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
          message: 'Ocurrió un error al actualizar el pasajero.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  regresar() {
    this.router.navigateByUrl('/administracion/pasajeros')
  }

}
