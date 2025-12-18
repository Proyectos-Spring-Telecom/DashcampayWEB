import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatError } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DxDataGridModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { ListarMantenimientoKilometrajeComponent } from './listar-mantenimiento-kilometraje/listar-mantenimiento-kilometraje.component';
import { RegistrarMantenimientoKilometrajeComponent } from './registrar-mantenimiento-kilometraje/registrar-mantenimiento-kilometraje.component';
import { ListarMantenimientoCombustibleComponent } from './listar-mantenimiento-combustible/listar-mantenimiento-combustible.component';
import { RegistrarMantenimientoCombustibleComponent } from './registrar-mantenimiento-combustible/registrar-mantenimiento-combustible.component';
import { ListarMantenimientoVehicularComponent } from './listar-mantenimiento-vehicular/listar-mantenimiento-vehicular.component';
import { RegistrarMantenimientoVehicularComponent } from './registrar-mantenimiento-vehicular/registrar-mantenimiento-vehicular.component';

@NgModule({
  declarations: [
    ListarMantenimientoKilometrajeComponent,
    RegistrarMantenimientoKilometrajeComponent,
    ListarMantenimientoCombustibleComponent,
    RegistrarMantenimientoCombustibleComponent,
    ListarMantenimientoVehicularComponent,
    RegistrarMantenimientoVehicularComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
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
    RouterModule,
    VexPageLayoutComponent,
    VexPageLayoutContentDirective
  ]
})
export class MantenimientosModule { }

