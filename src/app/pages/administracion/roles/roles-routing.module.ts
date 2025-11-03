import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';

const routes: Routes = 
[
  { path: '',
    component: ListaRolesComponent
  },
  { path: 'agregar-rol',
    component: AgregarRolComponent
  },
  {
    path: 'editar-rol/:idRol',
    component: AgregarRolComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
