import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'vex-components-overview-button-group',
  templateUrl: './components-overview-button-group.component.html',
  styleUrls: ['./components-overview-button-group.component.scss'],
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective
  ]
})
export class ComponentsOverviewButtonGroupComponent implements OnInit {
  buttonToggleHTML = `<mat-button-toggle-group>
  <mat-button-toggle value="left">
    <mat-icon svgIcon="mat:format_align_left"></mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="center">
    <mat-icon svgIcon="mat:format_align_center"></mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="right">
    <mat-icon svgIcon="mat:format_align_right"></mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="justify">
    <mat-icon svgIcon="mat:format_align_justify"></mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>

<mat-button-toggle-group class="mt-6">
  <mat-button-toggle value="left">Left</mat-button-toggle>
  <mat-button-toggle value="center">Center</mat-button-toggle>
  <mat-button-toggle value="right">Right</mat-button-toggle>
</mat-button-toggle-group>

<mat-button-toggle-group class="mt-6" appearance="legacy">
  <mat-button-toggle value="left">Left</mat-button-toggle>
  <mat-button-toggle value="center">Center</mat-button-toggle>
  <mat-button-toggle value="right">Right</mat-button-toggle>
</mat-button-toggle-group>

<mat-button-toggle-group class="mt-6" vertical>
  <mat-button-toggle value="left">Top</mat-button-toggle>
  <mat-button-toggle value="center">Center</mat-button-toggle>
  <mat-button-toggle value="right">Bottom</mat-button-toggle>
</mat-button-toggle-group>`;

  constructor() {}

  ngOnInit() {}
}
