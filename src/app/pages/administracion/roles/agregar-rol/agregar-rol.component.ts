import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { RolesService } from 'src/app/pages/services/roles.service';
import {
  bloquearCaracteresEspecialesNombre,
  NOMBRE_SIN_ESPECIALES_REGEX,
  onPasteNombreSinEspeciales
} from 'src/app/core/validators/nombre-sin-especiales';

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
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(NOMBRE_SIN_ESPECIALES_REGEX)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
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

  private getValidationMessages(): string[] {
    const mensajes: string[] = [];
    const nombre = this.rolForm.get('nombre');
    const descripcion = this.rolForm.get('descripcion');

    if (nombre?.errors?.['required']) {
      mensajes.push('Nombre');
    } else if (nombre?.errors?.['maxlength']) {
      mensajes.push('El nombre no puede exceder 100 caracteres');
    } else if (nombre?.errors?.['pattern']) {
      mensajes.push('El nombre no permite caracteres especiales');
    }

    if (descripcion?.errors?.['required']) {
      mensajes.push('Descripción');
    } else if (descripcion?.errors?.['maxlength']) {
      mensajes.push('La descripción no puede exceder 255 caracteres');
    }

    return mensajes;
  }

  private async showValidationAlert(): Promise<void> {
    this.rolForm.markAllAsTouched();
    const mensajes = this.getValidationMessages();
    const lista = mensajes
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
          Revisa los siguientes campos:<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
      confirmText: 'Entendido',
      backdropClose: false,
    });
  }

  private getErrorMessage(err: any): string {
    const body = err?.error ?? err;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (typeof body?.message === 'string' && body.message.trim()) {
      return body.message;
    }

    if (Array.isArray(body?.message)) {
      return body.message.filter(Boolean).join('\n');
    }

    if (body?.message && typeof body.message === 'object') {
      const lines: string[] = [];
      for (const key of Object.keys(body.message)) {
        const val = body.message[key];
        if (Array.isArray(val)) lines.push(val.join(', '));
        else if (typeof val === 'string') lines.push(val);
      }
      if (lines.length) return lines.join('\n');
    }

    if (body?.errors) {
      const e = body.errors;
      if (Array.isArray(e)) return e.filter(Boolean).join('\n');
      if (typeof e === 'object') {
        const lines: string[] = [];
        for (const key of Object.keys(e)) {
          const val = e[key];
          if (Array.isArray(val)) lines.push(val.join(', '));
          else if (typeof val === 'string') lines.push(val);
        }
        if (lines.length) return lines.join('\n');
      }
    }

    if (typeof err?.message === 'string' && err.message.trim() && !err.message.startsWith('Http failure')) {
      return err.message;
    }

    return 'Ocurrió un error al procesar el rol.';
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.rolForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;
      await this.showValidationAlert();
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
          message: this.getErrorMessage(error),
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
      await this.showValidationAlert();
      return;
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
          message: this.getErrorMessage(error),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }


  onPasteNombre(event: ClipboardEvent): void {
    onPasteNombreSinEspeciales(event, this.rolForm.get('nombre'));
  }

  bloquearCaracteresEspecialesNombre = bloquearCaracteresEspecialesNombre;

  regresar() {
    this.router.navigateByUrl('/administracion/roles')
  }

}
