import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
let ToolbarUserComponent = class ToolbarUserComponent {
    constructor(popover, cd) {
        this.popover = popover;
        this.cd = cd;
        this.dropdownOpen = false;
    }
    ngOnInit() { }
    showPopover(originRef) {
        this.dropdownOpen = true;
        this.cd.markForCheck();
        const popoverRef = this.popover.open({
            content: ToolbarUserDropdownComponent,
            origin: originRef,
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
ToolbarUserComponent = __decorate([
    Component({
        selector: 'vex-toolbar-user',
        templateUrl: './toolbar-user.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [MatRippleModule, MatIconModule]
    })
], ToolbarUserComponent);
export { ToolbarUserComponent };
//# sourceMappingURL=toolbar-user.component.js.map