import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import { tableSalesData } from '../../../../static-data/table-sales-data';
import { WidgetTableComponent } from '../components/widgets/widget-table/widget-table.component';
import { WidgetLargeChartComponent } from '../components/widgets/widget-large-chart/widget-large-chart.component';
import { WidgetQuickValueCenterComponent } from '../components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { WidgetLargeGoalChartComponent } from '../components/widgets/widget-large-goal-chart/widget-large-goal-chart.component';
import { WidgetQuickLineChartComponent } from '../components/widgets/widget-quick-line-chart/widget-quick-line-chart.component';
import { WidgetAssistantComponent } from '../components/widgets/widget-assistant/widget-assistant.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from "../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexSecondaryToolbarComponent } from "../../../../@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
let DashboardAnalyticsComponent = class DashboardAnalyticsComponent {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.opcionesFiltro = [
            { valor: 1, etiqueta: 'Hoy' },
            { valor: 2, etiqueta: '7 Días' },
            { valor: 3, etiqueta: 'Mes Actual' },
            { valor: 4, etiqueta: 'Año Actual' }
        ];
        this.filtroSeleccionado = this.opcionesFiltro[0];
        this.metricas = null;
        this.cargando = false;
        this.compararFiltros = (f1, f2) => {
            return f1 && f2 ? f1.valor === f2.valor : f1 === f2;
        };
        this.tableColumns = [
            {
                label: '',
                property: 'status',
                type: 'badge'
            },
            {
                label: 'PRODUCT',
                property: 'name',
                type: 'text'
            },
            {
                label: '$ PRICE',
                property: 'price',
                type: 'text',
                cssClasses: ['font-medium']
            },
            {
                label: 'DATE',
                property: 'timestamp',
                type: 'text',
                cssClasses: ['text-secondary']
            }
        ];
        this.tableData = tableSalesData;
        this.series = [
            {
                name: 'Subscribers',
                data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
            }
        ];
        this.userSessionsSeries = [
            {
                name: 'Users',
                data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60]
            },
            {
                name: 'Sessions',
                data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50]
            }
        ];
        this.salesSeries = [
            {
                name: 'Sales',
                data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
            }
        ];
        this.pageViewsSeries = [
            {
                name: 'Page Views',
                data: [405, 800, 200, 600, 105, 788, 600, 204]
            }
        ];
        this.uniqueUsersSeries = [
            {
                name: 'Unique Users',
                data: [356, 806, 600, 754, 432, 854, 555, 1004]
            }
        ];
        this.uniqueUsersOptions = defaultChartOptions({
            chart: {
                type: 'area',
                height: 100
            },
            colors: ['#ff9800']
        });
    }
    ngOnInit() {
        this.cargarMetricas();
    }
    cargarMetricas() {
        this.cargando = true;
        this.dashboardService.obtenerMetricas(this.filtroSeleccionado.valor).subscribe({
            next: (data) => {
                this.metricas = data;
                this.cargando = false;
            },
            error: (error) => {
                console.error('Error al cargar métricas:', error);
                this.cargando = false;
            }
        });
    }
    onFiltroChange() {
        this.cargarMetricas();
    }
};
DashboardAnalyticsComponent = __decorate([
    Component({
        selector: 'vex-dashboard-analytics',
        templateUrl: './dashboard-analytics.component.html',
        styleUrls: ['./dashboard-analytics.component.scss'],
        standalone: true,
        imports: [
            VexSecondaryToolbarComponent,
            VexBreadcrumbsComponent,
            MatButtonModule,
            MatIconModule,
            MatSelectModule,
            MatOptionModule,
            MatFormFieldModule,
            FormsModule,
            CommonModule,
            WidgetAssistantComponent,
            WidgetQuickLineChartComponent,
            WidgetLargeGoalChartComponent,
            WidgetQuickValueCenterComponent,
            WidgetLargeChartComponent,
            WidgetTableComponent
        ]
    })
], DashboardAnalyticsComponent);
export { DashboardAnalyticsComponent };
//# sourceMappingURL=dashboard-analytics.component.js.map