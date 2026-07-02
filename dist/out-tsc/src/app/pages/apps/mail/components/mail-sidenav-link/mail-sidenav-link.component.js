import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
let MailSidenavLinkComponent = class MailSidenavLinkComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input({ required: true })
], MailSidenavLinkComponent.prototype, "link", void 0);
MailSidenavLinkComponent = __decorate([
    Component({
        selector: 'vex-mail-sidenav-link',
        templateUrl: './mail-sidenav-link.component.html',
        styleUrls: ['./mail-sidenav-link.component.scss'],
        standalone: true,
        imports: [MatRippleModule, RouterLinkActive, RouterLink, MatIconModule]
    })
], MailSidenavLinkComponent);
export { MailSidenavLinkComponent };
//# sourceMappingURL=mail-sidenav-link.component.js.map