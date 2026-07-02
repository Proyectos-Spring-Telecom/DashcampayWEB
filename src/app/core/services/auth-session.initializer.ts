import { inject } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AuthenticationService } from './auth.service';

export function initializeAuthSession(): () => Promise<boolean> {
  const auth = inject(AuthenticationService);
  return () =>
    firstValueFrom(
      auth.restoreSession().pipe(catchError(() => of(false)))
    );
}
