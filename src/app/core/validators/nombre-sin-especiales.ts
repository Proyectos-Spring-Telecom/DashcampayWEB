import { AbstractControl } from '@angular/forms';

/** Letras (con acentos), números y espacios. Sin caracteres especiales. */
export const NOMBRE_SIN_ESPECIALES_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9 ]*$/;

const CHAR_PERMITIDO = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9 ]$/;
const KEYS_CONTROL = new Set([
  'Backspace', 'Tab', 'Enter', 'Escape',
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
  'Delete', 'Home', 'End'
]);

export function sanitizarNombreSinEspeciales(valor: string): string {
  return (valor || '').replace(/[^A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9 ]/g, '');
}

export function bloquearCaracteresEspecialesNombre(event: KeyboardEvent): void {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (KEYS_CONTROL.has(event.key) || event.key.length !== 1) return;
  if (!CHAR_PERMITIDO.test(event.key)) {
    event.preventDefault();
  }
}

export function onPasteNombreSinEspeciales(event: ClipboardEvent, control?: AbstractControl | null): void {
  event.preventDefault();
  const pasted = event.clipboardData?.getData('text') ?? '';
  const cleaned = sanitizarNombreSinEspeciales(pasted);
  const input = event.target as HTMLInputElement;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const next = sanitizarNombreSinEspeciales(input.value.slice(0, start) + cleaned + input.value.slice(end));
  input.value = next;
  control?.setValue(next);
  control?.markAsDirty();
  control?.updateValueAndValidity();
}
