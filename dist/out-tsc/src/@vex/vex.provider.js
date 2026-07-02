import { ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { VexSplashScreenService } from "./services/vex-splash-screen.service";
import { VexLayoutService } from "./services/vex-layout.service";
import { VexDemoService } from "./services/vex-demo.service";
import { VexPlatformService } from "./services/vex-platform.service";
import { VEX_CONFIG, VEX_THEMES } from "./config/config.token";
import { VexHighlightModule } from "./components/vex-highlight/vex-highlight.module";
export function provideVex(options) {
    return [
        importProvidersFrom(VexHighlightModule),
        {
            provide: VEX_CONFIG,
            useValue: options.config
        },
        {
            provide: VEX_THEMES,
            useValue: options.availableThemes
        },
        {
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true
            }
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline'
            }
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(VexSplashScreenService),
            multi: true
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(VexLayoutService),
            multi: true
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(VexPlatformService),
            multi: true
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(VexDemoService),
            multi: true
        }
    ];
}
//# sourceMappingURL=vex.provider.js.map