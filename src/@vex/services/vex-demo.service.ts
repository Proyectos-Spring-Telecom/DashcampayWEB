import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NavigationEnd, Router } from '@angular/router';
import { VexConfigService } from '@vex/config/vex-config.service';
import { filter } from 'rxjs/operators';

import {
  VexColorScheme,
  VexConfigName,
  VexTheme
} from '@vex/config/vex-config.interface';

@Injectable({
  providedIn: 'root'
})
export class VexDemoService {
  constructor(
    private readonly router: Router,
    private readonly configService: VexConfigService
  ) {
    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const route = this.router.routerState.root.snapshot;
        if (route.queryParamMap.has('layout')) {
          this.configService.setConfig(
            route.queryParamMap.get('layout') as VexConfigName
          );
        }

        if (route.queryParamMap.has('style')) {
          this.configService.updateConfig({
            style: {
              colorScheme: route.queryParamMap.get('style') as VexColorScheme
            }
          });
        }

        // TODO: Adjust primaryColor queryParam and see where it was used?
        const theme: VexTheme | null = route.queryParamMap.get(
          'theme'
        ) as VexTheme | null;
        if (theme) {
          this.configService.updateConfig({
            style: {
              themeClassName: theme
            }
          });
        }

        if (route.queryParamMap.has('rtl')) {
          this.configService.updateConfig({
            direction: coerceBooleanProperty(route.queryParamMap.get('rtl'))
              ? 'rtl'
              : 'ltr'
          });
        }
      });
  }
}
