import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarDispositivoComponent } from './agregar-dispositivo/agregar-dispositivo.component';
import { ListaDispositivosComponent } from './lista-dispositivos/lista-dispositivos.component';

const routes: Routes = 
[
  { path: '',
    component: ListaDispositivosComponent
  },
  { path: 'agregar-validador',
    component: AgregarDispositivoComponent
  },
  {
    path: 'editar-validador/:idValidador',
    component: AgregarDispositivoComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispositivosRoutingModule { }
