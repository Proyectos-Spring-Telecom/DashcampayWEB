import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOperadoresComponent } from './lista-operadores/lista-operadores.component';
import { AgregarOperadorComponent } from './agregar-operador/agregar-operador.component';
import { VerDocumentoOperadorComponent } from './ver-documento-operador/ver-documento-operador.component';

const routes: Routes = 
[
  { path: '',
    component: ListaOperadoresComponent
  },
  { path: 'agregar-operador',
    component: AgregarOperadorComponent
  },
  {
    path: 'editar-operador/:idOperador',
    component: AgregarOperadorComponent,
  },
  { 
    path: 'ver-documento', 
    component: VerDocumentoOperadorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperadoresRoutingModule { }
