import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraViajesComponent } from './bitacora-viajes.component';

const routes: Routes = 
[
  { 
    path: '',
    component:BitacoraViajesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraViajesRoutingModule { }
