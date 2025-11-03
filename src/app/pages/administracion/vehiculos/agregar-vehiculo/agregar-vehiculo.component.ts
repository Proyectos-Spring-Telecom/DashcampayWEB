import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { finalize } from 'rxjs';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { DispositivosService } from 'src/app/pages/services/dispositivos.service';
import { OperadoresService } from 'src/app/pages/services/operadores.service';
import { UsuariosService } from 'src/app/pages/services/usuarios.service';
import { VehiculosService } from 'src/app/pages/services/vehiculos.service';

@Component({
  selector: 'vex-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrl: './agregar-vehiculo.component.scss',
  animations: [fadeInRight400ms]
})
export class AgregarVehiculoComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public vehiculosForm!: FormGroup;
  public idVehiculo!: number;
  public title = 'Agregar Vehículo';
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;
  public listaOperadores: any;
  listaDispositivos: any;
  public listaClientes: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private opService: OperadoresService,
    private vehiService: VehiculosService,
    private activatedRouted: ActivatedRoute,
    private disposService: DispositivosService,
    private usuaService: UsuariosService,
    private clieService: ClientesService,
    private alerts: AlertsService
  ) {}

  ngOnInit(): void {
    this.obtenerOperadores();
    this.obtenerDispositivos();
    this.obtenerClientes();
    this.initForm();
    this.activatedRouted.params.subscribe((params) => {
      this.idVehiculo = params['idVehiculo'];
      if (this.idVehiculo) {
        this.title = 'Actualizar Vehículo';
        this.obtenerVehiculoID();
      }
    });
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe((response) => {
      this.listaClientes = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c?.id ?? c?.Id ?? c?.ID)
      }));
    });
  }

  obtenerDispositivos() {
    this.loading = true;
    this.disposService.obtenerDispositivos().subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);

        if (Array.isArray(res?.dispositivos)) {
          this.listaDispositivos = [...res.dispositivos].sort(
            (a: any, b: any) => b.Id - a.Id
          );
        } else {
          console.error('El formato de datos recibido no es el esperado.');
        }
      },
      error: (error: unknown) => {
        this.loading = false;
        console.error('Error al obtener dispositivos:', error);
      }
    });
  }

  obtenerOperadores() {
    this.loading = true;
    this.opService.obtenerOperadores().subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 2000);

        this.listaOperadores = (res?.operadores ?? [])
          .map((op: any) => ({
            ...op,
            FechaNacimiento: op.FechaNacimiento
              ? op.FechaNacimiento.split('T')[0]
              : ''
          }))
          .sort((a: any, b: any) => b.Id - a.Id);
      },
      error: (error: unknown) => {
        this.loading = false;
        console.error('Error al obtener operadores:', error);
      }
    });
  }

  obtenerVehiculoID() {
    this.vehiService
      .obtenerVehiculo(this.idVehiculo)
      .subscribe((response: any) => {
        const raw = Array.isArray(response?.data)
          ? response.data[0]
          : response?.vehiculo ?? response?.data ?? response ?? {};

        const get = (o: any, keys: string[]) => {
          for (const k of keys)
            if (o?.[k] !== undefined && o?.[k] !== null) return o[k];
          return null;
        };

        const marca = get(raw, ['marca', 'Marca']);
        const modelo = get(raw, ['modelo', 'Modelo']);
        const ano = get(raw, ['ano', 'año', 'Ano', 'Año']);
        const placa = get(raw, ['placa', 'Placa']);
        const numeroEconomico = get(raw, [
          'numeroEconomico',
          'NumeroEconomico'
        ]);
        const tarjetaCirculacion = get(raw, [
          'tarjetaCirculacion',
          'TarjetaCirculacion'
        ]);
        const polizaSeguro = get(raw, ['polizaSeguro', 'PolizaSeguro']);
        const permisoConcesion = get(raw, [
          'permisoConcesion',
          'PermisoConcesion'
        ]);
        const inspeccionMecanica = get(raw, [
          'inspeccionMecanica',
          'InspeccionMecanica'
        ]);
        const foto = get(raw, ['foto', 'Foto']);
        const est = get(raw, ['estatus', 'Estatus']);
        const idCli = get(raw, [
          'idCliente',
          'idcliente',
          'IdCliente',
          'IDCliente'
        ]);

        this.vehiculosForm.patchValue({
          marca: marca ?? '',
          modelo: modelo ?? '',
          ano: ano ?? '',
          placa: placa ?? '',
          numeroEconomico: numeroEconomico ?? '',
          tarjetaCirculacion: tarjetaCirculacion ?? '',
          polizaSeguro: polizaSeguro ?? '',
          permisoConcesion: permisoConcesion ?? '',
          inspeccionMecanica: inspeccionMecanica ?? '',
          foto: foto ?? null,
          estatus: est != null && !Number.isNaN(Number(est)) ? Number(est) : 1,
          idCliente: idCli != null && idCli !== '' ? Number(idCli) : null
        });
      });
  }

  initForm() {
    this.vehiculosForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [null, Validators.required],
      placa: ['', Validators.required],
      numeroEconomico: ['', Validators.required],
      tarjetaCirculacion: ['', Validators.required],
      polizaSeguro: ['', Validators.required],
      permisoConcesion: ['', Validators.required],
      inspeccionMecanica: ['', Validators.required],
      foto: ['', Validators.required],
      estatus: [1, Validators.required],
      idCliente: [null, Validators.required]
      // idOperador: ['', Validators.required],
      // idDispositivo: ['', Validators.required],
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idVehiculo) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.vehiculosForm.invalid) {
  this.submitButton = 'Guardar';
  this.loading = false;

  const etiquetas: Record<string, string> = {
    marca: 'Marca',
    modelo: 'Modelo',
    ano: 'Año',
    placa: 'Placa',
    numeroEconomico: 'Número Económico',
    idCliente: 'Cliente',
    tarjetaCirculacion: 'Tarjeta de Circulación',
    polizaSeguro: 'Póliza de Seguro',
    permisoConcesion: 'Permiso de Concesión',
    inspeccionMecanica: 'Inspección Mecánica',
    foto: 'Foto',
  };

  const camposFaltantes: string[] = [];
  Object.keys(this.vehiculosForm.controls).forEach((key) => {
    const control = this.vehiculosForm.get(key);
    if (control?.invalid && control.errors?.['required']) {
      camposFaltantes.push(etiquetas[key] || key);
    }
  });

  const lista = camposFaltantes.map((campo, i) => `
    <div style="padding:8px 12px; border-left:4px solid #d9534f; background:#caa8a8; text-align:center; margin-bottom:8px; border-radius:4px;">
      <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
    </div>
  `).join('');

  await this.alerts.open({
    type: 'warning',
    title: '¡Ops!',
    message: `
      <p style="text-align:center; font-size:15px; margin-bottom:16px;">
        Hay campos obligatorios sin completar.
      </p>
      <div style="max-height:350px; overflow-y:auto;">${lista}</div>
    `,
    confirmText: 'Entendido',
    backdropClose: false,
  });
  return;
}

    this.vehiculosForm.removeControl('id');
    const raw = this.vehiculosForm.getRawValue();
    const payload = { ...raw, ano: Number(raw.ano) };

    this.vehiService.agregarVehiculo(payload).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo vehículo de manera exitosa.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
        this.regresar();
      },
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al agregar el vehículo.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.vehiculosForm.invalid) {
  this.submitButton = 'Guardar';
  this.loading = false;

  const etiquetas: Record<string, string> = {
    marca: 'Marca',
    modelo: 'Modelo',
    ano: 'Año',
    placa: 'Placa',
    numeroEconomico: 'Número Económico',
    idCliente: 'Cliente',
    tarjetaCirculacion: 'Tarjeta de Circulación',
    polizaSeguro: 'Póliza de Seguro',
    permisoConcesion: 'Permiso de Concesión',
    inspeccionMecanica: 'Inspección Mecánica',
    foto: 'Foto',
  };

  const camposFaltantes: string[] = [];
  Object.keys(this.vehiculosForm.controls).forEach((key) => {
    const control = this.vehiculosForm.get(key);
    if (control?.invalid && control.errors?.['required']) {
      camposFaltantes.push(etiquetas[key] || key);
    }
  });

  const lista = camposFaltantes.map((campo, i) => `
    <div style="padding:8px 12px; border-left:4px solid #d9534f; background:#caa8a8; text-align:center; margin-bottom:8px; border-radius:4px;">
      <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
    </div>
  `).join('');

  await this.alerts.open({
    type: 'warning',
    title: '¡Ops!',
    message: `
      <p style="text-align:center; font-size:15px; margin-bottom:16px;">
        Hay campos obligatorios sin completar.
      </p>
      <div style="max-height:350px; overflow-y:auto;">${lista}</div>
    `,
    confirmText: 'Entendido',
    backdropClose: false,
  });
  return;
}


    const raw = this.vehiculosForm.getRawValue();
    const payload = { ...raw, ano: Number(raw.ano) };

    this.vehiService.actualizarVehiculo(this.idVehiculo, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del vehículo se actualizaron correctamente.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
        this.regresar();
      },
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al actualizar el vehículo.',
          confirmText: 'Confirmar',
          backdropClose: false
        });
      }
    );
  }

  regresar() {
    this.route.navigateByUrl('/administracion/vehiculos');
  }

  readonly MAX_MB = 3;
  fotoPreviewUrl: string | null = null;

  private loadImagePreview(file: File, setter: (url: string | null) => void) {
    if (!this.isImage(file)) {
      setter(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  }

  @ViewChild('tcFileInput') tcFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('polizaFileInput') polizaFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('permisoFileInput')
  permisoFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('inspeccionFileInput')
  inspeccionFileInput!: ElementRef<HTMLInputElement>;

  tcDragging = false;
  polizaDragging = false;
  permisoDragging = false;
  inspeccionDragging = false;
  tcFileName: string | null = null;
  polizaFileName: string | null = null;
  permisoFileName: string | null = null;
  inspeccionFileName: string | null = null;
  tcPreviewUrl: null = null;
  polizaPreviewUrl: null = null;
  permisoPreviewUrl: null = null;
  inspeccionPreviewUrl: null = null; // PDFs: sin preview
  uploadingTc = false;
  uploadingPoliza = false;
  uploadingPermiso = false;
  uploadingInspeccion = false;

  private extractFileUrl(res: any): string {
    return (
      res?.url ??
      res?.Location ??
      res?.data?.url ??
      res?.data?.Location ??
      res?.key ??
      res?.Key ??
      res?.path ??
      res?.filePath ??
      ''
    );
  }

  private isAllowed(file: File) {
    const okImg = this.isImage(file);
    const okDoc = /(pdf|msword|officedocument|excel)/i.test(file.type);
    return (okImg || okDoc) && file.size <= this.MAX_MB * 1024 * 1024;
  }

  private isImage(file: File) {
    return /^image\/(png|jpe?g|webp)$/i.test(file.type);
  }

  // tarjeta circulación
  openTcFilePicker() {
    this.tcFileInput.nativeElement.click();
  }
  onTcDragOver(e: DragEvent) {
    e.preventDefault();
    this.tcDragging = true;
  }
  onTcDragLeave(_e: DragEvent) {
    this.tcDragging = false;
  }
  onTcDrop(e: DragEvent) {
    e.preventDefault();
    this.tcDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleTcFile(f);
  }
  onTcFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.handleTcFile(f);
  }
  clearTcFile(e: Event) {
    e.stopPropagation();
    this.tcPreviewUrl = null;
    this.tcFileName = null;
    this.tcFileInput.nativeElement.value = '';
    this.vehiculosForm.patchValue({ tarjetaCirculacion: null });
    this.vehiculosForm.get('tarjetaCirculacion')?.setErrors({ required: true });
  }
  private handleTcFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.vehiculosForm
        .get('tarjetaCirculacion')
        ?.setErrors({ invalid: true });
      return;
    }
    this.tcFileName = file.name;
    this.vehiculosForm.patchValue({ tarjetaCirculacion: file });
    this.vehiculosForm.get('tarjetaCirculacion')?.setErrors(null);
    this.uploadTarjeta(file);
  }
  private uploadTarjeta(file: File): void {
    if (this.uploadingTc) return;
    this.uploadingTc = true;
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'vehiculos');
    fd.append('idModule', '10');

    this.usuaService
      .uploadFile(fd)
      .pipe(
        finalize(() => (this.uploadingTc = false)) // <-- siempre apaga
      )
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.vehiculosForm.patchValue({ tarjetaCirculacion: url });
            this.tcPreviewUrl = null;
            this.tcFileName = file.name;
          }
        },
        error: (err) => console.error('[UPLOAD][tarjetaCirculacion]', err)
      });
  }

  // póliza seguro
  openPolizaFilePicker() {
    this.polizaFileInput.nativeElement.click();
  }
  onPolizaDragOver(e: DragEvent) {
    e.preventDefault();
    this.polizaDragging = true;
  }
  onPolizaDragLeave(_e: DragEvent) {
    this.polizaDragging = false;
  }
  onPolizaDrop(e: DragEvent) {
    e.preventDefault();
    this.polizaDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handlePolizaFile(f);
  }
  onPolizaFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.handlePolizaFile(f);
  }
  clearPolizaFile(e: Event) {
    e.stopPropagation();
    this.polizaPreviewUrl = null;
    this.polizaFileName = null;
    this.polizaFileInput.nativeElement.value = '';
    this.vehiculosForm.patchValue({ polizaSeguro: null });
    this.vehiculosForm.get('polizaSeguro')?.setErrors({ required: true });
  }
  private handlePolizaFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.vehiculosForm.get('polizaSeguro')?.setErrors({ invalid: true });
      return;
    }
    this.polizaFileName = file.name;
    this.vehiculosForm.patchValue({ polizaSeguro: file });
    this.vehiculosForm.get('polizaSeguro')?.setErrors(null);
    this.uploadPoliza(file);
  }
  private uploadPoliza(file: File): void {
    if (this.uploadingPoliza) return;
    this.uploadingPoliza = true;
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'vehiculos');
    fd.append('idModule', '10');

    this.usuaService
      .uploadFile(fd)
      .pipe(finalize(() => (this.uploadingPoliza = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.vehiculosForm.patchValue({ polizaSeguro: url });
            this.polizaPreviewUrl = null;
            this.polizaFileName = file.name;
          }
        },
        error: (err) => console.error('[UPLOAD][polizaSeguro]', err)
      });
  }

  // permiso concesión
  openPermisoFilePicker() {
    this.permisoFileInput.nativeElement.click();
  }
  onPermisoDragOver(e: DragEvent) {
    e.preventDefault();
    this.permisoDragging = true;
  }
  onPermisoDragLeave(_e: DragEvent) {
    this.permisoDragging = false;
  }
  onPermisoDrop(e: DragEvent) {
    e.preventDefault();
    this.permisoDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handlePermisoFile(f);
  }
  onPermisoFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.handlePermisoFile(f);
  }
  clearPermisoFile(e: Event) {
    e.stopPropagation();
    this.permisoPreviewUrl = null;
    this.permisoFileName = null;
    this.permisoFileInput.nativeElement.value = '';
    this.vehiculosForm.patchValue({ permisoConcesion: null });
    this.vehiculosForm.get('permisoConcesion')?.setErrors({ required: true });
  }
  private handlePermisoFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.vehiculosForm.get('permisoConcesion')?.setErrors({ invalid: true });
      return;
    }
    this.permisoFileName = file.name;
    this.vehiculosForm.patchValue({ permisoConcesion: file });
    this.vehiculosForm.get('permisoConcesion')?.setErrors(null);
    this.uploadPermiso(file);
  }
  private uploadPermiso(file: File): void {
    if (this.uploadingPermiso) return;
    this.uploadingPermiso = true;
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'vehiculos');
    fd.append('idModule', '10');

    this.usuaService
      .uploadFile(fd)
      .pipe(finalize(() => (this.uploadingPermiso = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.vehiculosForm.patchValue({ permisoConcesion: url });
            this.permisoPreviewUrl = null;
            this.permisoFileName = file.name;
          }
        },
        error: (err) => console.error('[UPLOAD][permisoConcesion]', err)
      });
  }

  // inspección mecánica
  openInspeccionFilePicker() {
    this.inspeccionFileInput.nativeElement.click();
  }
  onInspeccionDragOver(e: DragEvent) {
    e.preventDefault();
    this.inspeccionDragging = true;
  }
  onInspeccionDragLeave(_e: DragEvent) {
    this.inspeccionDragging = false;
  }
  onInspeccionDrop(e: DragEvent) {
    e.preventDefault();
    this.inspeccionDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleInspeccionFile(f);
  }
  onInspeccionFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.handleInspeccionFile(f);
  }
  clearInspeccionFile(e: Event) {
    e.stopPropagation();
    this.inspeccionPreviewUrl = null;
    this.inspeccionFileName = null;
    this.inspeccionFileInput.nativeElement.value = '';
    this.vehiculosForm.patchValue({ inspeccionMecanica: null });
    this.vehiculosForm.get('inspeccionMecanica')?.setErrors({ required: true });
  }
  private handleInspeccionFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.vehiculosForm
        .get('inspeccionMecanica')
        ?.setErrors({ invalid: true });
      return;
    }
    this.inspeccionFileName = file.name;
    this.vehiculosForm.patchValue({ inspeccionMecanica: file });
    this.vehiculosForm.get('inspeccionMecanica')?.setErrors(null);
    this.uploadInspeccion(file);
  }
  private uploadInspeccion(file: File): void {
    if (this.uploadingInspeccion) return;
    this.uploadingInspeccion = true;
    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'vehiculos');
    fd.append('idModule', '10');

    this.usuaService
      .uploadFile(fd)
      .pipe(finalize(() => (this.uploadingInspeccion = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.vehiculosForm.patchValue({ inspeccionMecanica: url });
            this.inspeccionPreviewUrl = null;
            this.inspeccionFileName = file.name;
          }
        },
        error: (err) => console.error('[UPLOAD][inspeccionMecanica]', err)
      });
  }

  // 1) util: solo PDF (máx MB)
  private isAllowedPdf(file: File) {
    return (
      file.type === 'application/pdf' && file.size <= this.MAX_MB * 1024 * 1024
    );
  }

  // === ViewChild y estado ===
  @ViewChild('fotoFileInput') fotoFileInput!: ElementRef<HTMLInputElement>;
  // Oculta mensajes de 'required' en el template
  showRequiredMsgs = false;

  fotoFileName: string | null = null;
  fotoDragging = false;
  uploadingFoto = false;

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  private isAllowedImage(file: File) {
    return this.isImage(file) && file.size <= this.MAX_MB * 1024 * 1024;
  }

  openFotoFilePicker() {
    this.fotoFileInput.nativeElement.click();
  }

  onFotoDragOver(e: DragEvent) {
    e.preventDefault();
    this.fotoDragging = true;
  }
  onFotoDragLeave(_e: DragEvent) {
    this.fotoDragging = false;
  }
  onFotoDrop(e: DragEvent) {
    e.preventDefault();
    this.fotoDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleFotoFile(f);
  }

  onFotoFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.handleFotoFile(f);
  }

  clearFotoFile(e: Event) {
    e.stopPropagation();
    this.fotoPreviewUrl = null;
    this.fotoFileName = null;
    this.fotoFileInput.nativeElement.value = '';
    this.vehiculosForm.patchValue({ foto: null });
    this.vehiculosForm.get('foto')?.setErrors({ required: true });
  }

  private handleFotoFile(file: File) {
    if (!this.isAllowedImage(file)) {
      this.vehiculosForm.get('foto')?.setErrors({ invalid: true });
      return;
    }
    this.fotoFileName = file.name;
    this.loadImagePreview(file, (url) => (this.fotoPreviewUrl = url));
    this.vehiculosForm.patchValue({ foto: file });
    this.vehiculosForm.get('foto')?.setErrors(null);
    this.uploadFoto(file);
  }

  private uploadFoto(file: File): void {
    if (this.uploadingFoto) return;
    this.uploadingFoto = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'vehiculos');
    fd.append('idModule', '10');

    this.usuaService.uploadFile(fd).subscribe({
      next: (res: any) => {
        const url = this.extractFileUrl(res);
        if (url) {
          this.vehiculosForm.patchValue({ foto: url });
          this.fotoPreviewUrl = this.fotoPreviewUrl;
          this.fotoFileName = file.name;
        }
      },
      error: (err: any) => {
        console.error('[UPLOAD][foto]', err);
        // Si quieres, puedes dejar el File o limpiar:
        // this.vehiculosForm.patchValue({ foto: null });
        // this.fotoPreviewUrl = null;
        // this.fotoFileName = null;
        // this.vehiculosForm.get('foto')?.setErrors({ uploadFailed: true });
      },
      complete: () => {
        this.uploadingFoto = false;
      }
    });
  }
}
