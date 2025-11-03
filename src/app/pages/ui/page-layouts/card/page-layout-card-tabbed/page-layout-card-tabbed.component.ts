import { Component, OnInit } from '@angular/core';
import { PageLayoutDemoComponent } from '../../page-layout-demo/page-layout-demo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';

@Component({
  selector: 'vex-page-layout-card-tabbed',
  templateUrl: './page-layout-card-tabbed.component.html',
  styleUrls: ['./page-layout-card-tabbed.component.scss'],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexPageLayoutContentDirective,
    MatTabsModule,
    PageLayoutDemoComponent
  ]
})
export class PageLayoutCardTabbedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
