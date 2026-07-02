import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaRutasComponent } from './lista-rutas/lista-rutas.component';
import { AgregarRutaComponent } from './agregar-ruta/agregar-ruta.component';
const routes = [
    { path: '',
        component: ListaRutasComponent
    },
    { path: 'agregar-ruta',
        component: AgregarRutaComponent
    },
    {
        path: 'editar-ruta/:idRuta',
        component: AgregarRutaComponent,
    },
];
let RutasRoutingModule = class RutasRoutingModule {
};
RutasRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RutasRoutingModule);
export { RutasRoutingModule };
//# sourceMappingURL=rutas-routing.module.js.map