import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { map } from 'rxjs/operators';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe, KeyValuePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { VexColorScheme, VexConfigName } from "../../../../@vex/config/vex-config.interface";
import { isNil } from "../../../../@vex/utils/is-nil";
import { defaultRoundedButtonBorderRadius } from "../../../../@vex/config/constants";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { VEX_THEMES } from "../../../../@vex/config/config.token";
let ConfigPanelComponent = class ConfigPanelComponent {
    constructor(configService, themes) {
        this.configService = configService;
        this.themes = themes;
        this.configs = this.configService.configs;
        this.config$ = this.configService.config$;
        this.isRTL$ = this.config$.pipe(map((config) => config.direction === 'rtl'));
        this.colorScheme$ = this.config$.pipe(map((config) => config.style.colorScheme));
        this.borderRadius$ = this.config$.pipe(map((config) => config.style.borderRadius.value));
        this.ConfigName = VexConfigName;
        this.ColorSchemeName = VexColorScheme;
        this.selectedTheme$ = this.configService.select((config) => config.style.themeClassName);
        this.isSelectedTheme$ = this.configService
            .select((config) => config.style.themeClassName)
            .pipe(map((themeClassName) => (theme) => themeClassName === theme));
        this.roundedCornerValues = [
            {
                value: 0,
                unit: 'rem'
            },
            {
                value: 0.25,
                unit: 'rem'
            },
            {
                value: 0.5,
                unit: 'rem'
            },
            {
                value: 0.75,
                unit: 'rem'
            },
            {
                value: 1,
                unit: 'rem'
            },
            {
                value: 1.25,
                unit: 'rem'
            },
            {
                value: 1.5,
                unit: 'rem'
            },
            {
                value: 1.75,
                unit: 'rem'
            }
        ];
        this.roundedButtonValue = defaultRoundedButtonBorderRadius;
    }
    setConfig(layout, colorScheme) {
        this.configService.setConfig(layout);
        this.configService.updateConfig({
            style: {
                colorScheme
            }
        });
    }
    selectTheme(theme) {
        this.configService.updateConfig({
            style: {
                themeClassName: theme.className
            }
        });
    }
    enableDarkMode() {
        this.configService.updateConfig({
            style: {
                colorScheme: VexColorScheme.DARK
            }
        });
    }
    disableDarkMode() {
        this.configService.updateConfig({
            style: {
                colorScheme: VexColorScheme.LIGHT
            }
        });
    }
    layoutRTLChange(change) {
        this.configService.updateConfig({
            direction: change.checked ? 'rtl' : 'ltr'
        });
    }
    toolbarPositionChange(change) {
        this.configService.updateConfig({
            toolbar: {
                fixed: change.value === 'fixed'
            }
        });
    }
    footerVisibleChange(change) {
        this.configService.updateConfig({
            footer: {
                visible: change.checked
            }
        });
    }
    footerPositionChange(change) {
        this.configService.updateConfig({
            footer: {
                fixed: change.value === 'fixed'
            }
        });
    }
    isSelectedBorderRadius(borderRadius, config) {
        return (borderRadius.value === config.style.borderRadius.value &&
            borderRadius.unit === config.style.borderRadius.unit);
    }
    selectBorderRadius(borderRadius) {
        this.configService.updateConfig({
            style: {
                borderRadius: borderRadius
            }
        });
    }
    isSelectedButtonStyle(buttonStyle, config) {
        if (isNil(config.style.button.borderRadius) && isNil(buttonStyle)) {
            return true;
        }
        return buttonStyle?.value === config.style.button.borderRadius?.value;
    }
    selectButtonStyle(borderRadius) {
        this.configService.updateConfig({
            style: {
                button: {
                    borderRadius: borderRadius
                }
            }
        });
    }
    isDark(colorScheme) {
        return colorScheme === VexColorScheme.DARK;
    }
};
ConfigPanelComponent = __decorate([
    Component({
        selector: 'vex-config-panel',
        templateUrl: './config-panel.component.html',
        styleUrls: ['./config-panel.component.scss'],
        standalone: true,
        imports: [
            NgIf,
            MatIconModule,
            MatRippleModule,
            NgFor,
            MatButtonModule,
            NgClass,
            MatSlideToggleModule,
            MatRadioModule,
            AsyncPipe,
            UpperCasePipe,
            KeyValuePipe
        ]
    }),
    __param(1, Inject(VEX_THEMES))
], ConfigPanelComponent);
export { ConfigPanelComponent };
//# sourceMappingURL=config-panel.component.js.map