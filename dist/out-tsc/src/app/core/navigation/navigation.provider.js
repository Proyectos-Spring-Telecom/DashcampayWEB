import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { NavigationService } from './navigation.service';
import { NavigationLoaderService } from './navigation-loader.service';
export function provideNavigation() {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(NavigationService),
            multi: true
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(NavigationLoaderService),
            multi: true
        }
    ];
}
//# sourceMappingURL=navigation.provider.js.map