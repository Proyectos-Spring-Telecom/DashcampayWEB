import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaPasajerosComponent } from './lista-pasajeros/lista-pasajeros.component';
import { AgregarPasajeroComponent } from './agregar-pasajero/agregar-pasajero.component';
const routes = [
    { path: '',
        component: ListaPasajerosComponent
    },
    { path: 'agregar-pasajero',
        component: AgregarPasajeroComponent
    },
    {
        path: 'editar-pasajero/:idPasajero',
        component: AgregarPasajeroComponent,
    },
];
let PasajerosRoutingModule = class PasajerosRoutingModule {
};
PasajerosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PasajerosRoutingModule);
export { PasajerosRoutingModule };
//# sourceMappingURL=pasajeros-routing.module.js.map