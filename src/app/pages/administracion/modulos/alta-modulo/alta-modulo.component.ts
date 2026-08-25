import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ModulosService } from 'src/app/pages/services/modulos.service';
import {
  bloquearCaracteresEspecialesNombre,
  NOMBRE_SIN_ESPECIALES_REGEX
} from 'src/app/core/validators/nombre-sin-especiales';

@Component({
  selector: 'vex-alta-modulo',
  templateUrl: './alta-modulo.component.html',
  styleUrl: './alta-modulo.component.scss',
  animations: [fadeInRight400ms],
})
export class AltaModuloComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public moduloForm!: FormGroup;
  public idModulo!: number;
  public title = 'Agregar Módulo';
  public listaClientes: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private moduService: ModulosService,
    private activatedRouted: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService,
  ) { }

  ngOnInit(): void {
    // this.obtenerClientes()
    this.initForm();
    this.activatedRouted.params.subscribe(
      (params) => {
        this.idModulo = params['idModulo'];
        if (this.idModulo) {
          this.title = 'Actualizar Módulo';
          this.obtenerModulo();
        }
      }
    )
  }

  obtenerModulo() {
    this.moduService.obtenerModulo(this.idModulo).subscribe(
      (response: any) => {
        this.moduloForm.patchValue({
          nombre: response.data.nombre,
          descripcion: response.data.descripcion,
          idModulo: response.data.idModulo,
        });
      }
    );
  }

  initForm() {
    this.moduloForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(NOMBRE_SIN_ESPECIALES_REGEX)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(NOMBRE_SIN_ESPECIALES_REGEX)]],
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idModulo) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.moduloForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
        idModulo: 'Módulo',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.moduloForm.controls).forEach(key => {
        const control = this.moduloForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
        if (control?.errors?.['maxlength']) {
          const max = control.errors['maxlength'].requiredLength;
          camposFaltantes.push(`${etiquetas[key] || key}: máximo ${max} caracteres`);
        }
        if (control?.errors?.['pattern']) {
          camposFaltantes.push(`${etiquetas[key] || key}: no permite caracteres especiales`);
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

    // quitar id antes de enviar (consistente con otros módulos)
    if (this.moduloForm.contains('id')) this.moduloForm.removeControl('id');

    const payload = this.moduloForm.getRawValue();

    this.moduService.agregarModulo(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo módulo de manera exitosa.',
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

    if (this.moduloForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        nombre: 'Nombre',
        descripcion: 'Descripción',
        idModulo: 'Módulo',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.moduloForm.controls).forEach(key => {
        const control = this.moduloForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
        if (control?.errors?.['maxlength']) {
          const max = control.errors['maxlength'].requiredLength;
          camposFaltantes.push(`${etiquetas[key] || key}: máximo ${max} caracteres`);
        }
        if (control?.errors?.['pattern']) {
          camposFaltantes.push(`${etiquetas[key] || key}: no permite caracteres especiales`);
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
      return; // salir si es inválido
    }

    const payload = this.moduloForm.getRawValue();

    this.moduService.actualizarModulo(this.idModulo, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del módulo se actualizaron correctamente.',
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

  private getErrorMessage(err: any): string {
    const body = err?.error ?? err;
    let message = '';

    if (typeof body === 'string' && body.trim()) {
      message = body;
    } else if (typeof body?.message === 'string' && body.message.trim()) {
      message = body.message;
    } else if (Array.isArray(body?.message)) {
      message = body.message.filter(Boolean).join('\n');
    } else if (body?.message && typeof body.message === 'object') {
      const lines: string[] = [];
      for (const key of Object.keys(body.message)) {
        const val = body.message[key];
        if (Array.isArray(val)) lines.push(val.join(', '));
        else if (typeof val === 'string') lines.push(val);
      }
      if (lines.length) message = lines.join('\n');
    } else if (body?.errors) {
      const e = body.errors;
      if (Array.isArray(e)) message = e.filter(Boolean).join('\n');
      else if (typeof e === 'object') {
        const lines: string[] = [];
        for (const key of Object.keys(e)) {
          const val = e[key];
          if (Array.isArray(val)) lines.push(val.join(', '));
          else if (typeof val === 'string') lines.push(val);
        }
        if (lines.length) message = lines.join('\n');
      }
    } else if (typeof err?.message === 'string' && err.message.trim() && !err.message.startsWith('Http failure')) {
      message = err.message;
    }

    if (!message) {
      return 'Ocurrió un error al procesar el módulo.';
    }

    if (/el m[oó]dulo ya existe/i.test(message.trim())) {
      return 'Ya existe un módulo registrado con este nombre';
    }

    return message;
  }

  onTextoKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      if (key === 'c' || key === 'v' || key === 'x') {
        event.preventDefault();
        return;
      }
    }
    bloquearCaracteresEspecialesNombre(event);
  }

  bloquearCopiarPegar(event: Event): void {
    event.preventDefault();
  }

  regresar() {
    this.router.navigateByUrl('/administracion/modulos')
  }
}