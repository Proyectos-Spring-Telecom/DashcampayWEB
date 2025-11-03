import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  forkJoin,
  of,
  shareReplay
} from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { DispositivoBluevoxService } from 'src/app/pages/services/dispositivobluevox.service';
import { DispositivosService } from 'src/app/pages/services/dispositivos.service';
import { InstalacionesService } from 'src/app/pages/services/instalaciones.service';
import { VehiculosService } from 'src/app/pages/services/vehiculos.service';

enum EstadoComponente {
  INACTIVO = 0,
  DISPONIBLE = 1,
  ASIGNADO = 2,
  EN_MANTENIMIENTO = 3,
  DANADO = 4,
  RETIRADO = 5
}

@Component({
  selector: 'vex-agregar-instalacion',
  templateUrl: './agregar-instalacion.component.html',
  styleUrl: './agregar-instalacion.component.scss',
  animations: [fadeInRight400ms]
})
export class AgregarInstalacionComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  submitButton = 'Guardar';
  loading = false;
  instalacionesForm!: FormGroup;
  idInstalacion!: number;
  title = 'Agregar Instalación';

  loadingDependientes = false;
  listaClientes: any[] = [];
  listaValidadores: any[] = [];
  listaContadores: any[] = [];
  listaVehiculos: any[] = [];

  idClienteUser!: number;
  idRolUser!: number;
  get isAdmin(): boolean {
    return this.idRolUser === 1;
  }

  private bootstrapping = false;
  private lastLoadedCliente: number | null = null;

  private pendingSelecciones: {
    idValidador?: any;
    idContador?: any;
    idVehiculo?: any;
  } = {};
  private pendingLabels: {
    dispositivo?: string | null;
    bluevox?: string | null;
    vehiculo?: string | null;
  } = {};

  initialDispositivoId?: number | null;
  initialBlueVoxId?: number | null;

  estatusDispositivoAnterior?: number | null;
  estatusBluevoxsAnterior?: number | null;
  comentarios?: string | null;

  constructor(
    private fb: FormBuilder,
    private instService: InstalacionesService,
    private activatedRouted: ActivatedRoute,
    private route: Router,
    private dispoService: DispositivosService,
    private blueVoService: DispositivoBluevoxService,
    private vehiService: VehiculosService,
    private clieService: ClientesService,
    private users: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private alerts: AlertsService
  ) {
    const user = this.users.getUser();
    this.idClienteUser = Number(user?.idCliente);
    this.idRolUser = Number(user?.rol?.id);
  }

  // ---------- Ciclo de vida ----------
  ngOnInit(): void {
    this.initForm();
    this.suscribirCambioCliente();
    this.suscribirCambioEquipos();
    this.obtenerClientes();

    this.activatedRouted.params.subscribe((params) => {
      this.idInstalacion = Number(params['idInstalacion']);
      if (this.idInstalacion) {
        this.title = 'Actualizar Instalación';
        this.obtenerInstalacion();
        const opts = { emitEvent: false };
        this.instalacionesForm.get('idCliente')?.disable(opts);
        this.instalacionesForm.get('idVehiculo')?.disable(opts);
      }
    });
  }

  // ---------- Form ----------
  initForm(): void {
    this.instalacionesForm = this.fb.group({
      estatus: [1, Validators.required],
      idCliente: [
        this.isAdmin ? null : this.idClienteUser,
        Validators.required
      ],
      idValidador: [{ value: null, disabled: true }, Validators.required],
      idContador: [{ value: null, disabled: true }, Validators.required],
      idVehiculo: [{ value: null, disabled: true }, Validators.required]
    });

    if (!this.isAdmin)
      this.instalacionesForm.get('idCliente')?.disable({ onlySelf: true });
  }

  private keepEditLocks(): void {
    if (this.idInstalacion) {
      const opts = { emitEvent: false };
      this.instalacionesForm.get('idCliente')?.disable(opts);
      this.instalacionesForm.get('idVehiculo')?.disable(opts);
    }
  }

  private desactivarCamposDependientes(disabled: boolean) {
    if (!this.instalacionesForm) return;
    const opts = { emitEvent: false };
    const idValidador = this.instalacionesForm.get('idValidador');
    const idContador = this.instalacionesForm.get('idContador');
    const idVehiculo = this.instalacionesForm.get('idVehiculo');

    if (disabled) {
      idValidador?.disable(opts);
      idContador?.disable(opts);
      idVehiculo?.disable(opts);
    } else {
      idValidador?.enable(opts);
      idContador?.enable(opts);
      idVehiculo?.enable(opts);
      this.keepEditLocks();
    }
  }

  private limpiarDependientes(): void {
    const opts = { emitEvent: false };
    this.instalacionesForm.patchValue(
      { idValidador: null, idContador: null, idVehiculo: null },
      opts
    );
    this.listaValidadores = [];
    this.listaContadores = [];
    this.listaVehiculos = [];
  }

  // ---------- Utilidades ----------
  private toNumOrNull(v: any): number | null {
    return v === undefined || v === null || v === '' || Number.isNaN(Number(v))
      ? null
      : Number(v);
  }
  private pickId(obj: any, keys: string[]): any {
    for (const k of keys)
      if (obj?.[k] !== undefined && obj?.[k] !== null) return obj[k];
    return null;
  }
  private ensureArray(maybe: any): any[] {
    if (Array.isArray(maybe)) return maybe;
    if (Array.isArray(maybe?.data)) return maybe.data;
    if (maybe && typeof maybe === 'object') {
      const vals = Object.values(maybe);
      const firstArr = vals.find((v) => Array.isArray(v));
      if (firstArr) return firstArr as any[];
    }
    return [];
  }

  // ---------- Suscripciones ----------
  private suscribirCambioCliente(): void {
    this.instalacionesForm
      .get('idCliente')
      ?.valueChanges.pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((idCliente: any) => {
        if (this.bootstrapping) return;
        if (!idCliente) {
          this.limpiarDependientes();
          this.desactivarCamposDependientes(true);
          this.lastLoadedCliente = null;
          return;
        }
        const id = Number(idCliente);
        if (this.lastLoadedCliente === id) return;
        this.cargarListasPorCliente(id, false);
      });
  }

  private suscribirCambioEquipos(): void {
    // Validador
    this.instalacionesForm.get('idValidador')?.valueChanges.subscribe((nuevo: any) => {
      if (this.bootstrapping || !this.idInstalacion) return; // solo en edición
      // Actualiza el id actual sin pedir estado ni comentarios
      this.initialDispositivoId = this.toNumOrNull(nuevo);
      this.estatusDispositivoAnterior = null; // ya no se usa, por si quedó algo previo
      // this.comentarios = null; // opcional, si no quieres arrastrar comentarios viejos
    });

    // Contador (BlueVox)
    this.instalacionesForm.get('idContador')?.valueChanges.subscribe((nuevo: any) => {
      if (this.bootstrapping || !this.idInstalacion) return; // solo en edición
      // Actualiza el id actual sin pedir estado ni comentarios
      this.initialBlueVoxId = this.toNumOrNull(nuevo);
      this.estatusBluevoxsAnterior = null; // ya no se usa
      // this.comentarios = null; // opcional
    });
  }


  private estadoInputOptions(): Record<string, string> {
    return {
      [EstadoComponente.INACTIVO]: 'INACTIVO',
      [EstadoComponente.DISPONIBLE]: 'DISPONIBLE',
      [EstadoComponente.ASIGNADO]: 'ASIGNADO',
      [EstadoComponente.EN_MANTENIMIENTO]: 'EN_MANTENIMIENTO',
      [EstadoComponente.DANADO]: 'DAÑADO',
      [EstadoComponente.RETIRADO]: 'RETIRADO'
    };
  }

  private async solicitarEstadoYComentarios(
    titulo: string
  ): Promise<{ estado: number; comentarios: string | null } | null> {
    const html = `
      <div style="text-align:left">
        <label style="display:block;margin:12px 0 6px;font-size:12.5px;font-weight:600;color:#9fb0c3;">
          Selecciona el estado
        </label>
        <select id="estado-select" style="width:100%;background:#0b121b;color:#e9eef5;border:1px solid #213041;border-radius:10px;padding:10px 12px;height:44px;">
          <option value="">-- Selecciona --</option>
          ${Object.entries(this.estadoInputOptions())
        .map(([v, l]) => `<option value="${v}">${l}</option>`)
        .join('')}
        </select>
        <label style="display:block;margin:12px 0 6px;font-size:12.5px;font-weight:600;color:#9fb0c3;">Comentarios (opcional)</label>
        <input id="comentarios-input" placeholder="Escribe comentarios"
          style="width:72%;max-width:420px;min-width:240px;margin:0 auto;display:block;background:#0b121b;color:#e9eef5;border:1px solid #213041;border-radius:10px;padding:10px 12px;height:44px;" />
      </div>
    `;

    const res = await this.alerts.open({
      type: 'info',
      title: titulo,
      message: html,
      confirmText: 'Aceptar',
      cancelText: 'Cancelar',
      backdropClose: false
    });

    if (res !== 'confirm') return null;

    const estadoEl = document.getElementById(
      'estado-select'
    ) as HTMLSelectElement | null;
    const comentariosEl = document.getElementById(
      'comentarios-input'
    ) as HTMLInputElement | null;

    const estadoStr = estadoEl?.value ?? '';
    if (!estadoStr) {
      await this.alerts.open({
        type: 'error',
        title: '¡Ops!',
        message: 'Selecciona un estado',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return null;
    }

    return {
      estado: Number(estadoStr),
      comentarios: (comentariosEl?.value ?? '').trim() || null
    };
  }

  // ---------- Carga dependientes por cliente ----------
  private cargarListasPorCliente(
    idCliente: number,
    applyPending: boolean
  ): void {
    this.loadingDependientes = true;
    this.limpiarDependientes();
    this.desactivarCamposDependientes(true);

    const dispositivos$ = this.dispoService
      .obtenerDispositivosByCliente(idCliente)
      .pipe(
        shareReplay(1),
        catchError((err) => of({ __error: err } as any))
      );
    const bluevox$ = this.blueVoService
      .obtenerDispositivosBlueByCliente(idCliente)
      .pipe(
        shareReplay(1),
        catchError((err) => of({ __error: err } as any))
      );
    const vehiculos$ = this.vehiService
      .obtenerVehiculosByCliente(idCliente)
      .pipe(
        shareReplay(1),
        catchError((err) => of({ __error: err } as any))
      );

    const toN = (v: any) => (v == null ? null : Number(v));
    const esError = (r: any) => r && typeof r === 'object' && '__error' in r;

    forkJoin({
      dispositivos: dispositivos$,
      bluevox: bluevox$,
      vehiculos: vehiculos$
    })
      .pipe(finalize(() => (this.loadingDependientes = false)))
      .subscribe({
        next: async (resp: any) => {
          const errores: string[] = [];

          // Normalizadores a llaves de la vista
          const mapValidador = (x: any) => ({
            ...x,
            id: Number(
              this.pickId(x, [
                'id',
                'idValidador',
                'IdValidador',
                'IDValidador'
              ])
            ),
            numeroSerie:
              x.numeroSerie ??
              x.numeroSerieValidadores ??
              x.numeroSerieDispositivo ??
              x.numeroSerieBlueVox ??
              x.numeroSerieContadores ??
              '',
            marca:
              x.marca ??
              x.marcaValidador ??
              x.marcaValidadores ??
              x.marcaContadores ??
              x.marcaBlueVox ??
              '',
            modelo:
              x.modelo ??
              x.modeloValidador ??
              x.modeloValidadores ??
              x.modeloContadores ??
              x.modeloBlueVox ??
              ''
          });
          const mapContador = (x: any) => ({
            ...x,
            id: Number(
              this.pickId(x, ['id', 'idContador', 'IdContador', 'IDContador'])
            ),
            numeroSerie:
              x.numeroSerie ??
              x.numeroSerieBlueVox ??
              x.numeroSerieContadores ??
              x.numeroSerieValidadores ??
              '',
            marca:
              x.marca ??
              x.marcaBlueVox ??
              x.marcaContadores ??
              x.marcaValidador ??
              '',
            modelo:
              x.modelo ??
              x.modeloBlueVox ??
              x.modeloContadores ??
              x.modeloValidador ??
              ''
          });
          const mapVehiculo = (x: any) => ({
            ...x,
            id: Number(
              this.pickId(x, ['id', 'idVehiculo', 'IdVehiculo', 'IDVehiculo'])
            ),
            placa: x.placa ?? x.placaVehiculo ?? x.placavehiculo ?? '',
            numeroEconomico:
              x.numeroEconomico ?? x.numeroEconomicoVehiculo ?? ''
          });

          let devs: any[] = [];
          let bvx: any[] = [];
          let vehs: any[] = [];

          if (esError(resp.dispositivos)) {
            errores.push(await this.getErrorMessage(resp.dispositivos.__error));
          } else {
            devs = this.ensureArray(
              resp?.dispositivos ?? resp?.data?.dispositivos ?? resp?.data
            ).map(mapValidador);
          }

          if (esError(resp.bluevox)) {
            errores.push(await this.getErrorMessage(resp.bluevox.__error));
          } else {
            bvx = this.ensureArray(
              resp?.bluevox ?? resp?.data?.bluevox ?? resp?.data
            ).map(mapContador);
          }

          if (esError(resp.vehiculos)) {
            errores.push(await this.getErrorMessage(resp.vehiculos.__error));
          } else {
            vehs = this.ensureArray(
              resp?.vehiculos ?? resp?.data?.vehiculos ?? resp?.data
            ).map(mapVehiculo);
          }

          // Asegurar opción seleccionada aunque no esté en lista
          const sidDev =
            this.pendingSelecciones?.idValidador == null
              ? null
              : Number(this.pendingSelecciones.idValidador);
          if (sidDev != null && !devs.some((x) => Number(x.id) === sidDev)) {
            devs.unshift({
              id: sidDev,
              numeroSerie: this.pendingLabels.dispositivo ?? '',
              marca: '',
              modelo: ''
            });
          }
          const sidBvx =
            this.pendingSelecciones?.idContador == null
              ? null
              : Number(this.pendingSelecciones.idContador);
          if (sidBvx != null && !bvx.some((x) => Number(x.id) === sidBvx)) {
            bvx.unshift({
              id: sidBvx,
              numeroSerie: this.pendingLabels.bluevox ?? '',
              marca: '',
              modelo: ''
            });
          }
          const sidVeh =
            this.pendingSelecciones?.idVehiculo == null
              ? null
              : Number(this.pendingSelecciones.idVehiculo);
          if (sidVeh != null && !vehs.some((x) => Number(x.id) === sidVeh)) {
            vehs.unshift({
              id: sidVeh,
              placa: this.pendingLabels.vehiculo ?? '',
              numeroEconomico: ''
            });
          }

          this.listaValidadores = devs;
          this.listaContadores = bvx;
          this.listaVehiculos = vehs;

          const habilitar =
            errores.length === 0 &&
            devs.length > 0 &&
            bvx.length > 0 &&
            vehs.length > 0;

          if (habilitar) {
            this.desactivarCamposDependientes(false);
            if (applyPending) {
              const f = this.instalacionesForm;
              f
                .get('idValidador')
                ?.setValue(toN(this.pendingSelecciones.idValidador), {
                  emitEvent: false
                });
              f
                .get('idContador')
                ?.setValue(toN(this.pendingSelecciones.idContador), {
                  emitEvent: false
                });
              f
                .get('idVehiculo')
                ?.setValue(toN(this.pendingSelecciones.idVehiculo), {
                  emitEvent: false
                });
              this.pendingSelecciones = {};
            }
          } else {
            this.desactivarCamposDependientes(true);
          }

          this.lastLoadedCliente = idCliente;
          this.instalacionesForm.updateValueAndValidity({ emitEvent: false });
          this.bootstrapping = false;
          this.cdr.detectChanges();

          if (errores.length > 0) {
            await this.mostrarErroresServiciosSecuencial(errores);
          }
        },
        error: async (err) => {
          this.desactivarCamposDependientes(true);
          this.bootstrapping = false;
          this.instalacionesForm.updateValueAndValidity({ emitEvent: false });
          this.cdr.detectChanges();
          const msg = await this.getErrorMessage(err);
          await this.mostrarErroresServiciosSecuencial([msg]);
        }
      });
  }

  obtenerInstalacion(): void {
    this.bootstrapping = true;

    this.instService.obtenerInstalacion(this.idInstalacion).subscribe({
      next: async (response: any) => {
        const raw = Array.isArray(response?.data)
          ? (response.data[0] ?? {})
          : (response?.data ?? {});
        if (!raw || Object.keys(raw).length === 0) {
          this.bootstrapping = false;
          return;
        }

        // IDs robustos
        const idClienteSrv = this.toNumOrNull(
          raw.idCliente ??
          raw.idcliente ??
          raw?.idCliente2?.id ??
          raw?.cliente?.id ??
          raw?.IdCliente ??
          raw?.IDCliente
        );
        const estatus =
          this.toNumOrNull(raw.estatus ?? raw.Estatus ?? raw.status) ?? 1;
        const idValidador = this.toNumOrNull(
          raw.idValidador ??
          raw.idvalidador ??
          raw.idValidadores ??
          raw.idvalidadores ??
          raw?.dispositivos?.id ??
          raw?.validador?.id ??
          raw?.IdValidador ??
          raw?.IDValidador
        );
        const idContador = this.toNumOrNull(
          raw.idContador ??
          raw.idcontador ??
          raw.idContadores ??
          raw.idcontadores ??
          raw?.blueVoxs?.id ??
          raw?.contador?.id ??
          raw?.IdContador ??
          raw?.IDContador
        );
        const idVehiculo = this.toNumOrNull(
          raw.idVehiculo ??
          raw.idvehiculo ??
          raw?.vehiculos?.id ??
          raw?.vehiculo?.id ??
          raw?.IdVehiculo ??
          raw?.IDVehiculo
        );

        // Guardar IDs iniciales
        this.initialDispositivoId = idValidador ?? null;
        this.initialBlueVoxId = idContador ?? null;

        // Cliente fijo en edición si no es admin
        const idCliente = this.isAdmin ? idClienteSrv : this.idClienteUser;

        // Set de valores sin disparar dependientes
        this.instalacionesForm.patchValue(
          {
            idCliente,
            estatus,
            idValidador: idValidador ?? null,
            idContador: idContador ?? null,
            idVehiculo: idVehiculo ?? null
          },
          { emitEvent: false }
        );

        // Placeholders para mostrar inmediatamente (usando llaves en plural correctas)
        const placeholderValidador = idValidador
          ? [{
            id: idValidador,
            numeroSerie: (
              raw.numeroSerieValidadores ??
              raw.numeroSerie ??
              raw.numeroSerieDispositivo ??
              ''
            ).toString(),
            marca: (
              raw.marcaValidadores ??
              raw.marcaValidador ??
              raw.marca ??
              ''
            ).toString(),
            modelo: (
              raw.modeloValidadores ??
              raw.modeloValidador ??
              raw.modelo ??
              ''
            ).toString()
          }]
          : [];
        const placeholderContador = idContador
          ? [{
            id: idContador,
            numeroSerie: (
              raw.numeroSerieContadores ??
              raw.numeroSerieBlueVox ??
              raw.numeroSerie ??
              ''
            ).toString(),
            marca: (
              raw.marcaContadores ??
              raw.marcaBlueVox ??
              raw.marca ??
              ''
            ).toString(),
            modelo: (
              raw.modeloContadores ??
              raw.modeloBlueVox ??
              raw.modelo ??
              ''
            ).toString()
          }]
          : [];
        const placeholderVehiculo = idVehiculo
          ? [{
            id: idVehiculo,
            placa: (raw.placaVehiculo ?? raw.placa ?? '').toString(),
            numeroEconomico: (
              raw.numeroEconomicoVehiculo ??
              raw.numeroEconomico ??
              ''
            ).toString()
          }]
          : [];

        // Pinta placeholders de inmediato
        this.listaValidadores = placeholderValidador;
        this.listaContadores = placeholderContador;
        this.listaVehiculos = placeholderVehiculo;

        // En edición: bloquear cliente/vehículo y permitir validador/contador
        this.keepEditLocks();
        const opts = { emitEvent: false };
        this.instalacionesForm.get('idValidador')?.enable(opts);
        this.instalacionesForm.get('idContador')?.enable(opts);

        // SIEMPRE pedir equipos por cliente en modo edición y fusionar sin duplicar
        const idClienteParaServicios =
          this.toNumOrNull(this.instalacionesForm.get('idCliente')?.value) ?? idCliente;

        const dispositivos$ = this.dispoService
          .obtenerDispositivosByCliente(idClienteParaServicios)
          .pipe(shareReplay(1), catchError(err => of({ __error: err } as any)));
        const bluevox$ = this.blueVoService
          .obtenerDispositivosBlueByCliente(idClienteParaServicios)
          .pipe(shareReplay(1), catchError(err => of({ __error: err } as any)));

        const esError = (r: any) => r && typeof r === 'object' && '__error' in r;

        const mapValidador = (x: any) => ({
          ...x,
          id: Number(this.pickId(x, ['id', 'idValidador', 'IdValidador', 'IDValidador'])),
          numeroSerie:
            x.numeroSerie ??
            x.numeroSerieValidadores ??
            x.numeroSerieDispositivo ??
            x.numeroSerieBlueVox ??
            x.numeroSerieContadores ??
            '',
          marca:
            x.marca ??
            x.marcaValidador ??
            x.marcaValidadores ??
            x.marcaContadores ??
            x.marcaBlueVox ??
            '',
          modelo:
            x.modelo ??
            x.modeloValidador ??
            x.modeloValidadores ??
            x.modeloContadores ??
            x.modeloBlueVox ??
            ''
        });

        const mapContador = (x: any) => ({
          ...x,
          id: Number(this.pickId(x, ['id', 'idContador', 'IdContador', 'IDContador'])),
          numeroSerie:
            x.numeroSerie ??
            x.numeroSerieBlueVox ??
            x.numeroSerieContadores ??
            x.numeroSerieValidadores ??
            '',
          marca:
            x.marca ??
            x.marcaBlueVox ??
            x.marcaContadores ??
            x.marcaValidador ??
            '',
          modelo:
            x.modelo ??
            x.modeloBlueVox ??
            x.modeloContadores ??
            x.modeloValidador ??
            ''
        });

        forkJoin({ dispositivos: dispositivos$, bluevox: bluevox$ }).subscribe({
          next: async (resp: any) => {
            const errores: string[] = [];

            // Validadores
            if (esError(resp.dispositivos)) {
              errores.push(await this.getErrorMessage(resp.dispositivos.__error));
            } else {
              const devsRaw = this.ensureArray(resp?.dispositivos ?? resp?.data?.dispositivos ?? resp?.data);
              const devs = devsRaw.map(mapValidador);
              // fusiona por id (prefiere objeto con marca/modelo llenos) y evita duplicados
              this.listaValidadores = this.mergeUniqueByIdPreferFilled(devs, placeholderValidador);
            }

            // Contadores
            if (esError(resp.bluevox)) {
              errores.push(await this.getErrorMessage(resp.bluevox.__error));
            } else {
              const bvxRaw = this.ensureArray(resp?.bluevox ?? resp?.data?.bluevox ?? resp?.data);
              const bvx = bvxRaw.map(mapContador);
              this.listaContadores = this.mergeUniqueByIdPreferFilled(bvx, placeholderContador);
            }

            // Mantener habilitados
            this.instalacionesForm.get('idValidador')?.enable({ emitEvent: false });
            this.instalacionesForm.get('idContador')?.enable({ emitEvent: false });
            this.cdr.detectChanges();

            if (errores.length) {
              await this.mostrarErroresServiciosSecuencial(errores);
            }
          },
          error: async (err) => {
            const msg = await this.getErrorMessage(err);
            await this.mostrarErroresServiciosSecuencial([msg]);
          }
        });

        this.bootstrapping = false;
        this.instalacionesForm.updateValueAndValidity({ emitEvent: false });
        this.cdr.detectChanges();
      },
      error: async (err) => {
        this.bootstrapping = false;
        const msg = await this.getErrorMessage(err);
        await this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: msg,
          confirmText: 'Aceptar',
          backdropClose: false
        });
      }
    });
  }


  // ---------- Clientes / Submit ----------
  obtenerClientes(): void {
    this.clieService.obtenerClientes().subscribe(
      (response: any) => {
        this.listaClientes = (response?.data || []).map((x: any) => ({
          ...x,
          id: Number(this.pickId(x, ['id']))
        }));
        if (!this.idInstalacion && !this.isAdmin) {
          this.instalacionesForm
            .get('idCliente')
            ?.setValue(this.idClienteUser, { emitEvent: false });
          this.cargarListasPorCliente(this.idClienteUser, false);
        }
      },
      (err: any) => {
        this.getErrorMessage(err).then((msg) => {
          setTimeout(() => {
            this.alerts.open({
              type: 'error',
              title: '¡Ops!',
              message: msg,
              confirmText: 'Aceptar',
              backdropClose: false
            });
          }, 200);
        });
      }
    );
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idInstalacion) this.actualizar();
    else this.agregar();
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    const etiquetas: any = {
      idValidador: 'Validador',
      idContador: 'Contador',
      idVehiculo: 'Vehículo',
      idCliente: 'Cliente'
    };
    const requeridos = ['idValidador', 'idContador', 'idVehiculo', 'idCliente'];
    const raw = this.instalacionesForm.getRawValue();
    const camposFaltantes: string[] = requeridos
      .filter((k) => !raw[k])
      .map((k) => etiquetas[k] || k);

    if (camposFaltantes.length > 0) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const lista = camposFaltantes
        .map(
          (campo, i) => `
        <div style="padding:8px 12px;border-left:4px solid #d9534f;background:#caa8a8;text-align:center;margin-bottom:8px;border-radius:4px;">
          <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
        </div>`
        )
        .join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Faltan campos obligatorios!',
        message: `<p style="text-align:center;font-size:15px;margin-bottom:16px;color:white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>Por favor complétalos antes de continuar:
        </p><div style="max-height:350px;overflow-y:auto;">${lista}</div>`,
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    const payload = this.instalacionesForm.getRawValue();
    this.instService.agregarInstalacion(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó una nueva instalación de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
        this.regresar();
      },
      (err: any) => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.getErrorMessage(err).then((msg) => {
          setTimeout(() => {
            this.alerts.open({
              type: 'error',
              title: '¡Ops!',
              message: msg,
              confirmText: 'Aceptar',
              backdropClose: false
            });
          }, 200);
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    const etiquetas: any = {
      idValidador: 'Validador',
      idContador: 'Contador',
      idVehiculo: 'Vehículo',
      idCliente: 'Cliente'
    };
    const requeridos = ['idValidador', 'idContador', 'idVehiculo', 'idCliente'];
    const raw = this.instalacionesForm.getRawValue();

    const payload = {
      idValidador: this.toNumOrNull(raw.idValidador),
      estatusDispositivoAnterior: this.estatusDispositivoAnterior ?? null,
      idContador: this.toNumOrNull(raw.idContador),
      estatusBluevoxsAnterior: this.estatusBluevoxsAnterior ?? null,
      idCliente: this.toNumOrNull(raw.idCliente) ?? this.idClienteUser,
      comentarios: this.comentarios ?? null
    };

    const camposFaltantes: string[] = requeridos
      .filter((k) => !raw[k])
      .map((k) => etiquetas[k] || k);
    if (camposFaltantes.length > 0) {
      this.submitButton = 'Actualizar';
      this.loading = false;

      const lista = camposFaltantes
        .map(
          (campo, i) => `
        <div style="padding:8px 12px;border-left:4px solid #d9534f;background:#caa8a8;text-align:center;margin-bottom:8px;border-radius:4px;">
          <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
        </div>`
        )
        .join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Faltan campos obligatorios!',
        message: `<p style="text-align:center;font-size:15px;margin-bottom:16px;color:white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.<br>Por favor complétalos antes de continuar:
        </p><div style="max-height:350px;overflow-y:auto;">${lista}</div>`,
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    this.instService
      .actualizarInstalacion(this.idInstalacion, payload)
      .subscribe(
        () => {
          this.submitButton = 'Actualizar';
          this.loading = false;
          this.alerts.open({
            type: 'success',
            title: '¡Operación Exitosa!',
            message:
              'Los datos de la instalación se actualizaron correctamente.',
            confirmText: 'Confirmar',
            backdropClose: false
          });
          this.regresar();
        },
        async (err: any) => {
          this.submitButton = 'Actualizar';
          this.loading = false;
          const msg = await this.getErrorMessage(err);
          this.alerts.open({
            type: 'error',
            title: '¡Ops!',
            message: msg,
            confirmText: 'Confirmar',
            backdropClose: false
          });
        }
      );
  }

  // ---------- Varios ----------
  compareId = (a: any, b: any) =>
    a != null && b != null && Number(a) === Number(b);
  trackId = (_: number, item: any) => Number(item?.id);

  regresar(): void {
    this.route.navigateByUrl('/administracion/instalaciones');
  }

  private async getErrorMessage(err: any): Promise<string> {
    if (err?.status === 0 && !err?.error)
      return 'No hay conexión con el servidor (status 0). Verifica tu red.';
    if (err?.error instanceof Blob) {
      try {
        const txt = await err.error.text();
        if (txt) return txt;
      } catch { }
    }
    if (typeof err?.error === 'string' && err.error.trim()) return err.error;
    if (typeof err?.message === 'string' && err.message.trim())
      return err.message;
    if (err?.error?.message) return String(err.error.message);
    if (err?.error?.errors) {
      const e = err.error.errors;
      if (Array.isArray(e)) return e.filter(Boolean).join('\n');
      if (typeof e === 'object') {
        const lines: string[] = [];
        for (const k of Object.keys(e)) {
          const val = e[k];
          if (Array.isArray(val)) lines.push(`${k}: ${val.join(', ')}`);
          else if (val) lines.push(`${k}: ${val}`);
        }
        if (lines.length) return lines.join('\n');
      }
    }
    const statusLine = err?.status
      ? `HTTP ${err.status}${err.statusText ? ' ' + err.statusText : ''}`
      : '';
    return statusLine;
  }

  // Alertas secuenciales
  private delay(ms = 0): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
  private async mostrarErroresServiciosSecuencial(
    mensajes: string[]
  ): Promise<void> {
    for (const msg of mensajes) {
      await this.delay(0);
      await this.alerts.open({
        type: 'error',
        title: '¡Ops!',
        message: msg,
        confirmText: 'Aceptar',
        backdropClose: false
      });
    }
  }

  private ejecutarServiciosEquiposPorCliente(idCliente: number): void {
    if (!idCliente) return;

    const dispositivos$ = this.dispoService
      .obtenerDispositivosByCliente(idCliente)
      .pipe(
        shareReplay(1),
        catchError((err) => of({ __error: err } as any))
      );

    const bluevox$ = this.blueVoService
      .obtenerDispositivosBlueByCliente(idCliente)
      .pipe(
        shareReplay(1),
        catchError((err) => of({ __error: err } as any))
      );

    const esError = (r: any) => r && typeof r === 'object' && '__error' in r;

    const mapValidador = (x: any) => ({
      ...x,
      id: Number(
        this.pickId(x, ['id', 'idValidador', 'IdValidador', 'IDValidador'])
      ),
      numeroSerie:
        x.numeroSerie ??
        x.numeroSerieValidadores ??
        x.numeroSerieDispositivo ??
        x.numeroSerieBlueVox ??
        x.numeroSerieContadores ??
        '',
      marca:
        x.marca ??
        x.marcaValidador ??
        x.marcaValidadores ??
        x.marcaContadores ??
        x.marcaBlueVox ??
        '',
      modelo:
        x.modelo ??
        x.modeloValidador ??
        x.modeloValidadores ??
        x.modeloContadores ??
        x.modeloBlueVox ??
        ''
    });

    const mapContador = (x: any) => ({
      ...x,
      id: Number(
        this.pickId(x, ['id', 'idContador', 'IdContador', 'IDContador'])
      ),
      numeroSerie:
        x.numeroSerie ??
        x.numeroSerieBlueVox ??
        x.numeroSerieContadores ??
        x.numeroSerieValidadores ??
        '',
      marca:
        x.marca ??
        x.marcaBlueVox ??
        x.marcaContadores ??
        x.marcaValidador ??
        '',
      modelo:
        x.modelo ??
        x.modeloBlueVox ??
        x.modeloContadores ??
        x.modeloValidador ??
        ''
    });

    forkJoin({ dispositivos: dispositivos$, bluevox: bluevox$ }).subscribe({
      next: async (resp: any) => {
        const errores: string[] = [];

        if (esError(resp.dispositivos)) {
          errores.push(await this.getErrorMessage(resp.dispositivos.__error));
        } else {
          this.listaValidadores = this.ensureArray(
            resp.dispositivos ?? resp?.data?.dispositivos ?? resp?.data
          ).map(mapValidador);
        }

        if (esError(resp.bluevox)) {
          errores.push(await this.getErrorMessage(resp.bluevox.__error));
        } else {
          this.listaContadores = this.ensureArray(
            resp.bluevox ?? resp?.data?.bluevox ?? resp?.data
          ).map(mapContador);
        }

        // En edición deben poder cambiarse
        const opts = { emitEvent: false };
        this.instalacionesForm.get('idValidador')?.enable(opts);
        this.instalacionesForm.get('idContador')?.enable(opts);
        this.cdr.detectChanges();

        if (errores.length)
          await this.mostrarErroresServiciosSecuencial(errores);
      },
      error: async (err) => {
        const msg = await this.getErrorMessage(err);
        await this.mostrarErroresServiciosSecuencial([msg]);
      }
    });
  }

  // Fusiona listas por id y mantiene UN SOLO elemento por id.
  // Prefiere el que tenga más campos "llenos" (numeroSerie, marca, modelo).
  private mergeUniqueByIdPreferFilled(
    primary: any[] = [],
    secondary: any[] = [],
    fields: string[] = ['numeroSerie', 'marca', 'modelo']
  ): any[] {
    const score = (o: any) =>
      fields.reduce((s, f) => s + (o && typeof o[f] === 'string' && o[f].trim() ? 1 : 0), 0);

    const map = new Map<number, any>();
    const put = (o: any) => {
      if (!o) return;
      const id = Number(o.id);
      if (Number.isNaN(id)) return;
      const prev = map.get(id);
      if (!prev) {
        map.set(id, o);
      } else {
        map.set(id, score(o) >= score(prev) ? o : prev);
      }
    };

    primary.forEach(put);
    secondary.forEach(put);
    return Array.from(map.values());
  }

}
