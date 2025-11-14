import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMantenimientoKilometrajeComponent } from './listar-mantenimiento-kilometraje/listar-mantenimiento-kilometraje.component';
import { RegistrarMantenimientoKilometrajeComponent } from './registrar-mantenimiento-kilometraje/registrar-mantenimiento-kilometraje.component';
import { ListarMantenimientoCombustibleComponent } from './listar-mantenimiento-combustible/listar-mantenimiento-combustible.component';
import { RegistrarMantenimientoCombustibleComponent } from './registrar-mantenimiento-combustible/registrar-mantenimiento-combustible.component';
import { ListarMantenimientoVehicularComponent } from './listar-mantenimiento-vehicular/listar-mantenimiento-vehicular.component';
import { RegistrarMantenimientoVehicularComponent } from './registrar-mantenimiento-vehicular/registrar-mantenimiento-vehicular.component';

const routes: Routes = [
  {
    path: 'mantenimiento-kilometraje',
    component: ListarMantenimientoKilometrajeComponent
  },
  {
    path: 'registrar-mantenimiento-kilometraje',
    component: RegistrarMantenimientoKilometrajeComponent
  },
  {
    path: 'mantenimiento-combustible',
    component: ListarMantenimientoCombustibleComponent
  },
  {
    path: 'registrar-mantenimiento-combustible',
    component: RegistrarMantenimientoCombustibleComponent
  },
  {
    path: 'mantenimiento-vehicular',
    component: ListarMantenimientoVehicularComponent
  },
  {
    path: 'registrar-mantenimiento-vehicular',
    component: RegistrarMantenimientoVehicularComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule { }

