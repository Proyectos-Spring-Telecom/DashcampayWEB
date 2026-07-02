import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
let VexSecondaryToolbarComponent = class VexSecondaryToolbarComponent {
    constructor(configService) {
        this.configService = configService;
        this.fixed$ = this.configService.config$.pipe(map((config) => config.toolbar.fixed));
        this.isVerticalLayout$ = this.configService
            .select((config) => config.layout)
            .pipe(map((layout) => layout === 'vertical'));
    }
};
__decorate([
    Input()
], VexSecondaryToolbarComponent.prototype, "current", void 0);
VexSecondaryToolbarComponent = __decorate([
    Component({
        selector: 'vex-secondary-toolbar',
        template: `
    <div class="secondary-toolbar-placeholder">&nbsp;</div>

    <div
      [ngClass]="{ fixed: fixed$ | async, 'w-full': !(fixed$ | async) }"
      class="secondary-toolbar py-1 z-40 border-t flex">
      <div
        class="px-6 flex items-center flex-auto"
        [class.container]="isVerticalLayout$ | async">
        <h1
          *ngIf="current"
          class="subheading-2 font-medium m-0 ltr:pr-3 rtl:pl-3 ltr:border-r rtl:border-l ltr:mr-3 rtl:ml-3 flex-none">
          {{ current }}
        </h1>

        <ng-content></ng-content>
      </div>
    </div>
  `,
        styleUrls: ['./vex-secondary-toolbar.component.scss'],
        standalone: true,
        imports: [NgClass, NgIf, AsyncPipe]
    })
], VexSecondaryToolbarComponent);
export { VexSecondaryToolbarComponent };
//# sourceMappingURL=vex-secondary-toolbar.component.js.map