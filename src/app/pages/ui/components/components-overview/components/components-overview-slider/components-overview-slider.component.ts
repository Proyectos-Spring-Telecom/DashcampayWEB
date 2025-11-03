import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'vex-components-overview-slider',
  templateUrl: './components-overview-slider.component.html',
  styleUrls: ['./components-overview-slider.component.scss'],
  standalone: true,
  imports: [MatSliderModule, MatTabsModule, VexHighlightDirective]
})
export class ComponentsOverviewSliderComponent implements OnInit {
  sliderHTML = `<mat-slider min="1" max="10" thumbLabel tickInterval="1"></mat-slider>`;

  constructor() {}

  ngOnInit() {}
}
