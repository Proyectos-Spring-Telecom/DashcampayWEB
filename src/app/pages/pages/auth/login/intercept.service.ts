// intercept-service.interceptor.ts
import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

// === Compatibilidad con tu versión en clase ===
export const SKIP_APP_AUTH = new HttpContextToken<boolean>(() => false);
// Alias opcional si ya usabas otro nombre en algún lugar
export const BYPASS_AUTH = SKIP_APP_AUTH;

// Helper opcional para setear el flag de forma compacta
export function withSkipAuth(ctx: HttpContext = new HttpContext()): HttpContext {
  return ctx.set(SKIP_APP_AUTH, true);
}

export const interceptServiceInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const token = auth.getToken();

  // Respeta el contexto para saltar Authorization
  const skipAuth = req.context.get(SKIP_APP_AUTH) === true;

  // No pisar Authorization si ya viene, y sólo agregar si no se pidió saltar
  let headers = req.headers;
  if (!skipAuth && token && !headers.has('Authorization')) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  // Aceptar JSON por defecto (no afecta binarios) si no viene definido
  if (!headers.has('Accept')) {
    headers = headers.set('Accept', 'application/json');
  }

  // Reglas para Content-Type: sólo si hay body JSON y no es FormData
  const isMutating = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH';
  const hasBody = isMutating && req.body != null;
  const isFormData = hasBody && (req.body instanceof FormData);

  if (hasBody && !isFormData && !headers.has('Content-Type')) {
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  // Clon único
  const finalReq = req.clone({ headers });
  return next(finalReq);
};
