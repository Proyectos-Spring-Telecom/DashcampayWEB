import { Component, OnInit } from '@angular/core';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { ComponentsOverviewButtonGroupComponent } from '../components-overview/components/components-overview-button-group/components-overview-button-group.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-components-button-group',
  templateUrl: './components-button-group.component.html',
  styleUrls: ['./components-button-group.component.scss'],
  animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    ComponentsOverviewButtonGroupComponent
  ]
})
export class ComponentsButtonGroupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
