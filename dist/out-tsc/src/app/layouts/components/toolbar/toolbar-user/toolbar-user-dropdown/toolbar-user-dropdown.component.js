import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackById } from "../../../../../../@vex/utils/track-by";
import { RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
let ToolbarUserDropdownComponent = class ToolbarUserDropdownComponent {
    constructor(cd, popoverRef) {
        this.cd = cd;
        this.popoverRef = popoverRef;
        this.items = [
            {
                id: '1',
                icon: 'mat:account_circle',
                label: 'My Profile',
                description: 'Personal Information',
                colorClass: 'text-teal-600',
                route: '/apps/social'
            },
            {
                id: '2',
                icon: 'mat:move_to_inbox',
                label: 'My Inbox',
                description: 'Messages & Latest News',
                colorClass: 'text-primary-600',
                route: '/apps/chat'
            },
            {
                id: '3',
                icon: 'mat:list_alt',
                label: 'My Projects',
                description: 'Tasks & Active Projects',
                colorClass: 'text-amber-600',
                route: '/apps/scrumboard'
            },
            {
                id: '4',
                icon: 'mat:table_chart',
                label: 'Billing Information',
                description: 'Pricing & Current Plan',
                colorClass: 'text-purple-600',
                route: '/pages/pricing'
            }
        ];
        this.statuses = [
            {
                id: 'online',
                label: 'Online',
                icon: 'mat:check_circle',
                colorClass: 'text-green-600'
            },
            {
                id: 'away',
                label: 'Away',
                icon: 'mat:access_time',
                colorClass: 'text-orange-600'
            },
            {
                id: 'dnd',
                label: 'Do not disturb',
                icon: 'mat:do_not_disturb',
                colorClass: 'text-red-600'
            },
            {
                id: 'offline',
                label: 'Offline',
                icon: 'mat:offline_bolt',
                colorClass: 'text-gray-600'
            }
        ];
        this.activeStatus = this.statuses[0];
        this.trackById = trackById;
    }
    ngOnInit() { }
    setStatus(status) {
        this.activeStatus = status;
        this.cd.markForCheck();
    }
    close() {
        this.popoverRef.close();
    }
};
ToolbarUserDropdownComponent = __decorate([
    Component({
        selector: 'vex-toolbar-user-dropdown',
        templateUrl: './toolbar-user-dropdown.component.html',
        styleUrls: ['./toolbar-user-dropdown.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [
            MatIconModule,
            MatButtonModule,
            MatTooltipModule,
            MatMenuModule,
            NgFor,
            MatRippleModule,
            RouterLink,
            NgClass,
            NgIf
        ]
    })
], ToolbarUserDropdownComponent);
export { ToolbarUserDropdownComponent };
//# sourceMappingURL=toolbar-user-dropdown.component.js.map