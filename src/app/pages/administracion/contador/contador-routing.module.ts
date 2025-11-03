import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContadoraComponent } from './lista-contadora/lista-contadora.component';
import { AgregarContadoraComponent } from './agregar-contadora/agregar-contadora.component';

const routes: Routes = 
[
  { path: '',
    component: ListaContadoraComponent
  },
  { path: 'agregar-contadora',
    component: AgregarContadoraComponent
  },
  {
    path: 'editar-contadora/:idContadora',
    component: AgregarContadoraComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContadorRoutingModule { }
