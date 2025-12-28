import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTransbordosComponent } from './lista-transbordos/lista-transbordos.component';
import { AgregarTransbordoComponent } from './agregar-transbordo/agregar-transbordo.component';

const routes: Routes = 
[
  { path: '',
    component: ListaTransbordosComponent
  },
  { path: 'agregar-transbordo',
    component: AgregarTransbordoComponent
  },
  {
    path: 'editar-transbordo/:id',
    component: AgregarTransbordoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransbordosRoutingModule { }

