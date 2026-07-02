import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
let MailAttachmentComponent = class MailAttachmentComponent {
    constructor() { }
    ngOnInit() { }
    isImage() {
        return (this.attachment?.type === 'png' ||
            this.attachment?.type === 'jpg' ||
            this.attachment?.type === 'gif' ||
            this.attachment?.type === 'jpe');
    }
};
__decorate([
    Input({ required: true })
], MailAttachmentComponent.prototype, "attachment", void 0);
MailAttachmentComponent = __decorate([
    Component({
        selector: 'vex-mail-attachment',
        templateUrl: './mail-attachment.component.html',
        styleUrls: ['./mail-attachment.component.scss'],
        standalone: true,
        imports: [NgIf]
    })
], MailAttachmentComponent);
export { MailAttachmentComponent };
//# sourceMappingURL=mail-attachment.component.js.map