import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOADING_BAR_CONFIG, LoadingBarModule } from '@ngx-loading-bar/core';
import { delayWhen, interval, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
let VexProgressBarComponent = class VexProgressBarComponent {
    constructor(loader) {
        this.loader = loader;
        this.value$ = this.loader
            .useRef('router')
            .value$.pipe(delayWhen((value) => (value === 0 ? interval(200) : of(undefined))));
    }
};
VexProgressBarComponent = __decorate([
    Component({
        selector: 'vex-progress-bar',
        templateUrl: './vex-progress-bar.component.html',
        styleUrls: ['./vex-progress-bar.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [
            MatProgressBarModule,
            LoadingBarModule,
            LoadingBarRouterModule,
            AsyncPipe
        ],
        providers: [
            {
                provide: LOADING_BAR_CONFIG,
                useValue: {
                    latencyThreshold: 80
                }
            }
        ]
    })
], VexProgressBarComponent);
export { VexProgressBarComponent };
//# sourceMappingURL=vex-progress-bar.component.js.map