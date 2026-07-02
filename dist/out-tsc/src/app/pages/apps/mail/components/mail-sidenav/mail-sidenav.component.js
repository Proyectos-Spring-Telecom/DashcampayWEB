import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { stagger40ms } from "../../../../../../@vex/animations/stagger.animation";
import { fadeInUp400ms } from "../../../../../../@vex/animations/fade-in-up.animation";
import { MailSidenavLinkComponent } from '../mail-sidenav-link/mail-sidenav-link.component';
import { NgFor } from '@angular/common';
let MailSidenavComponent = class MailSidenavComponent {
    constructor(layoutService) {
        this.layoutService = layoutService;
        this.links = [
            {
                label: 'Inbox',
                route: ['./inbox'],
                icon: 'mat:inbox'
            },
            {
                label: 'All Mails',
                route: ['./all'],
                icon: 'mat:all_inbox'
            },
            {
                label: 'Starred',
                route: ['./starred'],
                icon: 'mat:star'
            },
            {
                label: 'Drafts',
                route: ['./drafts'],
                icon: 'mat:drafts'
            },
            {
                label: 'Sent',
                route: ['./sent'],
                icon: 'mat:send'
            }
        ];
        this.labelLinks = [
            {
                label: 'Important',
                route: ['./important'],
                icon: 'mat:label_important'
            },
            {
                label: 'Business',
                route: ['./business'],
                icon: 'mat:business'
            },
            {
                label: 'Secret',
                route: ['./secret'],
                icon: 'mat:lock'
            }
        ];
    }
    ngOnInit() { }
    closeDrawer() {
        if (this.layoutService.isLtLg()) {
            this.drawer?.close();
        }
    }
};
__decorate([
    Input({ required: true })
], MailSidenavComponent.prototype, "drawer", void 0);
MailSidenavComponent = __decorate([
    Component({
        selector: 'vex-mail-sidenav',
        templateUrl: './mail-sidenav.component.html',
        styleUrls: ['./mail-sidenav.component.scss'],
        animations: [stagger40ms, fadeInUp400ms],
        standalone: true,
        imports: [NgFor, MailSidenavLinkComponent]
    })
], MailSidenavComponent);
export { MailSidenavComponent };
//# sourceMappingURL=mail-sidenav.component.js.map