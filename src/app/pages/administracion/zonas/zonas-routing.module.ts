import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaZonasComponent } from './lista-zonas/lista-zonas.component';
import { AgregarZonaComponent } from './agregar-zona/agregar-zona.component';

const routes: Routes = 
[
  { path: '',
    component: ListaZonasComponent
  },
  { path: 'agregar-zona',
    component: AgregarZonaComponent
  },
  {
    path: 'editar-zona/:idZona',
    component: AgregarZonaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonasRoutingModule { }
