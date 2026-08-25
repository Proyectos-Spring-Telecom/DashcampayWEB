import { HttpContext, HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

/** Evita un segundo intento de refresh si el reintento también devuelve 401. */
export const AUTH_RETRY = new HttpContextToken<boolean>(() => false);

const AUTH_EXEMPT_PATHS = [
  /\/login$/,
  /\/login\/refresh$/,
  /\/login\/logout$/,
  /\/login\/recuperar/,
  /\/login\/verify$/,
  /\/login\/pasajero/,
];

function isAuthExemptUrl(url: string): boolean {
  return AUTH_EXEMPT_PATHS.some((pattern) => pattern.test(url));
}

export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Login/refresh/logout: no intentar renovar sesión
      if (isAuthExemptUrl(req.url)) {
        return throwError(() => error);
      }

      // Ya reintentamos tras refresh: no cerrar sesión automáticamente.
      // Un 401 repetido suele ser permiso/negocio, no token inválido
      // (si el refresh hubiera fallado, se cierra abajo).
      if (req.context.get(AUTH_RETRY)) {
        return throwError(() => error);
      }

      return auth.refreshSessionSingleFlight().pipe(
        switchMap(() => {
          const token = auth.getToken();
          if (!token) {
            auth.forceLogout();
            router.navigate(['/login']);
            return throwError(() => error);
          }

          const retryReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
            context: req.context.set(AUTH_RETRY, true),
          });
          return next(retryReq);
        }),
        catchError((refreshError) => {
          auth.forceLogout();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
