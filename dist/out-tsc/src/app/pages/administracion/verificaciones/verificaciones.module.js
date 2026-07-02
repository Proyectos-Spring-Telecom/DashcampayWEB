import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DxDataGridModule } from 'devextreme-angular';
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { VerificacionesRoutingModule } from './verificaciones-routing.module';
import { ListarVerificacionesComponent } from './listar-verificaciones/listar-verificaciones.component';
import { RegistrarVerificacionComponent } from './registrar-verificacion/registrar-verificacion.component';
import { HasPermissionDirective } from '../../services/haspermission.directive';
let VerificacionesModule = class VerificacionesModule {
};
VerificacionesModule = __decorate([
    NgModule({
        declarations: [
            ListarVerificacionesComponent,
            RegistrarVerificacionComponent
        ],
        imports: [
            CommonModule,
            RouterModule,
            VerificacionesRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            MatIconModule,
            MatButtonModule,
            MatTooltipModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatOptionModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatDialogModule,
            DxDataGridModule,
            VexPageLayoutComponent,
            VexPageLayoutContentDirective,
            HasPermissionDirective
        ]
    })
], VerificacionesModule);
export { VerificacionesModule };
//# sourceMappingURL=verificaciones.module.js.map