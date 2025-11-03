import { Component, OnInit } from '@angular/core';
import { VexShowdownSourceDirective } from '@vex/components/vex-showdown/vex-showdown-source.directive';
import { VexShowdownComponent } from '@vex/components/vex-showdown/vex-showdown.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MarkdownModule } from './markdown.module';

@Component({
  selector: 'vex-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    VexPageLayoutContentDirective,
    VexShowdownComponent,
    MarkdownModule,
    VexShowdownSourceDirective
  ]
})
export class DocumentationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
