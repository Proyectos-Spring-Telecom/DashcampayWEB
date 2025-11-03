import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Settings } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class LuxonService {
  constructor(@Inject(LOCALE_ID) private localeId: string) {
    Settings.defaultLocale = this.localeId;
  }
}
