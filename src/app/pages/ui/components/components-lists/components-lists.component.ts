import { Component, OnInit } from '@angular/core';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { ComponentsOverviewListsComponent } from '../components-overview/components/components-overview-lists/components-overview-lists.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-components-lists',
  templateUrl: './components-lists.component.html',
  styleUrls: ['./components-lists.component.scss'],
  animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    ComponentsOverviewListsComponent
  ]
})
export class ComponentsListsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
