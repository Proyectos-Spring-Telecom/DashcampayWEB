import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { UsuariosService } from 'src/app/pages/services/usuarios.service';

@Component({
  selector: 'vex-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrl: './alta-cliente.component.scss',
  animations: [fadeInRight400ms]
})
export class AltaClienteComponent {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public clienteForm!: FormGroup;
  public idCliente!: number;
  public title = 'Agregar Cliente';
  public listaClientes: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private clieService: ClientesService,
    private activatedRouted: ActivatedRoute,
    private route: Router,
    private usuaService: UsuariosService,
    private alerts: AlertsService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.initForm();
    this.activatedRouted.params.subscribe((params) => {
      this.idCliente = params['idCliente'];
      if (this.idCliente) {
        this.title = 'Actualizar Cliente';
        this.obtenerClienteID();
      }
    });
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe((response) => {
      this.listaClientes = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c.id),
      }));
    });
  }

  obtenerClienteID() {
    this.clieService
      .obtenerCliente(this.idCliente)
      .subscribe((response: any) => {
        const d = response?.data ?? {};
        this.clienteForm.patchValue({
          idPadre: Number(d.idPadre ?? 0),
          rfc: d.rfc ?? '',
          tipoPersona: d.tipoPersona ?? null,
          estatus: d.estatus ?? 1,
          logotipo: d.logotipo ?? null,
          nombre: d.nombre ?? '',
          apellidoPaterno: d.apellidoPaterno ?? null,
          apellidoMaterno: d.apellidoMaterno ?? null,
          telefono: d.telefono ?? '',
          correo: d.correo ?? '',
          estado: d.estado ?? '',
          municipio: d.municipio ?? '',
          colonia: d.colonia ?? '',
          calle: d.calle ?? '',
          entreCalles: d.entreCalles ?? '',
          numeroExterior: d.numeroExterior ?? '',
          numeroInterior: d.numeroInterior ?? '',
          cp: d.cp ?? '',
          nombreEncargado: d.nombreEncargado ?? '',
          telefonoEncargado: d.telefonoEncargado ?? '',
          correoEncargado: d.correoEncargado ?? '',
          sitioWeb: d.sitioWeb ?? '',
          constanciaSituacionFiscal: d.constanciaSituacionFiscal ?? null,
          comprobanteDomicilio: d.comprobanteDomicilio ?? null,
          actaConstitutiva: d.actaConstitutiva ?? null,
        });
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.clienteForm.patchValue({ Logotipo: file });
      this.clienteForm.get('Logotipo')?.markAsTouched();
      this.clienteForm.get('Logotipo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onTipoPersonaChange(_event: any) {
    const value: number | null = this.clienteForm.get('tipoPersona')!.value;

    if (value === 1) {
      this.clienteForm
        .get('apellidoPaterno')
        ?.setValidators([Validators.required]);
      this.clienteForm
        .get('apellidoMaterno')
        ?.setValidators([Validators.required]);
    } else if (value === 2) {
      this.clienteForm.get('apellidoPaterno')?.clearValidators();
      this.clienteForm.get('apellidoMaterno')?.clearValidators();
      this.clienteForm.patchValue({
        apellidoPaterno: null,
        apellidoMaterno: null,
      });
    }

    this.clienteForm.get('apellidoPaterno')?.updateValueAndValidity();
    this.clienteForm.get('apellidoMaterno')?.updateValueAndValidity();
  }

  sanitizeInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const sanitizedValue = inputElement.value.replace(/[^A-Za-z0-9]/g, '');
    inputElement.value = sanitizedValue.slice(0, 13);
    this.clienteForm
      .get('RFC')
      ?.setValue(inputElement.value, { emitEvent: false });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  private readonly DEFAULT_AVATAR_URL =
    'https://wallpapercat.com/w/full/9/5/a/945731-3840x2160-desktop-4k-matte-black-wallpaper-image.jpg';

  initForm() {
    this.clienteForm = this.fb.group({
      idPadre: [null],
      rfc: ['', Validators.required],
      tipoPersona: [null, Validators.required],
      estatus: [1, Validators.required],
      logotipo: [null, Validators.required],
      constanciaSituacionFiscal: [null, Validators.required],
      comprobanteDomicilio: [null, Validators.required],
      actaConstitutiva: [null, Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      entreCalles: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', Validators.required],
      cp: ['', Validators.required],
      nombreEncargado: ['', Validators.required],
      telefonoEncargado: ['', Validators.required],
      correoEncargado: ['', [Validators.required, Validators.email]],
      sitioWeb: [null],
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idCliente) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    // === Reglas dinámicas por tipoPersona ===
    const tipo = Number(this.clienteForm.get('tipoPersona')?.value ?? null);
    if (tipo === 1) {
      this.clienteForm.get('apellidoPaterno')?.setValidators([Validators.required]);
      this.clienteForm.get('apellidoMaterno')?.setValidators([Validators.required]);
    } else if (tipo === 2) {
      this.clienteForm.get('apellidoPaterno')?.clearValidators();
      this.clienteForm.get('apellidoMaterno')?.clearValidators();
      this.clienteForm.patchValue({ apellidoPaterno: null, apellidoMaterno: null });
    }
    this.clienteForm.get('apellidoPaterno')?.updateValueAndValidity({ emitEvent: false });
    this.clienteForm.get('apellidoMaterno')?.updateValueAndValidity({ emitEvent: false });

    // === Validación ===
    if (this.clienteForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        rfc: 'RFC',
        tipoPersona: 'Tipo de Persona',
        estatus: 'Estatus',
        logotipo: 'Logotipo',
        constanciaSituacionFiscal: 'Constancia de Situación Fiscal',
        comprobanteDomicilio: 'Comprobante de Domicilio',
        actaConstitutiva: 'Acta Constitutiva',
        nombre: 'Nombre / Razón Social',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        telefono: 'Teléfono',
        correo: 'Correo Electrónico',
        estado: 'Estado',
        municipio: 'Municipio',
        colonia: 'Colonia',
        calle: 'Calle',
        entreCalles: 'Entre Calles',
        numeroExterior: 'Número Exterior',
        numeroInterior: 'Número Interior',
        cp: 'Código Postal',
        nombreEncargado: 'Nombre del Encargado',
        telefonoEncargado: 'Teléfono del Encargado',
        correoEncargado: 'Email del Encargado',
      };

      const faltantes: string[] = [];
      Object.keys(this.clienteForm.controls).forEach((key) => {
        const c = this.clienteForm.get(key);
        if (c?.invalid && c.errors?.['required'])
          faltantes.push(etiquetas[key] || key);
      });

      const lista = faltantes
        .map(
          (campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `
        )
        .join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Ops!',
        message: `
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    // === Subir archivos (si aún son File) y enviar URLs en payload ===
    const extractFileUrl = (res: any) =>
      res?.url ??
      res?.Location ??
      res?.data?.url ??
      res?.data?.Location ??
      res?.key ??
      res?.Key ??
      res?.path ??
      res?.filePath ??
      '';

    const v = this.clienteForm.getRawValue(); // por si algo está disabled en el futuro
    const folder = 'clientes';
    const idModule = '50';

    const uploadOrPass$ = (val: any) => {
      if (val instanceof File) {
        const fd = new FormData();
        fd.append('file', val, val.name);
        fd.append('folder', folder);
        fd.append('idModule', idModule);
        return this.usuaService.uploadFile(fd).pipe(map(extractFileUrl));
      }
      return of(val ?? null); // ya es URL o null
    };

    forkJoin({
      logotipo: uploadOrPass$(v.logotipo),
      constanciaSituacionFiscal: uploadOrPass$(v.constanciaSituacionFiscal),
      comprobanteDomicilio: uploadOrPass$(v.comprobanteDomicilio),
      actaConstitutiva: uploadOrPass$(v.actaConstitutiva),
    })
      .pipe(
        switchMap((urls) => {
          const payload = {
            ...v,
            idPadre: v.idPadre != null ? Number(v.idPadre) : null,
            tipoPersona: v.tipoPersona != null ? Number(v.tipoPersona) : null,
            logotipo: urls.logotipo,
            constanciaSituacionFiscal: urls.constanciaSituacionFiscal,
            comprobanteDomicilio: urls.comprobanteDomicilio,
            actaConstitutiva: urls.actaConstitutiva,
          };
          return this.clieService.agregarCliente(payload);
        }),
        finalize(() => { this.loading = false; this.submitButton = 'Guardar'; })
      )
      .subscribe({
        next: () => {
          this.alerts.open({
            type: 'success',
            title: '¡Operación Exitosa!',
            message: 'Se agregó un nuevo cliente de manera exitosa.',
            confirmText: 'Confirmar',
            backdropClose: false,
          });
          this.regresar();
        },
        error: () => {
          this.alerts.open({
            type: 'error',
            title: '¡Ops!',
            message: 'Ocurrió un error al agregar el cliente.',
            confirmText: 'Confirmar',
            backdropClose: false,
          });
        }
      });
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    // === Reglas dinámicas por tipoPersona ===
    const tipo = Number(this.clienteForm.get('tipoPersona')?.value ?? null);
    if (tipo === 1) {
      this.clienteForm.get('apellidoPaterno')?.setValidators([Validators.required]);
      this.clienteForm
        .get('apellidoMaterno')
        ?.setValidators([Validators.required]);
    } else if (tipo === 2) {
      this.clienteForm.get('apellidoPaterno')?.clearValidators();
      this.clienteForm.get('apellidoMaterno')?.clearValidators();
      this.clienteForm.patchValue({
        apellidoPaterno: null,
        apellidoMaterno: null
      });
    }
    this.clienteForm
      .get('apellidoPaterno')
      ?.updateValueAndValidity({ emitEvent: false });
    this.clienteForm
      .get('apellidoMaterno')
      ?.updateValueAndValidity({ emitEvent: false });

    // === Validación ===
    if (this.clienteForm.invalid) {
      this.submitButton = 'Cargando...';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        idPadre: 'Id Padre',
        rfc: 'RFC',
        tipoPersona: 'Tipo de Persona',
        estatus: 'Estatus',
        logotipo: 'Logotipo',
        constanciaSituacionFiscal: 'Constancia de Situación Fiscal',
        comprobanteDomicilio: 'Comprobante de Domicilio',
        actaConstitutiva: 'Acta Constitutiva',
        nombre: 'Nombre / Razón Social',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        telefono: 'Teléfono',
        correo: 'Correo Electrónico',
        estado: 'Estado',
        municipio: 'Municipio',
        colonia: 'Colonia',
        calle: 'Calle',
        entreCalles: 'Entre Calles',
        numeroExterior: 'Número Exterior',
        numeroInterior: 'Número Interior',
        cp: 'Código Postal',
        nombreEncargado: 'Nombre del Encargado',
        telefonoEncargado: 'Teléfono del Encargado',
        correoEncargado: 'Email del Encargado',
      };

      const faltantes: string[] = [];
      Object.keys(this.clienteForm.controls).forEach((key) => {
        const c = this.clienteForm.get(key);
        if (c?.invalid && c.errors?.['required'])
          faltantes.push(etiquetas[key] || key);
      });

      // Enumeración numerada (1., 2., 3., …)
      const lista = faltantes
        .map(
          (campo, index) => `
      <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                  background: #caa8a8; text-align: center; margin-bottom: 8px;
                  border-radius: 4px;">
        <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
      </div>
    `
        )
        .join('');

      await this.alerts.open({
        type: 'warning',
        title: '¡Ops!',
        message: `
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Los siguientes <strong>campos obligatorios</strong> están vacíos.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false
      });
      return;
    }

    // === Subir archivos (si aún son File) y enviar URLs en payload ===
    const extractFileUrl = (res: any) =>
      res?.url ??
      res?.Location ??
      res?.data?.url ??
      res?.data?.Location ??
      res?.key ??
      res?.Key ??
      res?.path ??
      res?.filePath ??
      '';

    const v = this.clienteForm.getRawValue();
    const folder = 'clientes';
    const idModule = '50';

    const uploadOrPass$ = (val: any) => {
      if (val instanceof File) {
        const fd = new FormData();
        fd.append('file', val, val.name);
        fd.append('folder', folder);
        fd.append('idModule', idModule);
        return this.usuaService.uploadFile(fd).pipe(map(extractFileUrl));
      }
      return of(val ?? null);
    };

    forkJoin({
      logotipo: uploadOrPass$(v.logotipo),
      constanciaSituacionFiscal: uploadOrPass$(v.constanciaSituacionFiscal),
      comprobanteDomicilio: uploadOrPass$(v.comprobanteDomicilio),
      actaConstitutiva: uploadOrPass$(v.actaConstitutiva),
    })
      .pipe(
        switchMap((urls) => {
          const payload = {
            ...v,
            idPadre: v.idPadre != null ? Number(v.idPadre) : null,
            tipoPersona: v.tipoPersona != null ? Number(v.tipoPersona) : null,
            logotipo: urls.logotipo,
            constanciaSituacionFiscal: urls.constanciaSituacionFiscal,
            comprobanteDomicilio: urls.comprobanteDomicilio,
            actaConstitutiva: urls.actaConstitutiva,
          };
          return this.clieService.actualizarCliente(this.idCliente, payload);
        }),
        finalize(() => {
          this.loading = false;
          this.submitButton = 'Cargando...';
        })
      )
      .subscribe({
        next: () => {
          this.alerts.open({
            type: 'success',
            title: '¡Operación Exitosa!',
            message: 'Los datos del cliente se actualizaron correctamente.',
            confirmText: 'Confirmar',
            backdropClose: false,
          });
          this.regresar();
        },
        error: () => {
          this.alerts.open({
            type: 'error',
            title: '¡Ops!',
            message: 'Ocurrió un error al actualizar el cliente.',
            confirmText: 'Confirmar',
            backdropClose: false,
          });
        }
      });
  }

  regresar() {
    this.route.navigateByUrl('/administracion/clientes');
  }

  // ====== ViewChild inputs reales ======
  @ViewChild('logoFileInput') logoFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('csfFileInput') csfFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('compDomFileInput') compDomFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actaFileInput') actaFileInput!: ElementRef<HTMLInputElement>;

  // ====== Estado UI (dragging, nombres, preview, progreso) ======
  // Logotipo (imagen)
  logoDragging = false;
  logoFileName: string | null = null;
  logoPreviewUrl: string | null = null;
  uploadingLogo = false;

  // Constancia (PDF)
  csfDragging = false;
  csfFileName: string | null = null;
  uploadingCsf = false;

  // Comprobante (PDF)
  compDomDragging = false;
  compDomFileName: string | null = null;
  uploadingCompDom = false;

  // Acta (PDF)
  actaDragging = false;
  actaFileName: string | null = null;
  uploadingActa = false;

  // Límite (MB)
  readonly MAX_MB = 3;

  // ====== Utils ======
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
  private isImage(file: File) {
    return /^image\/(png|jpe?g|webp)$/i.test(file.type);
  }
  private isPdf(file: File) {
    return file.type === 'application/pdf';
  }
  private isAllowedImage(file: File) {
    return this.isImage(file) && file.size <= this.MAX_MB * 1024 * 1024;
  }
  private isAllowedPdf(file: File) {
    return this.isPdf(file) && file.size <= this.MAX_MB * 1024 * 1024;
  }
  private loadImagePreview(file: File, setter: (url: string | null) => void) {
    if (!this.isImage(file)) {
      setter(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  }

  // =========================================================
  //                     LOGOTIPO (IMAGEN)
  // =========================================================
  openLogoFilePicker() {
    this.logoFileInput?.nativeElement.click();
  }
  onLogoDragOver(e: DragEvent) {
    e.preventDefault();
    this.logoDragging = true;
  }
  onLogoDragLeave(_e: DragEvent) {
    this.logoDragging = false;
  }
  onLogoDrop(e: DragEvent) {
    e.preventDefault();
    this.logoDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleLogoFile(f);
  }
  onLogoFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0];
    if (f) this.handleLogoFile(f);
  }
  clearLogoFile(e: Event) {
    e.stopPropagation();
    this.logoPreviewUrl = null;
    this.logoFileName = null;
    if (this.logoFileInput) this.logoFileInput.nativeElement.value = '';
    this.clienteForm.patchValue({ logotipo: null });
    this.clienteForm.get('logotipo')?.setErrors({ required: true });
  }
  private handleLogoFile(file: File) {
    if (!this.isAllowedImage(file)) {
      this.clienteForm.get('logotipo')?.setErrors({ invalid: true });
      return;
    }
    this.logoFileName = file.name;
    this.loadImagePreview(file, (url) => (this.logoPreviewUrl = url));
    this.clienteForm.patchValue({ logotipo: file });
    this.clienteForm.get('logotipo')?.setErrors(null);
    this.uploadLogo(file);
  }
  private uploadLogo(file: File) {
    if (this.uploadingLogo) return;
    this.uploadingLogo = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'clientes');
    fd.append('idModule', '1'); // ajusta si tu backend usa otro id

    this.usuaService.uploadFile(fd)
      .pipe(finalize(() => (this.uploadingLogo = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.clienteForm.patchValue({ logotipo: url });
            this.logoFileName = file.name; // mantenemos preview
          }
        },
        error: (err: any) => {
          console.error('[UPLOAD][logotipo]', err);
          // Opcional: limpiar en error
          // this.clearLogoFile(new Event('clear'));
        }
      });
  }

  // =========================================================
  //      CONSTANCIA DE SITUACIÓN FISCAL (PDF)
  // =========================================================
  openCsfFilePicker() {
    this.csfFileInput?.nativeElement.click();
  }
  onCsfDragOver(e: DragEvent) {
    e.preventDefault();
    this.csfDragging = true;
  }
  onCsfDragLeave(_e: DragEvent) {
    this.csfDragging = false;
  }
  onCsfDrop(e: DragEvent) {
    e.preventDefault();
    this.csfDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleCsfFile(f);
  }
  onCsfFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0];
    if (f) this.handleCsfFile(f);
  }
  clearCsfFile(e: Event) {
    e.stopPropagation();
    this.csfFileName = null;
    if (this.csfFileInput) this.csfFileInput.nativeElement.value = '';
    this.clienteForm.patchValue({ constanciaSituacionFiscal: null });
    this.clienteForm.get('constanciaSituacionFiscal')?.setErrors({ required: true });
  }
  private handleCsfFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.clienteForm.get('constanciaSituacionFiscal')?.setErrors({ invalid: true });
      return;
    }
    this.csfFileName = file.name;
    this.clienteForm.patchValue({ constanciaSituacionFiscal: file });
    this.clienteForm.get('constanciaSituacionFiscal')?.setErrors(null);
    this.uploadCsf(file);
  }
  private uploadCsf(file: File) {
    if (this.uploadingCsf) return;
    this.uploadingCsf = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'clientes');
    fd.append('idModule', '1');

    this.usuaService.uploadFile(fd).pipe(finalize(() => (this.uploadingCsf = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.clienteForm.patchValue({ constanciaSituacionFiscal: url });
            this.csfFileName = file.name;
          }
        },
        error: (err: any) => {
          console.error('[UPLOAD][constanciaSituacionFiscal]', err);
        }
      });
  }

  // =========================================================
  //        COMPROBANTE DE DOMICILIO (PDF)
  // =========================================================
  openCompDomFilePicker() {
    this.compDomFileInput?.nativeElement.click();
  }
  onCompDomDragOver(e: DragEvent) {
    e.preventDefault();
    this.compDomDragging = true;
  }
  onCompDomDragLeave(_e: DragEvent) {
    this.compDomDragging = false;
  }
  onCompDomDrop(e: DragEvent) {
    e.preventDefault();
    this.compDomDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleCompDomFile(f);
  }
  onCompDomFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0];
    if (f) this.handleCompDomFile(f);
  }
  clearCompDomFile(e: Event) {
    e.stopPropagation();
    this.compDomFileName = null;
    if (this.compDomFileInput) this.compDomFileInput.nativeElement.value = '';
    this.clienteForm.patchValue({ comprobanteDomicilio: null });
    this.clienteForm.get('comprobanteDomicilio')?.setErrors({ required: true });
  }
  private handleCompDomFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.clienteForm.get('comprobanteDomicilio')?.setErrors({ invalid: true });
      return;
    }
    this.compDomFileName = file.name;
    this.clienteForm.patchValue({ comprobanteDomicilio: file });
    this.clienteForm.get('comprobanteDomicilio')?.setErrors(null);
    this.uploadCompDom(file);
  }
  private uploadCompDom(file: File) {
    if (this.uploadingCompDom) return;
    this.uploadingCompDom = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'clientes');
    fd.append('idModule', '1');

    this.usuaService.uploadFile(fd).pipe(finalize(() => (this.uploadingCompDom = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.clienteForm.patchValue({ comprobanteDomicilio: url });
            this.compDomFileName = file.name;
          }
        },
        error: (err: any) => {
          console.error('[UPLOAD][comprobanteDomicilio]', err);
        }
      });
  }

  // =========================================================
  //           ACTA CONSTITUTIVA (PDF)
  // =========================================================
  openActaFilePicker() {
    this.actaFileInput?.nativeElement.click();
  }
  onActaDragOver(e: DragEvent) {
    e.preventDefault();
    this.actaDragging = true;
  }
  onActaDragLeave(_e: DragEvent) {
    this.actaDragging = false;
  }
  onActaDrop(e: DragEvent) {
    e.preventDefault();
    this.actaDragging = false;
    const f = e.dataTransfer?.files?.[0];
    if (f) this.handleActaFile(f);
  }
  onActaFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0];
    if (f) this.handleActaFile(f);
  }
  clearActaFile(e: Event) {
    e.stopPropagation();
    this.actaFileName = null;
    if (this.actaFileInput) this.actaFileInput.nativeElement.value = '';
    this.clienteForm.patchValue({ actaConstitutiva: null });
    this.clienteForm.get('actaConstitutiva')?.setErrors({ required: true });
  }
  private handleActaFile(file: File) {
    if (!this.isAllowedPdf(file)) {
      this.clienteForm.get('actaConstitutiva')?.setErrors({ invalid: true });
      return;
    }
    this.actaFileName = file.name;
    this.clienteForm.patchValue({ actaConstitutiva: file });
    this.clienteForm.get('actaConstitutiva')?.setErrors(null);
    this.uploadActa(file);
  }
  private uploadActa(file: File) {
    if (this.uploadingActa) return;
    this.uploadingActa = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'clientes');
    fd.append('idModule', '1');

    this.usuaService
      .uploadFile(fd)
      .pipe(finalize(() => (this.uploadingActa = false)))
      .subscribe({
        next: (res: any) => {
          const url = this.extractFileUrl(res);
          if (url) {
            this.clienteForm.patchValue({ actaConstitutiva: url });
            this.actaFileName = file.name;
          }
        },
        error: (err: any) => {
          console.error('[UPLOAD][actaConstitutiva]', err);
        }
      });
  }
}
