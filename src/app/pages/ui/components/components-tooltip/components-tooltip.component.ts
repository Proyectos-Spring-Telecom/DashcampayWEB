import { Component, OnInit } from '@angular/core';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { ComponentsOverviewTooltipComponent } from '../components-overview/components/components-overview-tooltip/components-overview-tooltip.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-components-tooltip',
  templateUrl: './components-tooltip.component.html',
  styleUrls: ['./components-tooltip.component.scss'],
  animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    ComponentsOverviewTooltipComponent
  ]
})
export class ComponentsTooltipComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
