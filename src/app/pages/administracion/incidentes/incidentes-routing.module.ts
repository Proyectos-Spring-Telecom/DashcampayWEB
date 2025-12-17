import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentesComponent } from '../mantenimientos/incidentes/incidentes.component';
import { RegistrarIncidenteComponent } from '../mantenimientos/incidentes/registrar-incidente/registrar-incidente.component';

const routes: Routes = [
  { 
    path: '',
    component: IncidentesComponent
  },
  {
    path: 'registrar-incidente',
    component: RegistrarIncidenteComponent
  },
  {
    path: 'registrar-incidente/:id',
    component: RegistrarIncidenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentesRoutingModule { }

