import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
let ComponentsOverviewProgressComponent = class ComponentsOverviewProgressComponent {
    constructor() {
        this.progressHTML = `<mat-progress-bar mode="determinate" [value]="40"></mat-progress-bar>
<mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
<mat-progress-bar mode="buffer" color="accent"></mat-progress-bar>
<mat-progress-bar mode="query" color="warn"></mat-progress-bar>`;
    }
    ngOnInit() { }
};
ComponentsOverviewProgressComponent = __decorate([
    Component({
        selector: 'vex-components-overview-progress',
        templateUrl: './components-overview-progress.component.html',
        styleUrls: ['./components-overview-progress.component.scss'],
        standalone: true,
        imports: [MatProgressBarModule, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewProgressComponent);
export { ComponentsOverviewProgressComponent };
//# sourceMappingURL=components-overview-progress.component.js.map