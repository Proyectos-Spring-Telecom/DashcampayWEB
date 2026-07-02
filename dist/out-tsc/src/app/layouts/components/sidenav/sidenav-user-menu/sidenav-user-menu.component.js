import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
let SidenavUserMenuComponent = class SidenavUserMenuComponent {
    constructor(popoverRef) {
        this.popoverRef = popoverRef;
    }
    ngOnInit() { }
    close() {
        /** Wait for animation to complete and then close */
        setTimeout(() => this.popoverRef.close(), 250);
    }
};
SidenavUserMenuComponent = __decorate([
    Component({
        selector: 'vex-sidenav-user-menu',
        templateUrl: './sidenav-user-menu.component.html',
        styleUrls: ['./sidenav-user-menu.component.scss'],
        imports: [MatRippleModule, RouterLink, MatIconModule],
        standalone: true
    })
], SidenavUserMenuComponent);
export { SidenavUserMenuComponent };
//# sourceMappingURL=sidenav-user-menu.component.js.map