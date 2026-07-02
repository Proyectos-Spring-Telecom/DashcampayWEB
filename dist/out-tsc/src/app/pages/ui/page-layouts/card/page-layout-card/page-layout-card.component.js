import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { VexPageLayoutContentDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { VexPageLayoutHeaderDirective } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutComponent } from "../../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
let PageLayoutCardComponent = class PageLayoutCardComponent {
    constructor() { }
    ngOnInit() { }
};
PageLayoutCardComponent = __decorate([
    Component({
        selector: 'vex-page-layout-card',
        templateUrl: './page-layout-card.component.html',
        styleUrls: ['./page-layout-card.component.scss'],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexPageLayoutContentDirective,
            PageLayoutDemoComponent
        ]
    })
], PageLayoutCardComponent);
export { PageLayoutCardComponent };
//# sourceMappingURL=page-layout-card.component.js.map