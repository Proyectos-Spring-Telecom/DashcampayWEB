import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VexPageLayoutContentDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { VexBreadcrumbsComponent } from "../../../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexPageLayoutHeaderDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutComponent } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
let PageLayoutCardLargeHeaderTabbedComponent = class PageLayoutCardLargeHeaderTabbedComponent {
    constructor() { }
    ngOnInit() { }
};
PageLayoutCardLargeHeaderTabbedComponent = __decorate([
    Component({
        selector: 'vex-page-layout-card-large-header-tabbed',
        templateUrl: './page-layout-card-large-header-tabbed.component.html',
        styleUrls: ['./page-layout-card-large-header-tabbed.component.scss'],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexBreadcrumbsComponent,
            VexPageLayoutContentDirective,
            MatTabsModule,
            PageLayoutDemoComponent
        ]
    })
], PageLayoutCardLargeHeaderTabbedComponent);
export { PageLayoutCardLargeHeaderTabbedComponent };
//# sourceMappingURL=page-layout-card-large-header-tabbed.component.js.map