import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { ClientesService } from 'src/app/pages/services/clientes.service';
import { OperadoresService } from 'src/app/pages/services/operadores.service';
import { UsuariosService } from 'src/app/pages/services/usuarios.service';

@Component({
  selector: 'vex-agregar-operador',
  templateUrl: './agregar-operador.component.html',
  styleUrl: './agregar-operador.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarOperadorComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public operadorForm!: FormGroup;
  public idOperador!: number;
  public listaUsuarios: any;
  public title = 'Agregar Operador';
  public showUsuario: boolean = true;
  public showCliente: any;
  listaClientes: any[] = [];
  public idClienteUser: number = 0;
  public selectedClienteId: number | null = null;
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private operService: OperadoresService,
    private activatedRouted: ActivatedRoute,
    private route: Router,
    private usuaService: UsuariosService,
    private alerts: AlertsService,
    private users: AuthenticationService,
    private clieService: ClientesService
  ) {
    const user = this.users.getUser();
    this.showCliente = user?.rol?.nombre === 'SA';
    this.idClienteUser = Number(user?.idCliente);
  }

  ngOnInit(): void {
    this.initForm();

    if (this.showCliente) {
      this.obtenerClientes();
      this.listaUsuarios = [];
      this.operadorForm.patchValue({ idUsuario: null });
    } else {
      this.obtenerUsuarios(this.idClienteUser);
    }

    this.activatedRouted.params.subscribe(params => {
      this.idOperador = params['idOperador'];
      if (this.idOperador) {
        this.title = 'Actualizar Operador';
        this.submitButton = 'Actualizar';
        this.obtenerOperadorID();
        this.operadorForm.controls['idUsuario'].disable();
      }
    });
  }

  obtenerClientes() {
    this.clieService.obtenerClientes().subscribe({
      next: (response: any) => {
        this.listaClientes = (response?.data || []).map((x: any) => ({
          ...x,
          id: Number(x?.id ?? x?.Id ?? x?.ID),
        }));
      },
      error: () => {
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'No fue posible obtener la lista de clientes.',
          confirmText: 'Aceptar',
          backdropClose: false,
        });
      },
    });
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

  private pickId(obj: any, keys: string[]): any {
    for (const k of keys)
      if (obj?.[k] !== undefined && obj?.[k] !== null) return obj[k];
    return null;
  }

  obtenerOperadorID() {
    this.operService.obtenerOperador(this.idOperador).subscribe((response: any) => {
      const raw = Array.isArray(response?.data)
        ? response.data[0]
        : response?.operador ?? response?.data ?? response ?? {};

      const get = (o: any, keys: string[]) => {
        for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null) return o[k];
        return null;
      };

      const lic = this.operadorForm.get('licencia')?.value;
      if (typeof lic === 'string' && /\.(png|jpe?g|webp|gif|bmp)(\?.*)?$/i.test(lic)) {
        this.licPreviewUrl = lic;
        this.licFileName = lic.split('/').pop() || '';
      } else {
        this.licPreviewUrl = null;
        this.licFileName = null;
      }

      const numeroLicencia = get(raw, ['numeroLicencia', 'NumeroLicencia']);
      const fechaNacimientoRaw = get(raw, ['fechaNacimiento', 'FechaNacimiento']);
      const idUsuario = get(raw, ['idUsuario', 'IdUsuario']);
      const estatus = get(raw, ['estatus', 'Estatus']);
      const identificacion = get(raw, ['identificacion', 'Identificacion']);
      const comprobanteDomicilio = get(raw, ['comprobanteDomicilio', 'ComprobanteDomicilio']);
      const antecedentesNoPenales = get(raw, ['antecedentesNoPenales', 'AntecedentesNoPenales']);
      const licencia = get(raw, ['licencia', 'Licencia']);

      const fechaNacimiento = fechaNacimientoRaw
        ? fechaNacimientoRaw.split('T')[0]
        : null;

      this.operadorForm.patchValue({
        numeroLicencia: numeroLicencia ?? '',
        fechaNacimiento,
        idUsuario: idUsuario != null ? Number(idUsuario) : null,
        estatus: estatus != null ? Number(estatus) : 1,
        identificacion: identificacion ?? null,
        comprobanteDomicilio: comprobanteDomicilio ?? null,
        antecedentesNoPenales: antecedentesNoPenales ?? null,
        licencia: licencia ?? null,
      });
    });
  }

  obtenerUsuarios(clienteId: number) {
    this.usuaService.obtenerUsuariosRolOperador(clienteId).subscribe((response) => {
      this.listaUsuarios = (response.data || []).map((c: any) => ({
        ...c,
        id: Number(c?.id ?? c?.Id ?? c?.ID),
      }));

      if (!this.listaUsuarios.length) {
        this.operadorForm.patchValue({ idUsuario: null });
      }

    });
  }

  onClienteChange(id: number) {
    this.selectedClienteId = id;
    if (id) {
      this.obtenerUsuarios(id);
    } else {
      this.listaUsuarios = [];
      this.operadorForm.patchValue({ idUsuario: null });
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  initForm() {
    this.operadorForm = this.fb.group({
      numeroLicencia: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      identificacion: ['', Validators.required],
      comprobanteDomicilio: ['', Validators.required],
      antecedentesNoPenales: ['', Validators.required],
      estatus: [1, Validators.required],
      licencia: ['', Validators.required],
      idUsuario: [null, Validators.required]
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idOperador) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.operadorForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        numeroLicencia: 'Número de Licencia',
        fechaNacimiento: 'Fecha de Nacimiento',
        idUsuario: 'Usuario',
        licencia: 'Licencia de Conducir',
        identificacion: 'Identificación',
        comprobanteDomicilio: 'Comprobante de Domicilio',
        antecedentesNoPenales: 'Antecedentes No Penales',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.operadorForm.controls).forEach(key => {
        const control = this.operadorForm.get(key);
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
        <p style="text-align:center; font-size:15px; margin-bottom:16px;">
          Hay campos obligatorios sin completar.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    this.operadorForm.removeControl('id');
    this.operService.agregarOperador(this.operadorForm.value).subscribe(
      () => {
        this.submitButton = 'Guardar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nuevo operador de manera exitosa.',
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
          message: 'Ocurrió un error al agregar el operador.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.operadorForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: any = {
        numeroLicencia: 'Número de Licencia',
        fechaNacimiento: 'Fecha de Nacimiento',
        idUsuario: 'Usuario',
        licencia: 'Licencia de Conducir',
        identificacion: 'Identificación',
        comprobanteDomicilio: 'Comprobante de Domicilio',
        antecedentesNoPenales: 'Antecedentes No Penales',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.operadorForm.controls).forEach(key => {
        const control = this.operadorForm.get(key);
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
        <p style="text-align:center; font-size:15px; margin-bottom:16px;">
          Hay campos obligatorios sin completar.
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
        confirmText: 'Entendido',
        backdropClose: false,
      });
      return;
    }

    // clona y elimina idUsuario antes de enviar (como en tu versión)
    const payload = { ...this.operadorForm.value };
    this.operService.actualizarOperador(this.idOperador, payload).subscribe(
      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos del operador se actualizaron correctamente.',
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
          message: 'Ocurrió un error al actualizar el operador.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  regresar() {
    const clienteEfectivo = this.showCliente
      ? (this.selectedClienteId ?? this.idClienteUser)
      : this.idClienteUser;

    this.route.navigate(['/administracion/operadores'], {
      queryParams: { clienteId: clienteEfectivo }
    });
  }


  // ====== ViewChilds de inputs de archivo ======
  @ViewChild('identFileInput') identFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('domFileInput') domFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('antFileInput') antFileInput!: ElementRef<HTMLInputElement>;

  // ====== Estado drag & drop ======
  identDragging = false;
  domDragging = false;
  antDragging = false;

  // ====== Estado de archivos / nombres ======
  identFileName: string | null = null;
  domFileName: string | null = null;
  antFileName: string | null = null;

  // ====== Loading / processing ======
  uploadingIdent = false;
  uploadingDom = false;
  uploadingAnt = false;

  // Evita manejar el mismo archivo dos veces por eventos consecutivos
  private processingIdent = false;
  private processingDom = false;
  private processingAnt = false;

  // Guard para evitar doble .click() cuando el evento burbujea (dropzone + botón)
  private openGuard = {
    ident: false,
    dom: false,
    ant: false,
    lic: false,
  };

  // Límite MB visible desde template (no private)
  readonly MAX_MB = 3;

  // ================= Utilidades =================
  private isAllowedPdf(file: File): boolean {
    const allowed = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/bmp'
    ];
    return allowed.includes(file.type);
  }

  private validateFile(file: File, tipo: 'licencia' | 'pdf'): 'type' | 'size' | null {
    const maxBytes = this.MAX_MB * 1024 * 1024;
    const allowed = tipo === 'licencia'
      ? ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/bmp']
      : ['application/pdf'];
    if (!allowed.includes(file.type)) return 'type';
    if (file.size > maxBytes) return 'size';
    return null;
  }



  private extractFileUrl(res: any): string {
    return res?.url ?? res?.Location ?? res?.data?.url ?? res?.data?.Location
      ?? res?.key ?? res?.Key ?? res?.path ?? res?.filePath ?? '';
  }

  // ====== Guards para .click() (evita doble invocación por bubbling) ======
  private guardOpen(kind: 'ident' | 'dom' | 'ant' | 'lic', fn: () => void) {
    if (this.openGuard[kind]) return;
    this.openGuard[kind] = true;
    try { fn(); } finally {
      // libera el guard después de un pequeño lapso
      setTimeout(() => (this.openGuard[kind] = false), 200);
    }
  }

  // ================= Identificación =================
  openIdentFilePicker(): void {
    this.guardOpen('ident', () => this.identFileInput?.nativeElement.click());
  }
  onIdentDragOver(e: DragEvent) { e.preventDefault(); this.identDragging = true; }
  onIdentDragLeave(_e: DragEvent) { this.identDragging = false; }
  onIdentDrop(e: DragEvent) {
    e.preventDefault(); this.identDragging = false;
    const f = e.dataTransfer?.files?.[0]; if (f) this.handleIdentFile(f);
  }
  onIdentFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0]; if (f) this.handleIdentFile(f);
  }
  clearIdentFile(e: Event) {
    e.stopPropagation();
    this.identFileName = null;
    if (this.identFileInput) this.identFileInput.nativeElement.value = '';
    this.operadorForm.patchValue({ identificacion: null });
    this.operadorForm.get('identificacion')?.setErrors({ required: true });
  }
  private handleIdentFile(file: File) {
    if (this.processingIdent) return;               // <-- evita doble manejo
    this.processingIdent = true;

    if (!this.isAllowedPdf(file)) {
      this.operadorForm.get('identificacion')?.setErrors({ invalid: true });
      this.processingIdent = false;
      return;
    }

    this.identFileName = file.name;
    this.operadorForm.patchValue({ identificacion: file });
    this.operadorForm.get('identificacion')?.setErrors(null);
    this.uploadIdent(file);
  }
  private uploadIdent(file: File): void {
    if (this.uploadingIdent) { this.processingIdent = false; return; } // ya subiendo
    this.uploadingIdent = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'operadores');
    fd.append('idModule', '9');

    this.usuaService.uploadFile(fd).pipe(
      finalize(() => {
        this.uploadingIdent = false;
        this.processingIdent = false; // libera procesamiento sí o sí
      })
    ).subscribe({
      next: (res: any) => {
        const url = this.extractFileUrl(res);
        if (url) {
          // EXACTO
          this.operadorForm.patchValue({ identificacion: url });
        }
      },
      error: (err: any) => console.error('[UPLOAD][identificacion]', err),
    });
  }

  // ================= Comprobante de domicilio =================
  openDomFilePicker(): void {
    this.guardOpen('dom', () => this.domFileInput?.nativeElement.click());
  }
  onDomDragOver(e: DragEvent) { e.preventDefault(); this.domDragging = true; }
  onDomDragLeave(_e: DragEvent) { this.domDragging = false; }
  onDomDrop(e: DragEvent) {
    e.preventDefault(); this.domDragging = false;
    const f = e.dataTransfer?.files?.[0]; if (f) this.handleDomFile(f);
  }
  onDomFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0]; if (f) this.handleDomFile(f);
  }
  clearDomFile(e: Event) {
    e.stopPropagation();
    this.domFileName = null;
    if (this.domFileInput) this.domFileInput.nativeElement.value = '';
    this.operadorForm.patchValue({ comprobanteDomicilio: null });
    this.operadorForm.get('comprobanteDomicilio')?.setErrors({ required: true });
  }
  private handleDomFile(file: File) {
    if (this.processingDom) return;                 // <-- evita doble manejo
    this.processingDom = true;

    if (!this.isAllowedPdf(file)) {
      this.operadorForm.get('comprobanteDomicilio')?.setErrors({ invalid: true });
      this.processingDom = false;
      return;
    }

    this.domFileName = file.name;
    this.operadorForm.patchValue({ comprobanteDomicilio: file });
    this.operadorForm.get('comprobanteDomicilio')?.setErrors(null);
    this.uploadDom(file);
  }
  private uploadDom(file: File): void {
    if (this.uploadingDom) { this.processingDom = false; return; }
    this.uploadingDom = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'operadores');
    fd.append('idModule', '9');

    this.usuaService.uploadFile(fd).pipe(
      finalize(() => {
        this.uploadingDom = false;
        this.processingDom = false;
      })
    ).subscribe({
      next: (res: any) => {
        const url = this.extractFileUrl(res);
        if (url) {
          // EXACTO
          this.operadorForm.patchValue({ comprobanteDomicilio: url });
        }
      },
      error: (err: any) => console.error('[UPLOAD][comprobanteDomicilio]', err),
    });
  }

  // ================= Antecedentes no penales =================
  openAntFilePicker(): void {
    this.guardOpen('ant', () => this.antFileInput?.nativeElement.click());
  }
  onAntDragOver(e: DragEvent) { e.preventDefault(); this.antDragging = true; }
  onAntDragLeave(_e: DragEvent) { this.antDragging = false; }
  onAntDrop(e: DragEvent) {
    e.preventDefault(); this.antDragging = false;
    const f = e.dataTransfer?.files?.[0]; if (f) this.handleAntFile(f);
  }
  onAntFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0]; if (f) this.handleAntFile(f);
  }
  clearAntFile(e: Event) {
    e.stopPropagation();
    this.antFileName = null;
    if (this.antFileInput) this.antFileInput.nativeElement.value = '';
    this.operadorForm.patchValue({ antecedentesNoPenales: null });
    this.operadorForm.get('antecedentesNoPenales')?.setErrors({ required: true });
  }
  private handleAntFile(file: File) {
    if (this.processingAnt) return;                 // <-- evita doble manejo
    this.processingAnt = true;

    if (!this.isAllowedPdf(file)) {
      this.operadorForm.get('antecedentesNoPenales')?.setErrors({ invalid: true });
      this.processingAnt = false;
      return;
    }

    this.antFileName = file.name;
    this.operadorForm.patchValue({ antecedentesNoPenales: file });
    this.operadorForm.get('antecedentesNoPenales')?.setErrors(null);
    this.uploadAnt(file);
  }
  private uploadAnt(file: File): void {
    if (this.uploadingAnt) { this.processingAnt = false; return; }
    this.uploadingAnt = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'operadores');
    fd.append('idModule', '9');

    this.usuaService.uploadFile(fd).pipe(
      finalize(() => {
        this.uploadingAnt = false;
        this.processingAnt = false;
      })
    ).subscribe({
      next: (res: any) => {
        const url = this.extractFileUrl(res);
        if (url) {
          this.operadorForm.patchValue({ antecedentesNoPenales: url });
        }
      },
      error: (err: any) => console.error('[UPLOAD][antecedentesNoPenales]', err),
    });
  }

  // Drag & drop
  licDragging = false;
  licPreviewUrl: string | null = null;


  // Archivo
  licFileName: string | null = null;

  // Loading / processing
  uploadingLic = false;

  // Evita manejar doble evento
  private processingLic = false;

  // ====== Licencia de conducir ======
  openLicFilePicker(): void {
    this.guardOpen('lic', () => this.licFileInput?.nativeElement.click());
  }
  onLicDragOver(e: DragEvent) { e.preventDefault(); this.licDragging = true; }
  onLicDragLeave(_e: DragEvent) { this.licDragging = false; }
  onLicDrop(e: DragEvent) {
    e.preventDefault(); this.licDragging = false;
    const f = e.dataTransfer?.files?.[0]; if (f) this.handleLicFile(f);
  }
  onLicFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement)?.files?.[0]; if (f) this.handleLicFile(f);
  }
  clearLicFile(e: Event) {
    e.stopPropagation();
    this.licFileName = null;
    this.licPreviewUrl = null;
    if (this.licFileInput) this.licFileInput.nativeElement.value = '';
    this.operadorForm.patchValue({ licencia: null });
    this.operadorForm.get('licencia')?.setErrors({ required: true });
  }

  private handleLicFile(file: File) {
    if (this.processingLic) return;
    this.processingLic = true;

    const v = this.validateFile(file, 'licencia');
    if (v) {
      this.operadorForm.get('licencia')?.setErrors({ invalid: true });
      this.processingLic = false;
      return;
    }

    this.licFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.licPreviewUrl = reader.result as string;
      this.operadorForm.patchValue({ licencia: file });
      this.operadorForm.get('licencia')?.setErrors(null);
      this.uploadLic(file);
    };
    reader.readAsDataURL(file);
  }

  private uploadLic(file: File): void {
    if (this.uploadingLic) { this.processingLic = false; return; }
    this.uploadingLic = true;

    const fd = new FormData();
    fd.append('file', file, file.name);
    fd.append('folder', 'operadores');
    fd.append('idModule', '9');

    this.usuaService.uploadFile(fd).pipe(
      finalize(() => {
        this.uploadingLic = false;
        this.processingLic = false;
      })
    ).subscribe({
      next: (res: any) => {
        const url = this.extractFileUrl(res);
        if (url) {
          this.operadorForm.patchValue({ licencia: url });
          this.licPreviewUrl = url;
        }
      },
      error: (err: any) => console.error('[UPLOAD][licencia]', err),
    });
  }

  @ViewChild('licFileInput') licFileInput!: ElementRef<HTMLInputElement>;



}
