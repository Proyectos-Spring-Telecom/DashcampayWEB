import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  ApexOptions,
  VexChartComponent
} from '@vex/components/vex-chart/vex-chart.component';
import { defaultChartOptions } from '@vex/utils/default-chart-options';
import {
  MatBottomSheet,
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { scaleInOutAnimation } from '@vex/animations/scale-in-out.animation';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';

@Component({
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
export class WidgetQuickLineChartComponent implements OnInit {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input() iconClass?: string;
  @Input() options: ApexOptions = defaultChartOptions({
    chart: {
      type: 'area',
      height: 100
    }
  });
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries = [];

  showButton: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openSheet() {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}
