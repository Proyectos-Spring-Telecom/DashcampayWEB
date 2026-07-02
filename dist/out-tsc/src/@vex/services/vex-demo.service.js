import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
let VexDemoService = class VexDemoService {
    constructor(router, configService) {
        this.router = router;
        this.configService = configService;
        /**
         * Config Related Subscriptions
         * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
         * Example: example.com/?layout=apollo&style=default
         */
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
            const route = this.router.routerState.root.snapshot;
            if (route.queryParamMap.has('layout')) {
                this.configService.setConfig(route.queryParamMap.get('layout'));
            }
            if (route.queryParamMap.has('style')) {
                this.configService.updateConfig({
                    style: {
                        colorScheme: route.queryParamMap.get('style')
                    }
                });
            }
            // TODO: Adjust primaryColor queryParam and see where it was used?
            const theme = route.queryParamMap.get('theme');
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
};
VexDemoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VexDemoService);
export { VexDemoService };
//# sourceMappingURL=vex-demo.service.js.map