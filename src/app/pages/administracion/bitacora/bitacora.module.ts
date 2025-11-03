import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { DxDataGridModule } from 'devextreme-angular';
import { BitacoraComponent } from './bitacora.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BitacoraRoutingModule,
    BitacoraComponent,
    DxDataGridModule
  ]
})
export class BitacoraModule { }
