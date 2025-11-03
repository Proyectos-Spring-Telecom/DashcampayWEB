import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { VerDocumentoVehiculoComponent } from './ver-documento-vehiculo/ver-documento-vehiculo.component';

const routes: Routes = 
[
  { path: '',
    component: ListaVehiculosComponent
  },
  { path: 'agregar-vehiculo',
    component: AgregarVehiculoComponent
  },
  {
    path: 'editar-vehiculo/:idVehiculo',
    component: AgregarVehiculoComponent,
  },
  { 
    path: 'ver-documento', 
    component: VerDocumentoVehiculoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
