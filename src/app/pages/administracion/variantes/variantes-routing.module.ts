import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVariantesComponent } from './lista-variantes/lista-variantes.component';
import { AgregarVarianteComponent } from './agregar-variante/agregar-variante.component';

const routes: Routes = 
[
  { path: '',
    component: ListaVariantesComponent
  },
  { path: 'agregar-variante',
    component: AgregarVarianteComponent
  },
  {
    path: 'editar-variante/:idVariante',
    component: AgregarVarianteComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariantesRoutingModule { }
