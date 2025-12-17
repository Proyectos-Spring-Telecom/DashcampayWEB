import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarVerificacionesComponent } from './listar-verificaciones/listar-verificaciones.component';
import { RegistrarVerificacionComponent } from './registrar-verificacion/registrar-verificacion.component';

const routes: Routes = [
  { 
    path: '',
    component: ListarVerificacionesComponent
  },
  {
    path: 'registrar-verificacion',
    component: RegistrarVerificacionComponent
  },
  {
    path: 'registrar-verificacion/:id',
    component: RegistrarVerificacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionesRoutingModule { }

