import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VexStripHtmlPipe } from "../../../../../../@vex/pipes/vex-strip-html/vex-strip-html.pipe";
import { VexDateFormatRelativePipe } from "../../../../../../@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe";
import { MailLabelComponent } from '../mail-label/mail-label.component';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
let MailListEntryComponent = class MailListEntryComponent {
    constructor(cd, mailService) {
        this.cd = cd;
        this.mailService = mailService;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this.hovered = false;
    }
    ngOnInit() { }
    isCheckboxVisible() {
        return this.selected || this.hovered;
    }
    isStarVisible() {
        return this.mail?.starred || this.isCheckboxVisible();
    }
    onMouseEnter() {
        this.hovered = true;
        this.cd.markForCheck();
    }
    onMouseLeave() {
        this.hovered = false;
        this.cd.markForCheck();
    }
    onCheckboxChange(event) {
        this.selectedChange.emit(event.checked);
    }
    toggleStar(event) {
        event?.preventDefault();
        event?.stopPropagation();
        this.mail.starred = !this.mail.starred;
        this.cd.markForCheck();
    }
    markMailAsRead(mailId) {
        this.mailService.markMailAsRead(mailId);
    }
};
__decorate([
    Input({ required: true })
], MailListEntryComponent.prototype, "mail", void 0);
__decorate([
    Input()
], MailListEntryComponent.prototype, "selected", void 0);
__decorate([
    Output()
], MailListEntryComponent.prototype, "selectedChange", void 0);
MailListEntryComponent = __decorate([
    Component({
        selector: 'vex-mail-list-entry',
        templateUrl: './mail-list-entry.component.html',
        styleUrls: ['./mail-list-entry.component.scss'],
        standalone: true,
        imports: [
            RouterLinkActive,
            RouterLink,
            MatCheckboxModule,
            MatRippleModule,
            MatIconModule,
            NgClass,
            NgFor,
            MailLabelComponent,
            VexDateFormatRelativePipe,
            VexStripHtmlPipe
        ]
    })
], MailListEntryComponent);
export { MailListEntryComponent };
//# sourceMappingURL=mail-list-entry.component.js.map