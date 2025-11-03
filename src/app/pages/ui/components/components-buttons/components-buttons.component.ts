import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { colors } from '../../../../../static-data/colors';
import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsOverviewButtonsComponent } from '../components-overview/components/components-overview-buttons/components-overview-buttons.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-components-buttons',
  templateUrl: './components-buttons.component.html',
  styleUrls: ['./components-buttons.component.scss'],
  animations: [stagger80ms, scaleIn400ms, fadeInRight400ms, fadeInUp400ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    ComponentsOverviewButtonsComponent,
    MatIconModule,
    MatButtonModule,
    NgFor,
    NgClass,
    UpperCasePipe
  ]
})
export class ComponentsButtonsComponent implements OnInit {
  colors = colors;

  constructor() {}

  ngOnInit() {}
}
