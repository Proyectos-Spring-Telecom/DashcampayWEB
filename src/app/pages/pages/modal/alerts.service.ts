import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type AlertResult = 'confirm' | 'cancel' | 'auto';

export interface AlertOptions {
  type: AlertType;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  backdropClose?: boolean;
  navigateAfterClose?: string | any[];
  navigateDelayMs?: number;
  autoCloseMs?: number;

  inputEnabled?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
}

export interface AlertState extends Required<Pick<AlertOptions,
  'type' | 'title' | 'message' | 'backdropClose' | 'navigateDelayMs'
>> {
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  autoCloseMs?: number;
  navigateAfterClose?: string | any[];
  resolver?: (r: AlertResult) => void;

  inputEnabled: boolean;
  inputLabel: string;
  inputPlaceholder: string;
  inputValue: string;
}

type TitlesMap = Partial<Record<AlertType, string>>;
type MessagesMap = Partial<Record<AlertType, string>>;

export interface AlertTextDefaults {
  confirmText: string;
  cancelText: string;
  titles: TitlesMap;
  messages: MessagesMap;
}

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private queue: AlertState[] = [];
  private current: AlertState | null = null;

  private stateSub = new BehaviorSubject<AlertState | null>(null);
  state$ = this.stateSub.asObservable();

  private lastInputValue = '';

  private textDefaults: AlertTextDefaults = {
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

  setTextDefaults(partial: Partial<AlertTextDefaults> & { titles?: TitlesMap; messages?: MessagesMap; }) {
    this.textDefaults = {
      confirmText: partial.confirmText ?? this.textDefaults.confirmText,
      cancelText: partial.cancelText ?? this.textDefaults.cancelText,
      titles: { ...this.textDefaults.titles, ...(partial.titles ?? {}) },
      messages: { ...this.textDefaults.messages, ...(partial.messages ?? {}) }
    };
  }

  getTextDefaults(): AlertTextDefaults {
    return JSON.parse(JSON.stringify(this.textDefaults));
  }

  open(opts: AlertOptions): Promise<AlertResult> {
    const type = opts.type;

    const state: AlertState = {
      type,
      title: opts.title ?? this.textDefaults.titles[type] ?? '',
      message: this.asDisplayString(opts.message ?? this.textDefaults.messages[type] ?? ''),
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

    const p = new Promise<AlertResult>(res => (state.resolver = res));
    this.queue.push(state);
    this.pump();
    return p;
  }

  private asDisplayString(value: unknown): string {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) {
      return value.map((v) => this.asDisplayString(v)).filter(Boolean).join('\n');
    }
    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      if (typeof obj['message'] === 'string') return obj['message'];
      if (Array.isArray(obj['message'])) return this.asDisplayString(obj['message']);
      try {
        return JSON.stringify(value);
      } catch {
        return 'Ocurrió un problema.';
      }
    }
    return String(value);
  }

  _setInputValue(value: string): void {
    if (this.current) this.current.inputValue = value ?? '';
  }

  _resolve(result: AlertResult): void {
    this.lastInputValue = this.current?.inputValue ?? '';
    if (this.current?.resolver) this.current.resolver(result);
    this.current = null;
    this.stateSub.next(null);
    setTimeout(() => this.pump(), 0);
  }

  getInputValue(): string {
    return this.current?.inputValue ?? this.lastInputValue ?? '';
  }

  private pump() {
    if (!this.current && this.queue.length) {
      this.current = this.queue.shift() ?? null;
      this.stateSub.next(this.current);
    }
  }
}
