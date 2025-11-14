import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { TarifasService } from 'src/app/pages/services/tarifa.service';
import { VariantesService } from 'src/app/pages/services/variantes.service';

@Component({
  selector: 'vex-agregar-tarifa',
  templateUrl: './agregar-tarifa.component.html',
  styleUrl: './agregar-tarifa.component.scss',
  animations: [fadeInRight400ms],
})
export class AgregarTarifaComponent implements OnInit {
  layoutCtrl = new UntypedFormControl('fullwidth');
  public submitButton: string = 'Guardar';
  public loading: boolean = false;
  public tarifaForm!: FormGroup;
  public idTarifa!: number;
  public title = 'Agregar Tarifa';
  public listaVariantes: any[] = [];
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private tarSerice: TarifasService,
    private activatedRouted: ActivatedRoute,
    private varService: VariantesService,
    private route: Router,
    private alerts: AlertsService,
  ) { }

  ngOnInit(): void {
    this.obtenerVariantes()
    this.initForm();
    this.activatedRouted.params.subscribe((params) => {
      this.idTarifa = params['idTarifa'];
      if (this.idTarifa) {
        this.title = 'Actualizar Tarifa';
        this.obtenerTarifa();
      }
    });
  }

  obtenerVariantes() {
    this.varService.obtenerVariantes().subscribe((response) => {
      this.listaVariantes = response.data;
    })
  }

  private toNumber(v: any): number | null {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(String(v).replace(',', '.'));
    return isNaN(n) ? null : n;
  }

  obtenerTarifa() {
    this.tarSerice.obtenerTarifa(this.idTarifa).subscribe({
      next: (response: any) => {
        const data = response?.data;
        const item = Array.isArray(data)
          ? (data.find((x: any) => x?.id === this.idTarifa) ?? data[0])
          : data;

        if (!item) { return; }
        const dto = {
          tarifaBase: this.toNumber(item.tarifaBase ?? item.TarifaBase),
          distanciaBaseKm: this.toNumber(item.distanciaBaseKm ?? item.DistanciaBaseKm),
          incrementoCadaMetros: this.toNumber(item.incrementoCadaMetros ?? item.IncrementoCadaMetros),
          costoAdicional: this.toNumber(item.costoAdicional ?? item.CostoAdicional),
          estatus: (item.estatus ?? item.estatusTarifa ?? 1),
          idVariante: item.idVariantes ?? item.idVariantes ?? null,
        };

        this.tarifaForm.patchValue(dto, { emitEvent: false });
      },
      error: (e) => {
        console.error('Error obtenerTarifa', e);
      }
    });
  }

  private toNum(v: any): number {
    if (v === null || v === undefined) return NaN;
    if (typeof v === 'string') v = v.replace(',', '.').trim();
    return Number(v);
  }

  initForm() {
    this.tarifaForm = this.fb.group({
      tarifaBase: [null, Validators.required],
      distanciaBaseKm: [null, Validators.required],
      incrementoCadaMetros: [null, Validators.required],
      costoAdicional: [null, Validators.required],
      estatus: [1, Validators.required],
      idVariante: [null, Validators.required],
    });
  }

  submit() {
    this.submitButton = 'Cargando...';
    this.loading = true;
    if (this.idTarifa) {
      this.actualizar();
    } else {
      this.agregar();
    }
  }

  async agregar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.tarifaForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        tarifaBase: 'Tarifa Base',
        distanciaBaseKm: 'Distancia Base Km',
        incrementoCadaMetros: 'Incremento Por Metros',
        costoAdicional: 'Costo Adicional',
        idVariante: 'Variante',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.tarifaForm.controls).forEach((key) => {
        const control = this.tarifaForm.get(key);
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
    if (this.tarifaForm.contains('id')) this.tarifaForm.removeControl('id');

    const raw = this.tarifaForm.getRawValue();

const payload = {
  tarifaBase: this.toNumber(raw.tarifaBase),
  distanciaBaseKm: this.toNumber(raw.distanciaBaseKm),
  incrementoCadaMetros: this.toNumber(raw.incrementoCadaMetros),
  costoAdicional: this.toNumber(raw.costoAdicional),
  estatus: Number(raw.estatus),
  idVariante: Number(raw.idVariante),
};

this.tarSerice.agregarTarifa(payload).subscribe(

      () => {
        this.submitButton = 'Guardar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Se agregó un nueva tarifa de manera exitosa.',
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
          message: String(error ?? 'Ocurrió un error al agregar la tarifa.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async actualizar() {
    this.submitButton = 'Cargando...';
    this.loading = true;

    if (this.tarifaForm.invalid) {
      this.submitButton = 'Guardar';
      this.loading = false;

      const etiquetas: Record<string, string> = {
        tarifaBase: 'Tarifa Base',
        distanciaBaseKm: 'Distancia Base Km',
        incrementoCadaMetros: 'Incremento Por Metros',
        costoAdicional: 'Costo Adicional',
        idVariante: 'Variante',
      };

      const camposFaltantes: string[] = [];
      Object.keys(this.tarifaForm.controls).forEach((key) => {
        const control = this.tarifaForm.get(key);
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

    const raw = this.tarifaForm.getRawValue();

const payload = {
  tarifaBase: this.toNumber(raw.tarifaBase),
  distanciaBaseKm: this.toNumber(raw.distanciaBaseKm),
  incrementoCadaMetros: this.toNumber(raw.incrementoCadaMetros),
  costoAdicional: this.toNumber(raw.costoAdicional),
  estatus: Number(raw.estatus),
  idVariante: Number(raw.idVariante),
};

this.tarSerice.agregarTarifa(payload).subscribe(

      () => {
        this.submitButton = 'Actualizar';
        this.loading = false;

        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: 'Los datos de la tarifa se actualizaron correctamente.',
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
          message: String(error ?? 'Ocurrió un error al actualizar la tarifa.'),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  regresar() {
    this.route.navigateByUrl('/administracion/tarifas');
  }

  // ✅ Utilidad: normaliza a string válido "123.45"
  private normalizeMoneyString(raw: string): string {
    let v = (raw || '').replace(',', '.').replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    const parts = v.split('.');
    if (parts[1]) v = parts[0] + '.' + parts[1].slice(0, 2);
    return v;
  }

  // ✅ Utilidad: setea SIEMPRE number (o null) al form control, sin disparar eventos
  private setTarifaBaseNumberFromString(v: string) {
    const normalized = this.normalizeMoneyString(v);
    if (normalized === '' || normalized === '.') {
      this.tarifaForm.get('tarifaBase')?.setValue(null, { emitEvent: false });
      return null;
    }
    const n = Number(normalized);
    if (Number.isFinite(n)) {
      this.tarifaForm.get('tarifaBase')?.setValue(n, { emitEvent: false });
      return n;
    } else {
      this.tarifaForm.get('tarifaBase')?.setValue(null, { emitEvent: false });
      return null;
    }
  }

  moneyKeydown(e: KeyboardEvent) {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    if (allowed.includes(e.key)) return;

    const input = e.target as HTMLInputElement;
    const value = input.value || '';

    if (e.key === '.') {
      if (value.includes('.')) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    const selStart = input.selectionStart ?? value.length;
    const selEnd = input.selectionEnd ?? value.length;
    const newValue = value.slice(0, selStart) + e.key + value.slice(selEnd);
    const parts = newValue.split('.');
    if (parts[1] && parts[1].length > 2) e.preventDefault();
  }

  moneyInput(e: Event) {
    const input = e.target as HTMLInputElement;
    // Normaliza visualmente (string)...
    const normalized = this.normalizeMoneyString(input.value);
    input.value = normalized;
    // ...pero guarda SIEMPRE número en el form control
    this.setTarifaBaseNumberFromString(normalized);
  }

  moneyPaste(e: ClipboardEvent) {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const text = e.clipboardData?.getData('text') || '';
    const normalized = this.normalizeMoneyString(text);
    input.value = normalized;
    this.setTarifaBaseNumberFromString(normalized);
  }

  moneyBlur(e: FocusEvent) {
    const input = e.target as HTMLInputElement;
    const n = this.setTarifaBaseNumberFromString(input.value); // asegura number en el form
    if (n == null) {
      input.value = '';
      return;
    }
    // Formato visual fijo a 2 decimales, pero el form ya tiene number
    input.value = n.toFixed(2);
  }


  costoKeydown(e: KeyboardEvent) {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    const input = e.target as HTMLInputElement;
    const value = input.value || '';
    if (e.key === '.') {
      if (value.includes('.')) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }
    const selStart = input.selectionStart ?? value.length;
    const selEnd = input.selectionEnd ?? value.length;
    const newValue = value.slice(0, selStart) + e.key + value.slice(selEnd);
    const parts = newValue.split('.');
    if (parts[1] && parts[1].length > 2) e.preventDefault();
  }

  costoInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let v = (input.value || '').replace(',', '.');
    v = v.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    const parts = v.split('.');
    if (parts[1]) v = parts[0] + '.' + parts[1].slice(0, 2);
    input.value = v;
    this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
  }

  costoPaste(e: ClipboardEvent) {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const text = (e.clipboardData?.getData('text') || '').replace(',', '.');
    let v = text.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    const parts = v.split('.');
    if (parts[1]) v = parts[0] + '.' + parts[1].slice(0, 2);

    input.value = v;
    this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
  }

  costoBlur(e: FocusEvent) {
    const input = e.target as HTMLInputElement;
    let v = input.value;
    if (!v) return;
    if (/^\d+$/.test(v)) {
      v = v + '.00';
    } else if (/^\d+\.\d$/.test(v)) {
      v = v + '0';
    } else if (/^\d+\.\d{2}$/.test(v)) {
    } else {
      v = v.replace(',', '.').replace(/[^0-9.]/g, '');
      const parts = v.split('.');
      v = parts[0] + (parts[1] ? '.' + parts[1].slice(0, 2) : '.00');
      if (/^\d+$/.test(v)) v = v + '.00';
      if (/^\d+\.\d$/.test(v)) v = v + '0';
    }
    input.value = v;
    this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
  }

  incrementoKeydown(e: KeyboardEvent) {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    const input = e.target as HTMLInputElement;
    const value = input.value || '';
    if (e.key === '.') {
      if (value.includes('.')) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  incrementoInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let v = (input.value || '').replace(',', '.');
    v = v.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    input.value = v;
    this.tarifaForm.get('incrementoCadaMetros')?.setValue(v, { emitEvent: false });
  }

  incrementoPaste(e: ClipboardEvent) {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const text = (e.clipboardData?.getData('text') || '').replace(',', '.');
    let v = text.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    input.value = v;
    this.tarifaForm.get('incrementoCadaMetros')?.setValue(v, { emitEvent: false });
  }

  distanciaKeydown(e: KeyboardEvent) {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    const input = e.target as HTMLInputElement;
    const value = input.value || '';
    if (e.key === '.') {
      if (value.includes('.')) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  distanciaInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let v = (input.value || '').replace(',', '.');
    v = v.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    input.value = v;
    this.tarifaForm.get('distanciaBaseKm')?.setValue(v, { emitEvent: false });
  }

  distanciaPaste(e: ClipboardEvent) {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const text = (e.clipboardData?.getData('text') || '').replace(',', '.');
    let v = text.replace(/[^0-9.]/g, '');
    const firstDot = v.indexOf('.');
    if (firstDot !== -1) {
      const before = v.slice(0, firstDot + 1);
      const after = v.slice(firstDot + 1).replace(/\./g, '');
      v = before + after;
    }
    input.value = v;
    this.tarifaForm.get('distanciaBaseKm')?.setValue(v, { emitEvent: false });
  }


}
