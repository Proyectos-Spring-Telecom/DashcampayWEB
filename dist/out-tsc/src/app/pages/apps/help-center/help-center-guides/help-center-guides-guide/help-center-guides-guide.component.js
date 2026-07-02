import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let HelpCenterGuidesGuideComponent = class HelpCenterGuidesGuideComponent {
    constructor(guide) {
        this.guide = guide;
    }
    ngOnInit() { }
};
HelpCenterGuidesGuideComponent = __decorate([
    Component({
        selector: 'vex-help-center-guides-guide',
        templateUrl: './help-center-guides-guide.component.html',
        styleUrls: ['./help-center-guides-guide.component.scss'],
        standalone: true,
        imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule]
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], HelpCenterGuidesGuideComponent);
export { HelpCenterGuidesGuideComponent };
//# sourceMappingURL=help-center-guides-guide.component.js.map