import { Component, Input, OnInit } from '@angular/core';
import {
  ApexOptions,
  VexChartComponent
} from '@vex/components/vex-chart/vex-chart.component';
import { defaultChartOptions } from '@vex/utils/default-chart-options';
import { createDateArray } from '@vex/utils/create-date-array';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-widget-large-goal-chart',
  templateUrl: './widget-large-goal-chart.component.html',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, VexChartComponent]
})
export class WidgetLargeGoalChartComponent implements OnInit {
  @Input({ required: true }) total!: string;
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries = [];
  @Input() options: ApexOptions = defaultChartOptions({
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

  constructor() {}

  ngOnInit() {}
}
