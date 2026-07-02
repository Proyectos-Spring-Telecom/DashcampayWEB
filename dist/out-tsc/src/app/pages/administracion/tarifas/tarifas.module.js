import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifasRoutingModule } from './tarifas-routing.module';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import { AgregarTarifaComponent } from './agregar-tarifa/agregar-tarifa.component';
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutHeaderDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexBreadcrumbsComponent } from "../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DxDataGridModule } from 'devextreme-angular';
import { HasPermissionDirective } from '../../services/haspermission.directive';
let TarifasModule = class TarifasModule {
};
TarifasModule = __decorate([
    NgModule({
        declarations: [
            ListaTarifasComponent,
            AgregarTarifaComponent
        ],
        imports: [
            CommonModule,
            TarifasRoutingModule,
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexBreadcrumbsComponent,
            VexPageLayoutContentDirective,
            FormsModule,
            ReactiveFormsModule,
            MatButtonToggleModule,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatMenuModule,
            MatTableModule,
            MatSortModule,
            MatCheckboxModule,
            MatPaginatorModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatOptionModule,
            MatSlideToggleModule,
            DxDataGridModule,
            HasPermissionDirective
        ]
    })
], TarifasModule);
export { TarifasModule };
//# sourceMappingURL=tarifas.module.js.map