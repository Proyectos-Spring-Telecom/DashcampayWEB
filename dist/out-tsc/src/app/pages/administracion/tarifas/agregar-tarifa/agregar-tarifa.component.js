import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let AgregarTarifaComponent = class AgregarTarifaComponent {
    constructor(fb, tarSerice, activatedRouted, varService, route, alerts) {
        this.fb = fb;
        this.tarSerice = tarSerice;
        this.activatedRouted = activatedRouted;
        this.varService = varService;
        this.route = route;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Tarifa';
        this.listaVariantes = [];
        this.selectedFileName = '';
        this.previewUrl = null;
    }
    ngOnInit() {
        this.obtenerVariantes();
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
        });
    }
    toNumber(v) {
        if (v === null || v === undefined || v === '')
            return null;
        const n = Number(String(v).replace(',', '.'));
        return isNaN(n) ? null : n;
    }
    obtenerTarifa() {
        this.tarSerice.obtenerTarifa(this.idTarifa).subscribe({
            next: (response) => {
                const data = response?.data;
                const item = Array.isArray(data)
                    ? (data.find((x) => x?.id === this.idTarifa) ?? data[0])
                    : data;
                if (!item) {
                    return;
                }
                const dto = {
                    tarifaBase: this.toNumber(item.tarifaBase ?? item.TarifaBase),
                    distanciaBaseKm: this.toNumber(item.distanciaBaseKm ?? item.DistanciaBaseKm),
                    cantidadEstacionesBase: this.toNumber(item.cantidadEstacionesBase ?? item.CantidadEstacionesBase),
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
    toNum(v) {
        if (v === null || v === undefined)
            return NaN;
        if (typeof v === 'string')
            v = v.replace(',', '.').trim();
        return Number(v);
    }
    initForm() {
        this.tarifaForm = this.fb.group({
            tarifaBase: [null, Validators.required],
            distanciaBaseKm: [null, Validators.required],
            cantidadEstacionesBase: [null, Validators.required],
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
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.tarifaForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                tarifaBase: 'Tarifa Base',
                distanciaBaseKm: 'Distancia Base Km',
                cantidadEstacionesBase: 'Cantidad Estaciones Base',
                incrementoCadaMetros: 'Incremento Por Metros',
                costoAdicional: 'Costo Adicional',
                idVariante: 'Variante',
            };
            const camposFaltantes = [];
            Object.keys(this.tarifaForm.controls).forEach((key) => {
                const control = this.tarifaForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>`)
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
        if (this.tarifaForm.contains('id'))
            this.tarifaForm.removeControl('id');
        const payload = this.tarifaForm.getRawValue();
        this.tarSerice.agregarTarifa(payload).subscribe(() => {
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
        }, (error) => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error ?? 'Ocurrió un error al agregar la tarifa.'),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.tarifaForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                tarifaBase: 'Tarifa Base',
                distanciaBaseKm: 'Distancia Base Km',
                cantidadEstacionesBase: 'Cantidad Estaciones Base',
                incrementoCadaMetros: 'Incremento Por Metros',
                costoAdicional: 'Costo Adicional',
                idVariante: 'Variante',
            };
            const camposFaltantes = [];
            Object.keys(this.tarifaForm.controls).forEach((key) => {
                const control = this.tarifaForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>`)
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
        const payload = this.tarifaForm.getRawValue();
        this.tarSerice.actualizarTarifa(this.idTarifa, payload).subscribe(() => {
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
        }, (error) => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error ?? 'Ocurrió un error al actualizar la tarifa.'),
                confirmText: 'Confirmar',
                backdropClose: false,
            });
        });
    }
    regresar() {
        this.route.navigateByUrl('/administracion/tarifas');
    }
    // ✅ Utilidad: normaliza a string válido "123.45"
    normalizeMoneyString(raw) {
        let v = (raw || '').replace(',', '.').replace(/[^0-9.]/g, '');
        const firstDot = v.indexOf('.');
        if (firstDot !== -1) {
            const before = v.slice(0, firstDot + 1);
            const after = v.slice(firstDot + 1).replace(/\./g, '');
            v = before + after;
        }
        const parts = v.split('.');
        if (parts[1])
            v = parts[0] + '.' + parts[1].slice(0, 2);
        return v;
    }
    // ✅ Utilidad: setea SIEMPRE number (o null) al form control, sin disparar eventos
    setTarifaBaseNumberFromString(v) {
        const normalized = this.normalizeMoneyString(v);
        if (normalized === '' || normalized === '.') {
            this.tarifaForm.get('tarifaBase')?.setValue(null, { emitEvent: false });
            return null;
        }
        const n = Number(normalized);
        if (Number.isFinite(n)) {
            this.tarifaForm.get('tarifaBase')?.setValue(n, { emitEvent: false });
            return n;
        }
        else {
            this.tarifaForm.get('tarifaBase')?.setValue(null, { emitEvent: false });
            return null;
        }
    }
    moneyKeydown(e) {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowed.includes(e.key))
            return;
        const input = e.target;
        const value = input.value || '';
        if (e.key === '.') {
            if (value.includes('.'))
                e.preventDefault();
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
        if (parts[1] && parts[1].length > 2)
            e.preventDefault();
    }
    moneyInput(e) {
        const input = e.target;
        // Normaliza visualmente (string)...
        const normalized = this.normalizeMoneyString(input.value);
        input.value = normalized;
        // ...pero guarda SIEMPRE número en el form control
        this.setTarifaBaseNumberFromString(normalized);
    }
    moneyPaste(e) {
        e.preventDefault();
        const input = e.target;
        const text = e.clipboardData?.getData('text') || '';
        const normalized = this.normalizeMoneyString(text);
        input.value = normalized;
        this.setTarifaBaseNumberFromString(normalized);
    }
    moneyBlur(e) {
        const input = e.target;
        const n = this.setTarifaBaseNumberFromString(input.value); // asegura number en el form
        if (n == null) {
            input.value = '';
            return;
        }
        // Formato visual fijo a 2 decimales, pero el form ya tiene number
        input.value = n.toFixed(2);
    }
    costoKeydown(e) {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowed.includes(e.key))
            return;
        const input = e.target;
        const value = input.value || '';
        if (e.key === '.') {
            if (value.includes('.'))
                e.preventDefault();
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
        if (parts[1] && parts[1].length > 2)
            e.preventDefault();
    }
    costoInput(e) {
        const input = e.target;
        let v = (input.value || '').replace(',', '.');
        v = v.replace(/[^0-9.]/g, '');
        const firstDot = v.indexOf('.');
        if (firstDot !== -1) {
            const before = v.slice(0, firstDot + 1);
            const after = v.slice(firstDot + 1).replace(/\./g, '');
            v = before + after;
        }
        const parts = v.split('.');
        if (parts[1])
            v = parts[0] + '.' + parts[1].slice(0, 2);
        input.value = v;
        this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
    }
    costoPaste(e) {
        e.preventDefault();
        const input = e.target;
        const text = (e.clipboardData?.getData('text') || '').replace(',', '.');
        let v = text.replace(/[^0-9.]/g, '');
        const firstDot = v.indexOf('.');
        if (firstDot !== -1) {
            const before = v.slice(0, firstDot + 1);
            const after = v.slice(firstDot + 1).replace(/\./g, '');
            v = before + after;
        }
        const parts = v.split('.');
        if (parts[1])
            v = parts[0] + '.' + parts[1].slice(0, 2);
        input.value = v;
        this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
    }
    costoBlur(e) {
        const input = e.target;
        let v = input.value;
        if (!v)
            return;
        if (/^\d+$/.test(v)) {
            v = v + '.00';
        }
        else if (/^\d+\.\d$/.test(v)) {
            v = v + '0';
        }
        else if (/^\d+\.\d{2}$/.test(v)) {
        }
        else {
            v = v.replace(',', '.').replace(/[^0-9.]/g, '');
            const parts = v.split('.');
            v = parts[0] + (parts[1] ? '.' + parts[1].slice(0, 2) : '.00');
            if (/^\d+$/.test(v))
                v = v + '.00';
            if (/^\d+\.\d$/.test(v))
                v = v + '0';
        }
        input.value = v;
        this.tarifaForm.get('costoAdicional')?.setValue(v, { emitEvent: false });
    }
    incrementoKeydown(e) {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowed.includes(e.key))
            return;
        const input = e.target;
        const value = input.value || '';
        if (e.key === '.') {
            if (value.includes('.'))
                e.preventDefault();
            return;
        }
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }
    incrementoInput(e) {
        const input = e.target;
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
    incrementoPaste(e) {
        e.preventDefault();
        const input = e.target;
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
    distanciaKeydown(e) {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowed.includes(e.key))
            return;
        const input = e.target;
        const value = input.value || '';
        if (e.key === '.') {
            if (value.includes('.'))
                e.preventDefault();
            return;
        }
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }
    distanciaInput(e) {
        const input = e.target;
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
    distanciaPaste(e) {
        e.preventDefault();
        const input = e.target;
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
    estacionesKeydown(e) {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowed.includes(e.key))
            return;
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }
    estacionesInput(e) {
        const input = e.target;
        const v = (input.value || '').replace(/[^0-9]/g, '');
        input.value = v;
        const n = v === '' ? null : Number(v);
        this.tarifaForm.get('cantidadEstacionesBase')?.setValue(n, { emitEvent: false });
    }
    estacionesPaste(e) {
        e.preventDefault();
        const input = e.target;
        const v = (e.clipboardData?.getData('text') || '').replace(/[^0-9]/g, '');
        input.value = v;
        const n = v === '' ? null : Number(v);
        this.tarifaForm.get('cantidadEstacionesBase')?.setValue(n, { emitEvent: false });
    }
};
AgregarTarifaComponent = __decorate([
    Component({
        selector: 'vex-agregar-tarifa',
        templateUrl: './agregar-tarifa.component.html',
        styleUrl: './agregar-tarifa.component.scss',
        animations: [fadeInRight400ms],
    })
], AgregarTarifaComponent);
export { AgregarTarifaComponent };
//# sourceMappingURL=agregar-tarifa.component.js.map