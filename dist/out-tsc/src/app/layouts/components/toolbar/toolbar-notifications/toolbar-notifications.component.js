import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let ToolbarNotificationsComponent = class ToolbarNotificationsComponent {
    constructor(popover, cd) {
        this.popover = popover;
        this.cd = cd;
        this.dropdownOpen = false;
    }
    ngOnInit() { }
    showPopover() {
        this.dropdownOpen = true;
        this.cd.markForCheck();
        if (!this.originRef) {
            throw new Error('originRef undefined!');
        }
        const popoverRef = this.popover.open({
            content: ToolbarNotificationsDropdownComponent,
            origin: this.originRef,
            offsetY: 12,
            position: [
                {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom'
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ]
        });
        popoverRef.afterClosed$.subscribe(() => {
            this.dropdownOpen = false;
            this.cd.markForCheck();
        });
    }
};
__decorate([
    ViewChild('originRef', { static: true, read: ElementRef })
], ToolbarNotificationsComponent.prototype, "originRef", void 0);
ToolbarNotificationsComponent = __decorate([
    Component({
        selector: 'vex-toolbar-notifications',
        templateUrl: './toolbar-notifications.component.html',
        styleUrls: ['./toolbar-notifications.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [MatButtonModule, MatIconModule]
    })
], ToolbarNotificationsComponent);
export { ToolbarNotificationsComponent };
//# sourceMappingURL=toolbar-notifications.component.js.map