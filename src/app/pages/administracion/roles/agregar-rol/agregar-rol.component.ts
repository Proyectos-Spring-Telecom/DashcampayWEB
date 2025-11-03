import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { RolesService } from 'src/app/pages/services/roles.service';

@Component({
  selector: 'vex-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrl: './agregar-rol.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarRolComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public rolForm!: FormGroup;
  public idRol!: number;
  public title = 'Agregar Rol';
  public listaClientes: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private rolService: RolesService,
    private activatedRouted: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService,
  ) { }

  ngOnInit(): void {
    // this.obtenerClientes()
    this.initForm();
    this.activatedRouted.params.subscribe(
      (params) => {
        this.idRol = params['idRol'];
        if (this.idRol) {
          this.title = 'Actualizar Rol';
          this.obtenerRol();
        }
      }
    )
  }

  obtenerRol() {
    this.rolService.obtenerRole(this.idRol).subscribe(
      (response: any) => {
        this.rolForm.patchValue({
          nombre: response.data.nombre,
          descripcion: response.data.descripcion,
          idRol: response.data.idRol,
        });
      }
    );
  }

  initForm() {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idRol) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.rolForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.rolForm.controls).forEach((key) => {
        const control = this.rolForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
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

    // quitar id antes de enviar (consistencia con otros módulos)
    if (this.rolForm.contains('id')) this.rolForm.removeControl('id');

    const payload = this.rolForm.getRawValue();

    this.rolService.agregarRole(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo rol de manera exitosa.',
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
          message: String(error ?? 'Ocurrió un error al agregar el rol.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.rolForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.rolForm.controls).forEach((key) => {
        const control = this.rolForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
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
      return; // salir si es inválido
    }

    const payload = this.rolForm.getRawValue();

    this.rolService.actualizarRoles(this.idRol, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del rol se actualizaron correctamente.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      (error) => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: String(error ?? 'Ocurrió un error al actualizar el rol.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }


  regresar() {
    this.router.navigateByUrl('/administracion/roles')
  }

}
