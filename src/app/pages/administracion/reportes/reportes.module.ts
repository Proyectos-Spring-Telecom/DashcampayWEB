import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
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
import { DxDataGridModule } from 'devextreme-angular';
import { RecaudacionDiariaRutaComponent } from './recaudacion-diaria-ruta/recaudacion-diaria-ruta.component';
import { RecaudacionOperadorComponent } from './recaudacion-operador/recaudacion-operador.component';
import { RecaudacionVehiculoComponent } from './recaudacion-vehiculo/recaudacion-vehiculo.component';
import { RecaudacionDispositivoInstalacionComponent } from './recaudacion-dispositivo-instalacion/recaudacion-dispositivo-instalacion.component';
import { ValidacionesDetalladasComponent } from './validaciones-detalladas/validaciones-detalladas.component';
import { ConteoPasajeroViajeComponent } from './conteo-pasajero-viaje/conteo-pasajero-viaje.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    RecaudacionDiariaRutaComponent,
    RecaudacionOperadorComponent,
    RecaudacionVehiculoComponent,
    RecaudacionDispositivoInstalacionComponent,
    ValidacionesDetalladasComponent,
    ConteoPasajeroViajeComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    DxDataGridModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ]
})
export class ReportesModule { }
