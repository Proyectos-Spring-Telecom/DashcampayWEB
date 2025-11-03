import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'vex-components-overview-progress',
  templateUrl: './components-overview-progress.component.html',
  styleUrls: ['./components-overview-progress.component.scss'],
  standalone: true,
  imports: [MatProgressBarModule, MatTabsModule, VexHighlightDirective]
})
export class ComponentsOverviewProgressComponent implements OnInit {
  progressHTML = `<mat-progress-bar mode="determinate" [value]="40"></mat-progress-bar>
<mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
<mat-progress-bar mode="buffer" color="accent"></mat-progress-bar>
<mat-progress-bar mode="query" color="warn"></mat-progress-bar>`;

  constructor() {}

  ngOnInit() {}
}
