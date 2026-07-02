import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import SimpleBar from 'simplebar';
let VexScrollbarComponent = class VexScrollbarComponent {
    constructor(_element, zone) {
        this._element = _element;
        this.zone = zone;
    }
    ngAfterContentInit() {
        this.zone.runOutsideAngular(() => {
            this.scrollbarRef = new SimpleBar(this._element.nativeElement, this.options);
        });
    }
    ngOnDestroy() {
        /**
         * Exists, but not typed in the type definition
         * https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/src/simplebar.js#L903
         */
        if (this.scrollbarRef && this.scrollbarRef.unMount) {
            this.scrollbarRef.unMount();
        }
    }
};
__decorate([
    Input()
], VexScrollbarComponent.prototype, "options", void 0);
VexScrollbarComponent = __decorate([
    Component({
        selector: 'vex-scrollbar',
        template: ` <ng-content></ng-content>`,
        styleUrls: ['./vex-scrollbar.component.scss'],
        host: {
            class: 'vex-scrollbar'
        },
        standalone: true
    })
], VexScrollbarComponent);
export { VexScrollbarComponent };
//# sourceMappingURL=vex-scrollbar.component.js.map