import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { asapScheduler } from 'rxjs';
// @ts-ignore
import ApexCharts from 'apexcharts';
let VexChartComponent = class VexChartComponent {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.options = {};
        this.series = [];
        this.autoUpdateSeries = true;
    }
    ngOnInit() {
        asapScheduler.schedule(() => {
            this._createElement();
        });
    }
    ngOnChanges(changes) {
        asapScheduler.schedule(() => {
            if (this.autoUpdateSeries &&
                Object.keys(changes).filter((c) => c !== 'series').length === 0) {
                this.chart?.updateSeries(this.series, true);
                return;
            }
            this._createElement();
        });
    }
    render() {
        this.chart?.render();
    }
    _createElement() {
        if (this.series) {
            this.options.series = this.series;
        }
        if (this.chart) {
            this.chart.destroy();
        }
        this.ngZone.runOutsideAngular(() => {
            if (!this.chartElement) {
                return;
            }
            this.chart = new ApexCharts(this.chartElement.nativeElement, this.options);
            this.render();
        });
    }
};
__decorate([
    Input()
], VexChartComponent.prototype, "options", void 0);
__decorate([
    Input()
], VexChartComponent.prototype, "series", void 0);
__decorate([
    Input()
], VexChartComponent.prototype, "autoUpdateSeries", void 0);
__decorate([
    ViewChild('chart', { static: true })
], VexChartComponent.prototype, "chartElement", void 0);
VexChartComponent = __decorate([
    Component({
        selector: 'vex-chart',
        template: ` <div #chart></div> `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true
    })
], VexChartComponent);
export { VexChartComponent };
//# sourceMappingURL=vex-chart.component.js.map