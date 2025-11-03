import { Component, OnInit } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-page-layout-simple',
  templateUrl: './page-layout-simple.component.html',
  styleUrls: ['./page-layout-simple.component.scss'],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    VexPageLayoutContentDirective,
    PageLayoutDemoComponent
  ]
})
export class PageLayoutSimpleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
