import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DxChartModule, DxDataGridModule, DxPieChartModule, DxSparklineModule, DxVectorMapModule } from 'devextreme-angular';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DxChartModule,
    DxPieChartModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    VexPageLayoutContentDirective,
    DxDataGridModule,
    DxVectorMapModule
  ]
})
export class DashboardModule { }
