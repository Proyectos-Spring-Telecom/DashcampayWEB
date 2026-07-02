import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { VexChartComponent } from "../../../../../../@vex/components/vex-chart/vex-chart.component";
import { defaultChartOptions } from "../../../../../../@vex/utils/default-chart-options";
import { createDateArray } from "../../../../../../@vex/utils/create-date-array";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let WidgetLargeGoalChartComponent = class WidgetLargeGoalChartComponent {
    constructor() {
        this.series = [];
        this.options = defaultChartOptions({
            grid: {
                show: true,
                strokeDashArray: 3,
                padding: {
                    left: 16
                }
            },
            chart: {
                type: 'line',
                height: 300,
                sparkline: {
                    enabled: false
                },
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                width: 4
            },
            labels: createDateArray(12),
            xaxis: {
                type: 'datetime',
                labels: {
                    show: true
                }
            },
            yaxis: {
                labels: {
                    show: true
                }
            }
        });
    }
    ngOnInit() { }
};
__decorate([
    Input({ required: true })
], WidgetLargeGoalChartComponent.prototype, "total", void 0);
__decorate([
    Input()
], WidgetLargeGoalChartComponent.prototype, "series", void 0);
__decorate([
    Input()
], WidgetLargeGoalChartComponent.prototype, "options", void 0);
WidgetLargeGoalChartComponent = __decorate([
    Component({
        selector: 'vex-widget-large-goal-chart',
        templateUrl: './widget-large-goal-chart.component.html',
        standalone: true,
        imports: [MatButtonModule, MatIconModule, VexChartComponent]
    })
], WidgetLargeGoalChartComponent);
export { WidgetLargeGoalChartComponent };
//# sourceMappingURL=widget-large-goal-chart.component.js.map