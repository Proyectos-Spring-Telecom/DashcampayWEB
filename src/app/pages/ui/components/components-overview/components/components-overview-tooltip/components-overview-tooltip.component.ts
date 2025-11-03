import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-components-overview-tooltip',
  templateUrl: './components-overview-tooltip.component.html',
  styleUrls: ['./components-overview-tooltip.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective
  ]
})
export class ComponentsOverviewTooltipComponent implements OnInit {
  tooltipHTML = `<button mat-icon-button matTooltip="Favorite this">
  <mat-icon>favorite</mat-icon>
</button>`;

  constructor() {}

  ngOnInit() {}
}
