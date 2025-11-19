import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { DispositivosService } from 'src/app/pages/services/dispositivos.service';

@Component({
  selector: 'vex-agregar-dispositivo',
  templateUrl: './agregar-dispositivo.component.html',
  styleUrl: './agregar-dispositivo.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarDispositivoComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
  isLoading: boolean = false;
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public dispositivoForm!: FormGroup;
  public idValidador!: number;
  public title = 'Agregar Validador';
  public listaClientes: any;
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  public idClienteUser: number;
  public idRolUser: number;

  get isAdmin(): boolean { return this.idRolUser === 1; }

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private dispoService: DispositivosService,
    private activatedRouted: ActivatedRoute,
    private clieService: ClientesService,
    private users: AuthenticationService,
    private alerts: AlertsService,
  ) {
    const user = this.users.getUser();
    this.idClienteUser = Number(user?.idCliente);
    this.idRolUser = Number(user?.rol?.id);
  }

  ngOnInit(): void {
    this.obtenerClientes()
    this.initForm()
    this.activatedRouted.params.subscribe(
      (params) => {
        this.idValidador = params['idValidador'];
        if (this.idValidador) {
          this.title = 'Actualizar Validador';
          this.obtenerDispositivoID();
        }
      }
    )
  }

  initForm() {
    this.dispositivoForm = this.fb.group({
      numeroSerie: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      idCliente: [this.isAdmin ? null : this.idClienteUser, Validators.required],
      estatus: [1, Validators.required],
    });

    if (!this.isAdmin) {
      this.dispositivoForm.get('idCliente')?.disable({ onlySelf: true });
    }
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe((response) => {
      this.listaClientes = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c?.id ?? c?.Id ?? c?.ID)
      }));

      if (!this.isAdmin) {
        this.dispositivoForm.get('idCliente')?.setValue(this.idClienteUser, { emitEvent: false });
      }
    });
  }

  obtenerDispositivoID() {
    this.dispoService.obtenerDispositivo(this.idValidador).subscribe((response: any) => {
      const raw = Array.isArray(response?.data) ? response.data[0] :
        response?.dispositivo ?? response?.data ?? response ?? {};

      const get = (o: any, keys: string[]) => { for (const k of keys) if (o?.[k] != null) return o[k]; return null; };

      const numeroSerie = get(raw, ['numeroSerie', 'NumeroSerie', 'numeroserie']);
      const marca = get(raw, ['marca', 'Marca']);
      const modelo = get(raw, ['modelo', 'Modelo']);
      const est = get(raw, ['estatus', 'Estatus']);
      const idCli = get(raw, ['idCliente', 'idcliente', 'IdCliente', 'IDCliente']);

      this.dispositivoForm.patchValue({
        numeroSerie: numeroSerie ?? '',
        marca: marca ?? '',
        modelo: modelo ?? '',
        estatus: est != null && !Number.isNaN(Number(est)) ? Number(est) : 1,
        idCliente: this.isAdmin ? (idCli != null && idCli !== '' ? Number(idCli) : null)
          : this.idClienteUser,
      });

      if (!this.isAdmin) {
        this.dispositivoForm.get('idCliente')?.disable({ onlySelf: true });
      }
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idValidador) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.dispositivoForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        numeroSerie: 'Número de Serie',
        marca: 'Marca',
        modelo: 'Modelo',
        idCliente: 'Cliente',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.dispositivoForm.controls).forEach(key => {
        const control = this.dispositivoForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
      });

      const lista = camposFaltantes.map((campo, index) => `
      <div style="padding:8px 12px;border-left:4px solid #d9534f;background:#caa8a8;text-align:center;margin-bottom:8px;border-radius:4px;">
        <strong style="color:#b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Ops!',
        message: `
        <p style="text-align:center;font-size:15px;margin-bottom:16px;color:white">
          Los siguientes campos obligatorios están vacíos.<br>
        </p>
        <div style="max-height:350px;overflow-y:auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    const payload = this.dispositivoForm.getRawValue();
    this.dispositivoForm.removeControl('id');

    this.dispoService.agregarDispositivo(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo validador de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      (error: any) => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: error.error,
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.dispositivoForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        numeroSerie: 'Número de Serie',
        marca: 'Marca',
        modelo: 'Modelo',
        idCliente: 'Cliente',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.dispositivoForm.controls).forEach(key => {
        const control = this.dispositivoForm.get(key);
        if (control?.invalid && control.errors?.['required']) {
          camposFaltantes.push(etiquetas[key] || key);
        }
      });

      const lista = camposFaltantes.map((campo, index) => `
      <div style="padding:8px 12px;border-left:4px solid #d9534f;background:#caa8a8;text-align:center;margin-bottom:8px;border-radius:4px;">
        <strong style="color:#b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `).join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Ops!',
        message: `
        <p style="text-align:center;font-size:15px;margin-bottom:16px;color:white">
          Los siguientes campos obligatorios están vacíos.<br>
        </p>
        <div style="max-height:350px;overflow-y:auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    const payload = this.dispositivoForm.getRawValue();

    this.dispoService.actualizarDispositivo(this.idValidador, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del validador se actualizaron correctamente.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });

        this.regresar();
      },
      (error: any) => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: error.error,
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  regresar() {
    this.route.navigateByUrl('/administracion/validadores');
  }

}
