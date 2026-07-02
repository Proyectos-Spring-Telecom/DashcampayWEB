import { __decorate } from "tslib";
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
let VexPageLayoutComponent = class VexPageLayoutComponent {
    constructor() {
        this.mode = 'simple';
    }
    get isCard() {
        return this.mode === 'card';
    }
    get isSimple() {
        return this.mode === 'simple';
    }
};
__decorate([
    Input()
], VexPageLayoutComponent.prototype, "mode", void 0);
__decorate([
    HostBinding('class.vex-page-layout-card')
], VexPageLayoutComponent.prototype, "isCard", null);
__decorate([
    HostBinding('class.vex-page-layout-simple')
], VexPageLayoutComponent.prototype, "isSimple", null);
VexPageLayoutComponent = __decorate([
    Component({
        selector: 'vex-page-layout',
        template: '<ng-content></ng-content>',
        host: {
            class: 'vex-page-layout'
        },
        encapsulation: ViewEncapsulation.None,
        styleUrls: ['./vex-page-layout.component.scss'],
        standalone: true
    })
], VexPageLayoutComponent);
export { VexPageLayoutComponent };
//# sourceMappingURL=vex-page-layout.component.js.map