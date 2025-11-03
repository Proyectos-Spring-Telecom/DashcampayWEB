import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'vex-components-overview-slide-toggle',
  templateUrl: './components-overview-slide-toggle.component.html',
  styleUrls: ['./components-overview-slide-toggle.component.scss'],
  standalone: true,
  imports: [MatSlideToggleModule, MatTabsModule, VexHighlightDirective]
})
export class ComponentsOverviewSlideToggleComponent implements OnInit {
  slideToggleHTML = `<mat-slide-toggle [checked]="true"></mat-slide-toggle>
<mat-slide-toggle color="primary" [checked]="true"></mat-slide-toggle>
<mat-slide-toggle color="accent" [checked]="true"></mat-slide-toggle>
<mat-slide-toggle color="warn" [checked]="true"></mat-slide-toggle>
<mat-slide-toggle disabled></mat-slide-toggle>`;

  constructor() {}

  ngOnInit() {}
}
