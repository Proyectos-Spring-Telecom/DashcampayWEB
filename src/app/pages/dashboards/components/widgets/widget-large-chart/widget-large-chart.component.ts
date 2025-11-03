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
  selector: 'vex-widget-large-chart',
  templateUrl: './widget-large-chart.component.html',
  styleUrls: ['./widget-large-chart.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, VexChartComponent]
})
export class WidgetLargeChartComponent implements OnInit {
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
      type: 'area',
      height: 384,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 90, 100]
      }
    },
    colors: ['#008ffb', '#ff9800'],
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
    },
    legend: {
      show: true,
      itemMargin: {
        horizontal: 4,
        vertical: 4
      }
    }
  });

  constructor() {}

  ngOnInit() {}
}
