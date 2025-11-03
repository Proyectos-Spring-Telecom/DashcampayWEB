import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider
} from '@angular/core';
import { LuxonService } from './luxon.service';

export function provideLuxon(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(LuxonService),
      multi: true
    }
  ];
}
