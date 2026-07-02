import { __decorate } from "tslib";
import { Component, TemplateRef } from '@angular/core';
import { popoverAnimation } from '../../animations/popover.animation';
import { NgComponentOutlet, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
let VexPopoverComponent = class VexPopoverComponent {
    constructor(popoverRef) {
        this.popoverRef = popoverRef;
        this.renderMethod = 'component';
    }
    ngOnInit() {
        this.content = this.popoverRef.content;
        if (typeof this.content === 'string') {
            this.renderMethod = 'text';
        }
        if (this.content instanceof TemplateRef) {
            this.renderMethod = 'template';
            this.context = {
                close: this.popoverRef.close.bind(this.popoverRef)
            };
        }
    }
};
VexPopoverComponent = __decorate([
    Component({
        selector: 'vex-popover',
        templateUrl: './vex-popover.component.html',
        styleUrls: ['./vex-popover.component.scss'],
        animations: [popoverAnimation],
        standalone: true,
        imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet, NgComponentOutlet]
    })
], VexPopoverComponent);
export { VexPopoverComponent };
//# sourceMappingURL=vex-popover.component.js.map