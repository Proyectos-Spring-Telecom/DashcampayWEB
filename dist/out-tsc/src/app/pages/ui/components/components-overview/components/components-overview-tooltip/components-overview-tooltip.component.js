import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
let ComponentsOverviewTooltipComponent = class ComponentsOverviewTooltipComponent {
    constructor() {
        this.tooltipHTML = `<button mat-icon-button matTooltip="Favorite this">
  <mat-icon>favorite</mat-icon>
</button>`;
    }
    ngOnInit() { }
};
ComponentsOverviewTooltipComponent = __decorate([
    Component({
        selector: 'vex-components-overview-tooltip',
        templateUrl: './components-overview-tooltip.component.html',
        styleUrls: ['./components-overview-tooltip.component.scss'],
        standalone: true,
        imports: [
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatTabsModule,
            VexHighlightDirective
        ]
    })
], ComponentsOverviewTooltipComponent);
export { ComponentsOverviewTooltipComponent };
//# sourceMappingURL=components-overview-tooltip.component.js.map