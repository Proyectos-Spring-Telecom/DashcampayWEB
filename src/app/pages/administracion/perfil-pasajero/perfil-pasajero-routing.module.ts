import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPasajeroComponent } from './perfil-pasajero.component';

const routes: Routes = 
[
  { 
    path: '',
    component:PerfilPasajeroComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilPasajeroRoutingModule { }
