import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { IconsService } from './icons.service';
export function provideIcons() {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(IconsService),
            multi: true
        }
    ];
}
//# sourceMappingURL=icons.provider.js.map