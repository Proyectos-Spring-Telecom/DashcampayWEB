import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
let QuickpanelComponent = class QuickpanelComponent {
    constructor() {
        this.date = DateTime.local().toFormat('DD');
        this.dayName = DateTime.local().toFormat('EEEE');
    }
    ngOnInit() { }
};
QuickpanelComponent = __decorate([
    Component({
        selector: 'vex-quickpanel',
        templateUrl: './quickpanel.component.html',
        styleUrls: ['./quickpanel.component.scss'],
        standalone: true,
        imports: [
            MatDividerModule,
            MatListModule,
            RouterLink,
            MatRippleModule,
            MatProgressBarModule
        ]
    })
], QuickpanelComponent);
export { QuickpanelComponent };
//# sourceMappingURL=quickpanel.component.js.map