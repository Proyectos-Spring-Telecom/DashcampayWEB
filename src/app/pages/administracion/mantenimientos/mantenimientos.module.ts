import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MantenimientosRoutingModule
  ]
})
export class MantenimientosModule { }

