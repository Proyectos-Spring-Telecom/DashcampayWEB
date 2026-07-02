import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';
import { VerDocumentoVehiculoComponent } from './ver-documento-vehiculo/ver-documento-vehiculo.component';
const routes = [
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
let VehiculosRoutingModule = class VehiculosRoutingModule {
};
VehiculosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VehiculosRoutingModule);
export { VehiculosRoutingModule };
//# sourceMappingURL=vehiculos-routing.module.js.map