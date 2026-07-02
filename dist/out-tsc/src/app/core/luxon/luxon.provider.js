import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { LuxonService } from './luxon.service';
export function provideLuxon() {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(LuxonService),
            multi: true
        }
    ];
}
//# sourceMappingURL=luxon.provider.js.map