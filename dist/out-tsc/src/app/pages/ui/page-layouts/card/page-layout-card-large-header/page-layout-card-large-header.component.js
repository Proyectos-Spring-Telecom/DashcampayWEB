import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { VexPageLayoutContentDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { VexBreadcrumbsComponent } from "../../../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexPageLayoutHeaderDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutComponent } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
let PageLayoutCardLargeHeaderComponent = class PageLayoutCardLargeHeaderComponent {
    constructor() { }
    ngOnInit() { }
};
PageLayoutCardLargeHeaderComponent = __decorate([
    Component({
        selector: 'vex-page-layout-card-large-header',
        templateUrl: './page-layout-card-large-header.component.html',
        styleUrls: ['./page-layout-card-large-header.component.scss'],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexBreadcrumbsComponent,
            VexPageLayoutContentDirective,
            PageLayoutDemoComponent
        ]
    })
], PageLayoutCardLargeHeaderComponent);
export { PageLayoutCardLargeHeaderComponent };
//# sourceMappingURL=page-layout-card-large-header.component.js.map