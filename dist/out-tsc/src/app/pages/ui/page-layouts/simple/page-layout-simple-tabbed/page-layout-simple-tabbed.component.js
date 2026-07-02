import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VexPageLayoutContentDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from "../../../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexSecondaryToolbarComponent } from "../../../../../../@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import { VexPageLayoutComponent } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
let PageLayoutSimpleTabbedComponent = class PageLayoutSimpleTabbedComponent {
    constructor() { }
    ngOnInit() { }
};
PageLayoutSimpleTabbedComponent = __decorate([
    Component({
        selector: 'vex-page-layout-simple-tabbed',
        templateUrl: './page-layout-simple-tabbed.component.html',
        styleUrls: ['./page-layout-simple-tabbed.component.scss'],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexSecondaryToolbarComponent,
            VexBreadcrumbsComponent,
            MatButtonModule,
            MatIconModule,
            VexPageLayoutContentDirective,
            MatTabsModule,
            PageLayoutDemoComponent
        ]
    })
], PageLayoutSimpleTabbedComponent);
export { PageLayoutSimpleTabbedComponent };
//# sourceMappingURL=page-layout-simple-tabbed.component.js.map