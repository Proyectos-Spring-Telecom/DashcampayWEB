import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let AlertsService = class AlertsService {
    constructor() {
        this.queue = [];
        this.current = null;
        this.stateSub = new BehaviorSubject(null);
        this.state$ = this.stateSub.asObservable();
        this.lastInputValue = '';
        this.textDefaults = {
            confirmText: 'Entendido',
            cancelText: 'Cancelar',
            titles: {
                success: '¡Operación Exitosa!',
                error: '¡Ops!',
                warning: 'Atención',
                info: 'Información'
            },
            messages: {
                success: 'Operación realizada correctamente.',
                error: 'Ocurrió un problema.',
                warning: 'Revisa la información proporcionada.',
                info: 'Aviso informativo.'
            }
        };
    }
    setTextDefaults(partial) {
        this.textDefaults = {
            confirmText: partial.confirmText ?? this.textDefaults.confirmText,
            cancelText: partial.cancelText ?? this.textDefaults.cancelText,
            titles: { ...this.textDefaults.titles, ...(partial.titles ?? {}) },
            messages: { ...this.textDefaults.messages, ...(partial.messages ?? {}) }
        };
    }
    getTextDefaults() {
        return JSON.parse(JSON.stringify(this.textDefaults));
    }
    open(opts) {
        const type = opts.type;
        const state = {
            type,
            title: opts.title ?? this.textDefaults.titles[type] ?? '',
            message: opts.message ?? this.textDefaults.messages[type] ?? '',
            confirmText: opts.confirmText ?? this.textDefaults.confirmText,
            cancelText: opts.cancelText ?? this.textDefaults.cancelText,
            showCancel: !!opts.showCancel,
            backdropClose: opts.backdropClose ?? false,
            navigateAfterClose: opts.navigateAfterClose,
            navigateDelayMs: opts.navigateDelayMs ?? 300,
            autoCloseMs: opts.autoCloseMs,
            resolver: undefined,
            inputEnabled: !!opts.inputEnabled,
            inputLabel: opts.inputLabel ?? '',
            inputPlaceholder: opts.inputPlaceholder ?? '',
            inputValue: opts.inputValue ?? ''
        };
        const p = new Promise(res => (state.resolver = res));
        this.queue.push(state);
        this.pump();
        return p;
    }
    _setInputValue(value) {
        if (this.current)
            this.current.inputValue = value ?? '';
    }
    _resolve(result) {
        this.lastInputValue = this.current?.inputValue ?? '';
        if (this.current?.resolver)
            this.current.resolver(result);
        this.current = null;
        this.stateSub.next(null);
        setTimeout(() => this.pump(), 0);
    }
    getInputValue() {
        return this.current?.inputValue ?? this.lastInputValue ?? '';
    }
    pump() {
        if (!this.current && this.queue.length) {
            this.current = this.queue.shift() ?? null;
            this.stateSub.next(this.current);
        }
    }
};
AlertsService = __decorate([
    Injectable({ providedIn: 'root' })
], AlertsService);
export { AlertsService };
//# sourceMappingURL=alerts.service.js.map