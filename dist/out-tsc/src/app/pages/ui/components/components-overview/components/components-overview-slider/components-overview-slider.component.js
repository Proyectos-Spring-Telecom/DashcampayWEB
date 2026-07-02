import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
let ComponentsOverviewSliderComponent = class ComponentsOverviewSliderComponent {
    constructor() {
        this.sliderHTML = `<mat-slider min="1" max="10" thumbLabel tickInterval="1"></mat-slider>`;
    }
    ngOnInit() { }
};
ComponentsOverviewSliderComponent = __decorate([
    Component({
        selector: 'vex-components-overview-slider',
        templateUrl: './components-overview-slider.component.html',
        styleUrls: ['./components-overview-slider.component.scss'],
        standalone: true,
        imports: [MatSliderModule, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewSliderComponent);
export { ComponentsOverviewSliderComponent };
//# sourceMappingURL=components-overview-slider.component.js.map