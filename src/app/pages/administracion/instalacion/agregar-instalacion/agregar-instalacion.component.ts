import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
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
  private placeholderVehiculo: any[] = []; // Para guardar el vehículo placeholder con cantidadPuertas

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

  // --- campos para payload de actualización (valores de esta sesión) ---
  estatusValidadorAnterior: number | null = null;
  contadoresAnteriores: Array<{ idContador: number; estatusAnterior: number }> = [];
  comentariosValidador: string | null = null;
  comentariosContador: string | null = null;

  // --- buffer persistente de lo ÚLTIMO ENVIADO (para reusar si no cambias uno de los dos) ---
  private lastSubmittedMeta: {
    estatusValidadorAnterior: number | null;
    contadoresAnteriores: Array<{ idContador: number; estatusAnterior: number }>;
    comentariosValidador: string | null;
    comentariosContador: string | null;
  } = {
    estatusValidadorAnterior: null,
    contadoresAnteriores: [],
    comentariosValidador: null,
    comentariosContador: null
  };

  // --- estado de modales ---
  // Validador
  modalValidadorOpen = false;
  modalValidadorClosing = false;
  modalValidadorAnim: 'in' | 'out' = 'in';
  estadoValidadorSel: number | null = null;
  comentarioValidadorText = '';
  private pendingNuevoValidadorId: number | null = null;

  // Contador
  modalContadorOpen = false;
  modalContadorClosing = false;
  modalContadorAnim: 'in' | 'out' = 'in';
  estadoContadorSel: number | null = null;
  comentarioContadorText = '';
  private pendingNuevoContadorId: number | null = null;
  private pendingContadorIndex: number | null = null;
  private initialContadoresIds: (number | null)[] = [];

  // opciones de estado para los selects del modal
  estadoEntries = [
    { value: EstadoComponente.INACTIVO, label: 'INACTIVO' },
    { value: EstadoComponente.DISPONIBLE, label: 'DISPONIBLE' },
    { value: EstadoComponente.ASIGNADO, label: 'ASIGNADO' },
    { value: EstadoComponente.EN_MANTENIMIENTO, label: 'EN_MANTENIMIENTO' },
    { value: EstadoComponente.DANADO, label: 'DAÑADO' },
    { value: EstadoComponente.RETIRADO, label: 'RETIRADO' }
  ];

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
    this.suscribirCambioVehiculo();
    this.obtenerClientes();

    this.activatedRouted.params.subscribe((params:any) => {
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
      idContadores: this.fb.array([
        this.fb.control({ value: null, disabled: true }, Validators.required)
      ]),
      idVehiculo: [{ value: null, disabled: true }, Validators.required]
    });

    if (!this.isAdmin)
      this.instalacionesForm.get('idCliente')?.disable({ onlySelf: true });
  }

  get idContadoresArray(): FormArray {
    return this.instalacionesForm.get('idContadores') as FormArray;
  }

  agregarContador(): void {
    // Validar que se pueda agregar antes de hacerlo
    if (!this.puedeAgregarContador()) {
      this.alerts.open({
        type: 'warning',
        title: '¡Atención!',
        message: 'No se puede agregar más contadores. El número máximo permitido es igual a la cantidad de puertas del vehículo seleccionado.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    const nuevoContador = this.fb.control({ value: null, disabled: true }, Validators.required);
    this.idContadoresArray.push(nuevoContador);
    const opts = { emitEvent: false };
    const idCliente = this.instalacionesForm.get('idCliente')?.value;
    // Habilitar el contador si hay un cliente seleccionado (incluso si está deshabilitado en modo edición)
    if (idCliente) {
      nuevoContador.enable(opts);
    }
  }

  eliminarContador(index: number): void {
    if (this.idContadoresArray.length > 1) {
      this.idContadoresArray.removeAt(index);
    }
  }

  obtenerContadoresDisponibles(index: number): any[] {
    const contadoresSeleccionados = this.idContadoresArray.controls
      .map((control: AbstractControl, i: number) => i !== index ? control.value : null)
      .filter((id: any) => id != null && id !== '');
    
    let contadoresFiltrados = this.listaContadores;
    
    // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
    if (!this.idInstalacion) {
      contadoresFiltrados = contadoresFiltrados.filter((contador: any) => {
        const numeroSerie = (contador.numeroSerie || '').toString().toLowerCase();
        return !numeroSerie.includes('asignado');
      });
    }
    
    if (contadoresSeleccionados.length === 0) {
      return contadoresFiltrados;
    }
    
    return contadoresFiltrados.filter(
      contador => !contadoresSeleccionados.includes(Number(contador.id))
    );
  }

  estaAsignado(item: any): boolean {
    if (!item) return false;
    const numeroSerie = (item.numeroSerie || '').toString().toLowerCase();
    return numeroSerie.includes('asignado');
  }

  esModoAgregar(): boolean {
    return !this.idInstalacion;
  }

  puedeAgregarContador(): boolean {
    // Primero verificar que haya un vehículo seleccionado
    const idVehiculo = this.instalacionesForm.get('idVehiculo')?.value;
    if (!idVehiculo) {
      return false; // No se puede agregar contador si no hay vehículo seleccionado
    }

    // Obtener el vehículo seleccionado de la lista
    const vehiculoSeleccionado = this.listaVehiculos.find((v: any) => {
      const vid = Number(v?.id ?? v?.Id ?? v?.ID);
      return vid === Number(idVehiculo);
    });

    if (!vehiculoSeleccionado) {
      return false; // No se puede agregar si no se encuentra el vehículo
    }

    // Obtener cantidadPuertas del vehículo
    const cantidadPuertas = Number(
      vehiculoSeleccionado?.cantidadPuertas ?? 
      vehiculoSeleccionado?.cantidadpuertas ?? 
      vehiculoSeleccionado?.CantidadPuertas ?? 
      0
    );

    if (cantidadPuertas <= 0) {
      return false; // No se puede agregar si cantidadPuertas es 0 o no existe
    }

    // Contar contadores actuales (incluyendo los que tienen valor null pero están en el array)
    const cantidadContadoresActuales = this.idContadoresArray.length;

    // Solo se puede agregar si la cantidad actual es menor a cantidadPuertas
    return cantidadContadoresActuales < cantidadPuertas;
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
    const idContadores = this.instalacionesForm.get('idContadores') as FormArray;
    const idVehiculo = this.instalacionesForm.get('idVehiculo');

    if (disabled) {
      idValidador?.disable(opts);
      idContadores.controls.forEach((control: AbstractControl) => control.disable(opts));
      idVehiculo?.disable(opts);
    } else {
      idValidador?.enable(opts);
      idContadores.controls.forEach((control: AbstractControl) => control.enable(opts));
      idVehiculo?.enable(opts);
      this.keepEditLocks();
    }
  }

  private limpiarDependientes(): void {
    const opts = { emitEvent: false };
    this.instalacionesForm.patchValue(
      { idValidador: null, idVehiculo: null },
      opts
    );
    // Limpiar y resetear FormArray de contadores a un solo campo
    const idContadores = this.instalacionesForm.get('idContadores') as FormArray;
    while (idContadores.length > 1) {
      idContadores.removeAt(idContadores.length - 1);
    }
    idContadores.at(0).setValue(null, opts);
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
    this.instalacionesForm
      .get('idValidador')
      ?.valueChanges.subscribe(async (nuevo: any) => {
        if (this.bootstrapping || !this.idInstalacion) return; // solo en edición

        const nuevoId = this.toNumOrNull(nuevo);
        const anteriorId = this.initialDispositivoId ?? null;

        if (nuevoId === anteriorId) return;

        // Validar que el nuevo validador pertenezca al cliente seleccionado
        const pertenece = this.listaValidadores.some(
          (v) => Number(v?.id) === Number(nuevoId)
        );
        if (!pertenece) {
          await this.alerts.open({
            type: 'error',
            title: '¡Ops!',
            message:
              'El validador seleccionado no pertenece al cliente actual.',
            confirmText: 'Entendido',
            backdropClose: false
          });
          this.instalacionesForm
            .get('idValidador')
            ?.setValue(anteriorId, { emitEvent: false });
          return;
        }

        // Abrir modal y guardar "pendiente"
        this.pendingNuevoValidadorId = nuevoId;
        this.estadoValidadorSel = null;
        this.comentarioValidadorText = '';
        this.abrirModalValidador();
      });

    // Contadores (BlueVox) - suscripción a cambios en el FormArray
    this.idContadoresArray.valueChanges.subscribe(async (valores: any[]) => {
      if (this.bootstrapping || !this.idInstalacion) return; // solo en edición
      
      // Verificar cada cambio en los contadores
      for (let index = 0; index < valores.length; index++) {
        const nuevo = valores[index];
        const nuevoId = this.toNumOrNull(nuevo);
        const anteriorId = this.initialContadoresIds[index] ?? null;
        
        // Si no cambió, continuar
        if (nuevoId === anteriorId) continue;
        
        // Validar que el nuevo contador pertenezca al cliente seleccionado
        const pertenece = this.listaContadores.some(
          (c) => Number(c?.id) === Number(nuevoId)
        );
        if (!pertenece) {
          await this.alerts.open({
            type: 'error',
            title: '¡Ops!',
            message: 'El contador seleccionado no pertenece al cliente actual.',
            confirmText: 'Entendido',
            backdropClose: false
          });
          this.idContadoresArray.at(index).setValue(anteriorId, { emitEvent: false });
          return;
        }
        
        // Abrir modal y guardar "pendiente"
        this.pendingNuevoContadorId = nuevoId;
        this.pendingContadorIndex = index;
        this.estadoContadorSel = null;
        this.comentarioContadorText = '';
        this.abrirModalContador();
        break; // Solo manejar un cambio a la vez
      }
    });
  }

  private suscribirCambioVehiculo(): void {
    // Suscribirse a cambios en el vehículo para validar y actualizar el estado del botón
    this.instalacionesForm
      .get('idVehiculo')
      ?.valueChanges.pipe(debounceTime(100))
      .subscribe((idVehiculo: any) => {
        if (this.bootstrapping) return;

        // Si no hay vehículo seleccionado, no hacer nada
        if (!idVehiculo) {
          this.cdr.detectChanges();
          return;
        }

        // Obtener el vehículo seleccionado
        const vehiculoSeleccionado = this.listaVehiculos.find((v: any) => {
          const vid = Number(v?.id ?? v?.Id ?? v?.ID);
          return vid === Number(idVehiculo);
        });

        if (!vehiculoSeleccionado) {
          this.cdr.detectChanges();
          return;
        }

        // Obtener cantidadPuertas del vehículo
        const cantidadPuertas = Number(
          vehiculoSeleccionado?.cantidadPuertas ?? 
          vehiculoSeleccionado?.cantidadpuertas ?? 
          vehiculoSeleccionado?.CantidadPuertas ?? 
          0
        );

        // Si hay más contadores que cantidadPuertas, eliminar los excedentes
        const cantidadContadoresActuales = this.idContadoresArray.length;
        if (cantidadContadoresActuales > cantidadPuertas && cantidadPuertas > 0) {
          const excedentes = cantidadContadoresActuales - cantidadPuertas;
          // Eliminar los últimos contadores excedentes
          for (let i = 0; i < excedentes; i++) {
            if (this.idContadoresArray.length > 1) {
              this.idContadoresArray.removeAt(this.idContadoresArray.length - 1);
            }
          }
        }

        // Forzar detección de cambios para actualizar el estado del botón
        this.cdr.detectChanges();
      });
  }

  // ---------- Helpers visuales select options ----------
  toSelectValue(v: number | null): string {
    return v === null || v === undefined ? '' : String(v);
  }
  parseSelect(value: any): number | null {
    const s = String(value ?? '');
    if (!s.length) return null;
    const n = Number(s);
    return Number.isNaN(n) ? null : n;
  }

  // ---------- Modal Validador ----------
  abrirModalValidador(): void {
    this.modalValidadorAnim = 'in';
    this.modalValidadorClosing = false;
    this.modalValidadorOpen = true;
  }
  async cerrarModalValidador(cancelar: boolean): Promise<void> {
    this.modalValidadorClosing = true;
    this.modalValidadorAnim = 'out';
    setTimeout(() => {
      this.modalValidadorOpen = false;
      this.modalValidadorClosing = false;

      if (cancelar) {
        // Revertir selección
        this.instalacionesForm
          .get('idValidador')
          ?.setValue(this.initialDispositivoId ?? null, { emitEvent: false });
        // limpiar temporales
        this.pendingNuevoValidadorId = null;
        this.estadoValidadorSel = null;
        this.comentarioValidadorText = '';
        this.cdr.detectChanges();
      }
    }, 240);
  }
  onBackdropValidador(): void {
    this.cerrarModalValidador(true);
  }
  confirmarModalValidador(): void {
    if (this.estadoValidadorSel == null) {
      this.alerts.open({
        type: 'warning',
        title: 'Falta estado',
        message: 'Selecciona un estado para continuar.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }
    // Asignar datos de ESTA sesión
    this.estatusValidadorAnterior = this.estadoValidadorSel;
    this.comentariosValidador = this.comentarioValidadorText?.trim() || null;

    // Aceptar cambio como "inicial"
    this.initialDispositivoId =
      this.pendingNuevoValidadorId ?? this.initialDispositivoId;

    // Cerrar modal sin revertir
    this.cerrarModalValidador(false);
  }

  // ---------- Modal Contador ----------
  abrirModalContador(): void {
    this.modalContadorAnim = 'in';
    this.modalContadorClosing = false;
    this.modalContadorOpen = true;
  }
  async cerrarModalContador(cancelar: boolean): Promise<void> {
    this.modalContadorClosing = true;
    this.modalContadorAnim = 'out';
    setTimeout(() => {
      this.modalContadorOpen = false;
      this.modalContadorClosing = false;

      if (cancelar) {
        // Revertir selección del contador en el índice correspondiente
        if (this.pendingContadorIndex !== null) {
          const anteriorId = this.initialContadoresIds[this.pendingContadorIndex] ?? null;
          this.idContadoresArray.at(this.pendingContadorIndex).setValue(anteriorId, { emitEvent: false });
        }
        // limpiar temporales
        this.pendingNuevoContadorId = null;
        this.pendingContadorIndex = null;
        this.estadoContadorSel = null;
        this.comentarioContadorText = '';
        this.cdr.detectChanges();
      }
    }, 240);
  }
  onBackdropContador(): void {
    this.cerrarModalContador(true);
  }
  confirmarModalContador(): void {
    if (this.estadoContadorSel == null) {
      this.alerts.open({
        type: 'warning',
        title: 'Falta estado',
        message: 'Selecciona un estado para continuar.',
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    // Obtener el ID anterior del contador que se está cambiando
    if (this.pendingContadorIndex !== null) {
      const idContadorAnterior = this.initialContadoresIds[this.pendingContadorIndex];
      
      if (idContadorAnterior != null) {
        // Verificar si ya existe un registro para este contador y actualizarlo, o agregar uno nuevo
        const indexExistente = this.contadoresAnteriores.findIndex(
          c => c.idContador === idContadorAnterior
        );
        
        if (indexExistente >= 0) {
          // Actualizar el estatus si ya existe
          this.contadoresAnteriores[indexExistente].estatusAnterior = this.estadoContadorSel;
        } else {
          // Agregar nuevo objeto al array
          this.contadoresAnteriores.push({
            idContador: idContadorAnterior,
            estatusAnterior: this.estadoContadorSel
          });
        }
      }
    }

    this.comentariosContador = this.comentarioContadorText?.trim() || null;

    // Actualizar el ID inicial del contador en el índice correspondiente
    if (this.pendingContadorIndex !== null && this.pendingNuevoContadorId !== null) {
      this.initialContadoresIds[this.pendingContadorIndex] = this.pendingNuevoContadorId;
    }

    this.cerrarModalContador(false);
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

          // Normalizadores
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
              x.NumeroSerie ??
              x.numeroSerieBlueVox ??
              x.NumeroSerieBlueVox ??
              x.numeroSerieContadores ??
              x.NumeroSerieContadores ??
              x.numeroSerieContador ??
              x.NumeroSerieContador ??
              x.numeroSerieValidadores ??
              '',
            marca:
              x.marca ??
              x.Marca ??
              x.marcaBlueVox ??
              x.MarcaBlueVox ??
              x.marcaContadores ??
              x.MarcaContadores ??
              x.marcaContador ??
              x.MarcaContador ??
              x.marcaValidador ??
              '',
            modelo:
              x.modelo ??
              x.Modelo ??
              x.modeloBlueVox ??
              x.ModeloBlueVox ??
              x.modeloContadores ??
              x.ModeloContadores ??
              x.modeloContador ??
              x.ModeloContador ??
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
              x.numeroEconomico ?? x.numeroEconomicoVehiculo ?? '',
            cantidadPuertas: this.toNumOrNull(
              x.cantidadPuertas ?? 
              x.cantidadpuertas ?? 
              x.CantidadPuertas ?? 
              null
            )
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
            // Buscar cantidadPuertas en placeholderVehiculo si está disponible
            const placeholderVeh = this.placeholderVehiculo.find((v: any) => Number(v.id) === Number(sidVeh));
            vehs.unshift({
              id: sidVeh,
              placa: this.pendingLabels.vehiculo ?? '',
              numeroEconomico: '',
              cantidadPuertas: placeholderVeh?.cantidadPuertas ?? null
            });
          }

          // Fusionar placeholderVehiculo con vehículos reales para mantener cantidadPuertas
          if (this.placeholderVehiculo.length > 0 && vehs.length > 0) {
            const placeholderVeh = this.placeholderVehiculo[0];
            const vehIndex = vehs.findIndex((v: any) => Number(v.id) === Number(placeholderVeh.id));
            if (vehIndex >= 0 && placeholderVeh.cantidadPuertas != null) {
              // Si el vehículo está en la lista real, actualizar cantidadPuertas del placeholder
              vehs[vehIndex].cantidadPuertas = placeholderVeh.cantidadPuertas;
            } else if (vehIndex < 0 && placeholderVeh.cantidadPuertas != null) {
              // Si el vehículo no está en la lista real, agregarlo con cantidadPuertas
              vehs.unshift({
                ...placeholderVeh,
                cantidadPuertas: placeholderVeh.cantidadPuertas
              });
            }
          } else if (this.placeholderVehiculo.length > 0) {
            // Si no hay vehículos reales, usar el placeholder
            vehs = [...this.placeholderVehiculo];
          }

          // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
          if (!this.idInstalacion) {
            devs = devs.filter((validador: any) => {
              const numeroSerie = (validador.numeroSerie || '').toString().toLowerCase();
              return !numeroSerie.includes('asignado');
            });
            bvx = bvx.filter((contador: any) => {
              const numeroSerie = (contador.numeroSerie || '').toString().toLowerCase();
              return !numeroSerie.includes('asignado');
            });
          }

          this.listaValidadores = devs;
          this.listaContadores = bvx;
          this.listaVehiculos = vehs;

          const sinErrores = errores.length === 0;
          if (sinErrores) {
            this.desactivarCamposDependientes(false);
            if (applyPending) {
              const f = this.instalacionesForm;
              f.get('idValidador')?.setValue(toN(this.pendingSelecciones.idValidador), { emitEvent: false });
              // Los contadores se manejan con FormArray, no se establecen aquí
              f.get('idVehiculo')?.setValue(toN(this.pendingSelecciones.idVehiculo), { emitEvent: false });
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
          ? response.data[0] ?? {}
          : response?.data ?? {};
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
        // Manejar idContadores como array o valor único
        let idContadores: number[] = [];
        if (raw.idContadores && Array.isArray(raw.idContadores)) {
          idContadores = raw.idContadores.map((id: any) => this.toNumOrNull(id)).filter((id: any) => id != null) as number[];
        } else {
          const idContador = this.toNumOrNull(
            raw.idContador ??
              raw.idcontador ??
              raw?.blueVoxs?.id ??
              raw?.contador?.id ??
              raw?.IdContador ??
              raw?.IDContador
          );
          if (idContador != null) {
            idContadores = [idContador];
          }
        }
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
        this.initialBlueVoxId = idContadores.length > 0 ? idContadores[0] : null;
        // Guardar todos los IDs iniciales de contadores
        this.initialContadoresIds = [...idContadores];

        // Cliente fijo en edición si no es admin
        const idCliente = this.isAdmin ? idClienteSrv : this.idClienteUser;

        // Configurar FormArray de contadores
        const contadoresArray = this.instalacionesForm.get('idContadores') as FormArray;
        // Limpiar y agregar contadores
        while (contadoresArray.length > 0) {
          contadoresArray.removeAt(0);
        }
        if (idContadores.length === 0) {
          // Si no hay contadores, agregar uno vacío
          contadoresArray.push(this.fb.control({ value: null, disabled: true }, Validators.required));
        } else {
          // Agregar un control por cada contador
          idContadores.forEach(id => {
            contadoresArray.push(this.fb.control({ value: id, disabled: true }, Validators.required));
          });
        }

        // Set de valores sin disparar dependientes
        this.instalacionesForm.patchValue(
          {
            idCliente,
            estatus,
            idValidador: idValidador ?? null,
            idVehiculo: idVehiculo ?? null
          },
          { emitEvent: false }
        );

        // Placeholders inmediatos
        const placeholderValidador = idValidador
          ? [
              {
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
              }
            ]
          : [];
        const placeholderContador = idContadores.length > 0
          ? idContadores.map((id, index) => {
              // Obtener arrays de datos de contadores
              const numeroSerieContadores = Array.isArray(raw.numeroSerieContadores) 
                ? raw.numeroSerieContadores 
                : (raw.NumeroSerieContadores && Array.isArray(raw.NumeroSerieContadores) ? raw.NumeroSerieContadores : []);
              const marcaContadores = Array.isArray(raw.marcaContadores) 
                ? raw.marcaContadores 
                : (raw.MarcaContadores && Array.isArray(raw.MarcaContadores) ? raw.MarcaContadores : []);
              const modeloContadores = Array.isArray(raw.modeloContadores) 
                ? raw.modeloContadores 
                : (raw.ModeloContadores && Array.isArray(raw.ModeloContadores) ? raw.ModeloContadores : []);
              
              // Obtener valores del índice correspondiente o valores de respaldo
              const numeroSerie = (numeroSerieContadores[index] && numeroSerieContadores[index].trim()) 
                ? numeroSerieContadores[index]
                : (raw.numeroSerie ?? 
                   raw.NumeroSerie ?? 
                   raw.numeroSerieContador ?? 
                   raw.NumeroSerieContador ?? 
                   raw.numeroSerieBlueVox ?? 
                   raw.NumeroSerieBlueVox ?? 
                   '');
              
              const marca = (marcaContadores[index] && marcaContadores[index].trim())
                ? marcaContadores[index]
                : (raw.marca ?? 
                   raw.Marca ?? 
                   raw.marcaContador ?? 
                   raw.MarcaContador ?? 
                   raw.marcaBlueVox ?? 
                   raw.MarcaBlueVox ?? 
                   '');
              
              const modelo = (modeloContadores[index] && modeloContadores[index].trim())
                ? modeloContadores[index]
                : (raw.modelo ?? 
                   raw.Modelo ?? 
                   raw.modeloContador ?? 
                   raw.ModeloContador ?? 
                   raw.modeloBlueVox ?? 
                   raw.ModeloBlueVox ?? 
                   '');
              
              return {
                id: id,
                numeroSerie: String(numeroSerie),
                marca: String(marca),
                modelo: String(modelo)
              };
            })
          : [];
        const placeholderVehiculo = idVehiculo
          ? [
              {
                id: idVehiculo,
                placa: (raw.placaVehiculo ?? raw.placa ?? '').toString(),
                numeroEconomico: (
                  raw.numeroEconomicoVehiculo ??
                  raw.numeroEconomico ??
                  ''
                ).toString(),
                cantidadPuertas: this.toNumOrNull(
                  raw.cantidadPuertasVehiculo ??
                  raw.cantidadPuertas ??
                  raw.cantidadpuertas ??
                  raw.CantidadPuertas ??
                  raw?.vehiculo?.cantidadPuertas ??
                  raw?.vehiculos?.cantidadPuertas ??
                  null
                )
              }
            ]
          : [];

        this.listaValidadores = placeholderValidador;
        this.listaContadores = placeholderContador;
        this.listaVehiculos = placeholderVehiculo;
        // Guardar placeholderVehiculo para usarlo en la fusión posterior
        this.placeholderVehiculo = placeholderVehiculo;

        // En edición: bloquear cliente/vehículo y permitir validador/contador
        this.keepEditLocks();
        const opts = { emitEvent: false };
        this.instalacionesForm.get('idValidador')?.enable(opts);
        const contadoresArrayEdit = this.instalacionesForm.get('idContadores') as FormArray;
        contadoresArrayEdit.controls.forEach((control: AbstractControl): void => {
          control.enable(opts);
        });

        // Pedir listas reales y fusionar
        const idClienteParaServicios =
          this.toNumOrNull(this.instalacionesForm.get('idCliente')?.value) ??
          idCliente;

        const dispositivos$ = this.dispoService
          .obtenerDispositivosByCliente(idClienteParaServicios)
          .pipe(
            shareReplay(1),
            catchError((err) => of({ __error: err } as any))
          );
        const bluevox$ = this.blueVoService
          .obtenerDispositivosBlueByCliente(idClienteParaServicios)
          .pipe(
            shareReplay(1),
            catchError((err) => of({ __error: err } as any))
          );

        const esError = (r: any) =>
          r && typeof r === 'object' && '__error' in r;

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
            x.NumeroSerie ??
            x.numeroSerieBlueVox ??
            x.NumeroSerieBlueVox ??
            x.numeroSerieContadores ??
            x.NumeroSerieContadores ??
            x.numeroSerieContador ??
            x.NumeroSerieContador ??
            x.numeroSerieValidadores ??
            '',
          marca:
            x.marca ??
            x.Marca ??
            x.marcaBlueVox ??
            x.MarcaBlueVox ??
            x.marcaContadores ??
            x.MarcaContadores ??
            x.marcaContador ??
            x.MarcaContador ??
            x.marcaValidador ??
            '',
          modelo:
            x.modelo ??
            x.Modelo ??
            x.modeloBlueVox ??
            x.ModeloBlueVox ??
            x.modeloContadores ??
            x.ModeloContadores ??
            x.modeloContador ??
            x.ModeloContador ??
            x.modeloValidador ??
            ''
        });

        forkJoin({ dispositivos: dispositivos$, bluevox: bluevox$ }).subscribe({
          next: async (resp: any) => {
            const errores: string[] = [];

            if (esError(resp.dispositivos)) {
              errores.push(
                await this.getErrorMessage(resp.dispositivos.__error)
              );
            } else {
              const devsRaw = this.ensureArray(
                resp?.dispositivos ?? resp?.data?.dispositivos ?? resp?.data
              );
              let devs = devsRaw.map(mapValidador);
              // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
              if (!this.idInstalacion) {
                devs = devs.filter((validador: any) => {
                  const numeroSerie = (validador.numeroSerie || '').toString().toLowerCase();
                  return !numeroSerie.includes('asignado');
                });
              }
              this.listaValidadores = this.mergeUniqueByIdPreferFilled(
                devs,
                placeholderValidador
              );
            }

            if (esError(resp.bluevox)) {
              errores.push(await this.getErrorMessage(resp.bluevox.__error));
            } else {
              const bvxRaw = this.ensureArray(
                resp?.bluevox ?? resp?.data?.bluevox ?? resp?.data
              );
              let bvx = bvxRaw.map(mapContador);
              // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
              if (!this.idInstalacion) {
                bvx = bvx.filter((contador: any) => {
                  const numeroSerie = (contador.numeroSerie || '').toString().toLowerCase();
                  return !numeroSerie.includes('asignado');
                });
              }
              this.listaContadores = this.mergeUniqueByIdPreferFilled(
                bvx,
                placeholderContador
              );
            }

            this.instalacionesForm
              .get('idValidador')
              ?.enable({ emitEvent: false });
            const contadoresArrayFork = this.instalacionesForm.get('idContadores') as FormArray;
            contadoresArrayFork.controls.forEach((control: AbstractControl) => control.enable({ emitEvent: false }));
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
      idContadores: 'Contador',
      idVehiculo: 'Vehículo',
      idCliente: 'Cliente'
    };
    const raw = this.instalacionesForm.getRawValue();
    const camposFaltantes: string[] = [];
    
    if (!raw.idValidador) camposFaltantes.push(etiquetas.idValidador);
    if (!raw.idVehiculo) camposFaltantes.push(etiquetas.idVehiculo);
    if (!raw.idCliente) camposFaltantes.push(etiquetas.idCliente);
    
    // Validar que haya al menos un contador seleccionado
    const idContadores = Array.isArray(raw.idContadores) 
      ? raw.idContadores.filter((id: any) => id != null && id !== '').map((id: any) => this.toNumOrNull(id)).filter((id: any) => id != null)
      : [];
    if (idContadores.length === 0) {
      camposFaltantes.push(etiquetas.idContadores);
    }

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
    
    const payload: any = {
      idValidador: raw.idValidador,
      idContadores: idContadores,
      idVehiculo: raw.idVehiculo,
      idCliente: raw.idCliente,
      estatus: raw.estatus
    };
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
      idContadores: 'Contador',
      idVehiculo: 'Vehículo',
      idCliente: 'Cliente'
    };
    const raw = this.instalacionesForm.getRawValue();

    // COALESCE: usa lo actual, o lo ÚLTIMO ENVIADO si esta vez no cambiaste ese lado
    const _estatusValAnt =
      this.estatusValidadorAnterior ??
      this.lastSubmittedMeta.estatusValidadorAnterior;
    const _comentVal =
      this.comentariosValidador ??
      this.lastSubmittedMeta.comentariosValidador ??
      null;

    const _contadoresAnteriores = 
      this.contadoresAnteriores.length > 0
        ? this.contadoresAnteriores
        : this.lastSubmittedMeta.contadoresAnteriores;
    const _comentCon =
      this.comentariosContador ??
      this.lastSubmittedMeta.comentariosContador ??
      null;

    const idContadores = Array.isArray(raw.idContadores) 
      ? raw.idContadores.filter((id: any) => id != null && id !== '').map((id: any) => this.toNumOrNull(id)).filter((id: any) => id != null)
      : [];
    
    const payload = {
      idValidador: this.toNumOrNull(raw.idValidador),
      idContadores: idContadores,
      idVehiculo: this.toNumOrNull(raw.idVehiculo),
      idCliente: this.toNumOrNull(raw.idCliente) ?? this.idClienteUser,
      estatus: this.toNumOrNull(raw.estatus) ?? 1,
      estatusValidadorAnterior: _estatusValAnt ?? null,
      contadoresAnteriores: _contadoresAnteriores,
      comentariosValidador: _comentVal,
      comentariosContador: _comentCon
    };

    const camposFaltantes: string[] = [];
    if (!raw.idValidador) camposFaltantes.push(etiquetas.idValidador);
    if (!raw.idVehiculo) camposFaltantes.push(etiquetas.idVehiculo);
    if (!raw.idCliente) camposFaltantes.push(etiquetas.idCliente);
    if (idContadores.length === 0) camposFaltantes.push(etiquetas.idContadores);
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

          // Actualizar "lo último enviado" para futuras actualizaciones parciales
          this.lastSubmittedMeta = {
            estatusValidadorAnterior: payload.estatusValidadorAnterior,
            contadoresAnteriores: payload.contadoresAnteriores,
            comentariosValidador: payload.comentariosValidador,
            comentariosContador: payload.comentariosContador
          };

          // Una vez enviado, puedes limpiar los "de esta sesión" si quieres:
          // (así forzamos a que si no modificas de nuevo, se use el lastSubmittedMeta)
          this.estatusValidadorAnterior = null;
          this.comentariosValidador = null;
          this.contadoresAnteriores = [];
          this.comentariosContador = null;

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
      } catch {}
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
          let validadores = this.ensureArray(
            resp.dispositivos ?? resp?.data?.dispositivos ?? resp?.data
          ).map(mapValidador);
          // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
          if (!this.idInstalacion) {
            validadores = validadores.filter((validador: any) => {
              const numeroSerie = (validador.numeroSerie || '').toString().toLowerCase();
              return !numeroSerie.includes('asignado');
            });
          }
          this.listaValidadores = validadores;
        }

        if (esError(resp.bluevox)) {
          errores.push(await this.getErrorMessage(resp.bluevox.__error));
        } else {
          let contadores = this.ensureArray(
            resp.bluevox ?? resp?.data?.bluevox ?? resp?.data
          ).map(mapContador);
          // Si estamos en modo agregar (no editar), filtrar los que contengan "Asignado"
          if (!this.idInstalacion) {
            contadores = contadores.filter((contador: any) => {
              const numeroSerie = (contador.numeroSerie || '').toString().toLowerCase();
              return !numeroSerie.includes('asignado');
            });
          }
          this.listaContadores = contadores;
        }

        const opts = { emitEvent: false };
        this.instalacionesForm.get('idValidador')?.enable(opts);
        const idContadoresArray = this.instalacionesForm.get('idContadores') as FormArray;
        idContadoresArray.controls.forEach((control: AbstractControl) => control.enable(opts));
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

  // Fusiona listas por id
  private mergeUniqueByIdPreferFilled(
    primary: any[] = [],
    secondary: any[] = [],
    fields: string[] = ['numeroSerie', 'marca', 'modelo']
  ): any[] {
    const score = (o: any) =>
      fields.reduce(
        (s, f) => s + (o && typeof o[f] === 'string' && o[f].trim() ? 1 : 0),
        0
      );

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
