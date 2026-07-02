import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VexChartComponent } from "../../../../../../@vex/components/vex-chart/vex-chart.component";
import { defaultChartOptions } from "../../../../../../@vex/utils/default-chart-options";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { scaleInOutAnimation } from "../../../../../../@vex/animations/scale-in-out.animation";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
let WidgetQuickLineChartComponent = class WidgetQuickLineChartComponent {
    constructor(_bottomSheet) {
        this._bottomSheet = _bottomSheet;
        this.options = defaultChartOptions({
            chart: {
                type: 'area',
                height: 100
            }
        });
        this.series = [];
        this.showButton = false;
    }
    ngOnInit() { }
    openSheet() {
        this._bottomSheet.open(ShareBottomSheetComponent);
    }
};
__decorate([
    Input({ required: true })
], WidgetQuickLineChartComponent.prototype, "icon", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickLineChartComponent.prototype, "value", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickLineChartComponent.prototype, "label", void 0);
__decorate([
    Input()
], WidgetQuickLineChartComponent.prototype, "iconClass", void 0);
__decorate([
    Input()
], WidgetQuickLineChartComponent.prototype, "options", void 0);
__decorate([
    Input()
], WidgetQuickLineChartComponent.prototype, "series", void 0);
WidgetQuickLineChartComponent = __decorate([
    Component({
        selector: 'vex-widget-quick-line-chart',
        templateUrl: './widget-quick-line-chart.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [scaleInOutAnimation],
        standalone: true,
        imports: [
            NgClass,
            MatIconModule,
            VexChartComponent,
            NgIf,
            MatButtonModule,
            MatBottomSheetModule
        ]
    })
], WidgetQuickLineChartComponent);
export { WidgetQuickLineChartComponent };
//# sourceMappingURL=widget-quick-line-chart.component.js.map