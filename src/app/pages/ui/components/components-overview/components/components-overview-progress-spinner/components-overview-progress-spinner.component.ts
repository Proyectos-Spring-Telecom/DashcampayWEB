import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-components-overview-progress-spinner',
  templateUrl: './components-overview-progress-spinner.component.html',
  styleUrls: ['./components-overview-progress-spinner.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTabsModule, VexHighlightDirective]
})
export class ComponentsOverviewProgressSpinnerComponent implements OnInit {
  progressSpinnerHTML = `<mat-progress-spinner mode="determinate" [value]="40"></mat-progress-spinner>
<mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>`;

  constructor() {}

  ngOnInit() {}
}
