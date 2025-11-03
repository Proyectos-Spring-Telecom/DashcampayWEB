import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { VerDocumentoClienteComponent } from './ver-documento-cliente/ver-documento-cliente.component';

const routes: Routes = 
[
  { path: '',
    component: ListaClientesComponent
  },
  { path: 'agregar-cliente',
    component: AltaClienteComponent
  },
  {
    path: 'editar-cliente/:idCliente',
    component: AltaClienteComponent,
  },
  { 
    path: 'ver-documento', 
    component: VerDocumentoClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
