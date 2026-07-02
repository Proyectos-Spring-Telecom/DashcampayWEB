import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgIf } from '@angular/common';
let SocialTimelineEntryComponent = class SocialTimelineEntryComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input({ required: true })
], SocialTimelineEntryComponent.prototype, "avatarUrl", void 0);
__decorate([
    Input({ required: true })
], SocialTimelineEntryComponent.prototype, "name", void 0);
__decorate([
    Input({ required: true })
], SocialTimelineEntryComponent.prototype, "time", void 0);
__decorate([
    Input()
], SocialTimelineEntryComponent.prototype, "imageUrl", void 0);
__decorate([
    Input({ required: true })
], SocialTimelineEntryComponent.prototype, "likes", void 0);
__decorate([
    Input({ required: true })
], SocialTimelineEntryComponent.prototype, "comments", void 0);
SocialTimelineEntryComponent = __decorate([
    Component({
        selector: 'vex-profile-timeline-entry',
        templateUrl: './social-timeline-entry.component.html',
        styleUrls: ['./social-timeline-entry.component.scss'],
        standalone: true,
        imports: [NgIf, MatRippleModule, MatIconModule]
    })
], SocialTimelineEntryComponent);
export { SocialTimelineEntryComponent };
//# sourceMappingURL=social-timeline-entry.component.js.map