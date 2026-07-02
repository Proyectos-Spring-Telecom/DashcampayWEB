export const PASSWORD_MIN_LENGTH = 12;

/** Mín. 12 caracteres, 1 mayúscula, 1 número, 1 carácter especial, sin espacios */
export const PASSWORD_PATTERN =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{12,}$/;

export type PasswordRuleKey = 'needUpper' | 'needNumber' | 'needSpecial' | 'needLength' | 'ok';

const GUIDE_TEXT: Record<PasswordRuleKey, string> = {
  needUpper: 'La contraseña debe tener al menos una mayúscula.',
  needNumber: 'La contraseña debe tener al menos un número.',
  needSpecial: 'La contraseña debe incluir al menos un carácter especial y no contener espacios.',
  needLength: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`,
  ok: 'Contraseña válida.',
};

export function getPasswordRuleKey(value: string): PasswordRuleKey {
  const v = (value || '').trim();
  if (!/[A-Z]/.test(v)) return 'needUpper';
  if (!/\d/.test(v)) return 'needNumber';
  if (!/[^A-Za-z0-9]/.test(v) || /\s/.test(v)) return 'needSpecial';
  if (v.length < PASSWORD_MIN_LENGTH) return 'needLength';
  return 'ok';
}

export function getPasswordGuideText(key: PasswordRuleKey): string {
  return GUIDE_TEXT[key];
}

export function isPasswordValid(value: string): boolean {
  return getPasswordRuleKey(value) === 'ok';
}
