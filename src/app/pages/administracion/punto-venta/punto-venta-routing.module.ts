import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarTransaccionComponent } from './generar-transaccion/generar-transaccion.component';

const routes: Routes = 
[
  { path: '',
    component: GenerarTransaccionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntoVentaRoutingModule { }
