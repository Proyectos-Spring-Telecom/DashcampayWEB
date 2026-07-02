import { __decorate, __param } from "tslib";
import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
let VexSidebarComponent = class VexSidebarComponent {
    constructor(document) {
        this.document = document;
        this.position = 'left';
        this.invisibleBackdrop = false;
        this._opened = false;
    }
    get opened() {
        return this._opened;
    }
    set opened(opened) {
        this._opened = opened;
        opened ? this.enableScrollblock() : this.disableScrollblock();
    }
    get positionLeft() {
        return this.position === 'left';
    }
    get positionRight() {
        return this.position === 'right';
    }
    enableScrollblock() {
        if (!this.document.body.classList.contains('vex-scrollblock')) {
            this.document.body.classList.add('vex-scrollblock');
        }
    }
    disableScrollblock() {
        if (this.document.body.classList.contains('vex-scrollblock')) {
            this.document.body.classList.remove('vex-scrollblock');
        }
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    ngOnDestroy() { }
};
__decorate([
    Input()
], VexSidebarComponent.prototype, "position", void 0);
__decorate([
    Input()
], VexSidebarComponent.prototype, "invisibleBackdrop", void 0);
__decorate([
    Input()
], VexSidebarComponent.prototype, "opened", null);
VexSidebarComponent = __decorate([
    Component({
        selector: 'vex-sidebar',
        templateUrl: './vex-sidebar.component.html',
        styleUrls: ['./vex-sidebar.component.scss'],
        host: {
            class: 'vex-sidebar'
        },
        standalone: true
    }),
    __param(0, Inject(DOCUMENT))
], VexSidebarComponent);
export { VexSidebarComponent };
//# sourceMappingURL=vex-sidebar.component.js.map