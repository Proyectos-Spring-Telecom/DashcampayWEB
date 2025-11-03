import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { DxDataGridModule } from 'devextreme-angular';
import { PerfilUsuarioComponent } from './perfil-usuario.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    DxDataGridModule,
    PerfilUsuarioComponent
  ]
})
export class PerfilUsuarioModule { }
