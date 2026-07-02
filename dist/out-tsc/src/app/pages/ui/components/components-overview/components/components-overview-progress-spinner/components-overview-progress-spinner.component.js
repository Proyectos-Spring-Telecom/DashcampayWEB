import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
let ComponentsOverviewProgressSpinnerComponent = class ComponentsOverviewProgressSpinnerComponent {
    constructor() {
        this.progressSpinnerHTML = `<mat-progress-spinner mode="determinate" [value]="40"></mat-progress-spinner>
<mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>`;
    }
    ngOnInit() { }
};
ComponentsOverviewProgressSpinnerComponent = __decorate([
    Component({
        selector: 'vex-components-overview-progress-spinner',
        templateUrl: './components-overview-progress-spinner.component.html',
        styleUrls: ['./components-overview-progress-spinner.component.scss'],
        standalone: true,
        imports: [MatProgressSpinnerModule, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewProgressSpinnerComponent);
export { ComponentsOverviewProgressSpinnerComponent };
//# sourceMappingURL=components-overview-progress-spinner.component.js.map