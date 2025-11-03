import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { scaleInOutAnimation } from '@vex/animations/scale-in-out.animation';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'vex-widget-quick-value-center',
  templateUrl: './widget-quick-value-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleInOutAnimation],
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatBottomSheetModule
  ]
})
export class WidgetQuickValueCenterComponent implements OnInit {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) change!: number;
  @Input() helpText?: string;
  @Input() iconClass?: string;

  showButton: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openSheet() {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}
