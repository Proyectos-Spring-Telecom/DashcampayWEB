import { Component, Input, OnInit } from '@angular/core';
import { scaleInOutAnimation } from '@vex/animations/scale-in-out.animation';
import {
  MatBottomSheet,
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-widget-quick-value-start',
  templateUrl: './widget-quick-value-start.component.html',
  animations: [scaleInOutAnimation],
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatBottomSheetModule
  ]
})
export class WidgetQuickValueStartComponent implements OnInit {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) change!: number;
  @Input({ required: true }) changeSuffix!: string;
  @Input({ required: true }) helpText!: string;

  showButton: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  openSheet() {
    this._bottomSheet.open(ShareBottomSheetComponent);
  }
}
