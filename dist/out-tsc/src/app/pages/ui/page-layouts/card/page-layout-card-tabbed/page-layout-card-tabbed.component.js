import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VexPageLayoutContentDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { VexPageLayoutHeaderDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutComponent } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
let PageLayoutCardTabbedComponent = class PageLayoutCardTabbedComponent {
    constructor() { }
    ngOnInit() { }
};
PageLayoutCardTabbedComponent = __decorate([
    Component({
        selector: 'vex-page-layout-card-tabbed',
        templateUrl: './page-layout-card-tabbed.component.html',
        styleUrls: ['./page-layout-card-tabbed.component.scss'],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexPageLayoutContentDirective,
            MatTabsModule,
            PageLayoutDemoComponent
        ]
    })
], PageLayoutCardTabbedComponent);
export { PageLayoutCardTabbedComponent };
//# sourceMappingURL=page-layout-card-tabbed.component.js.map