import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
let ComponentsOverviewCheckboxComponent = class ComponentsOverviewCheckboxComponent {
    constructor() {
        this.checkboxHTML = `<mat-checkbox>Checkbox</mat-checkbox>
<mat-checkbox color="primary" [checked]="true">Primary</mat-checkbox>
<mat-checkbox color="accent" [checked]="true">Accent</mat-checkbox>
<mat-checkbox color="warn" [checked]="true">Warn</mat-checkbox>
<mat-checkbox disabled [checked]="true">Disabled</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>`;
    }
    ngOnInit() { }
};
ComponentsOverviewCheckboxComponent = __decorate([
    Component({
        selector: 'vex-components-overview-checkbox',
        templateUrl: './components-overview-checkbox.component.html',
        styleUrls: ['./components-overview-checkbox.component.scss'],
        standalone: true,
        imports: [MatCheckboxModule, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewCheckboxComponent);
export { ComponentsOverviewCheckboxComponent };
//# sourceMappingURL=components-overview-checkbox.component.js.map