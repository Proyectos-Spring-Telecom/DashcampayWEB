import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaModulosComponent } from './lista-modulos/lista-modulos.component';
import { AltaModuloComponent } from './alta-modulo/alta-modulo.component';
const routes = [
    {
        path: '',
        component: ListaModulosComponent
    },
    { path: 'agregar-modulo',
        component: AltaModuloComponent
    },
    {
        path: 'editar-modulo/:idModulo',
        component: AltaModuloComponent,
    },
];
let ModulosRoutingModule = class ModulosRoutingModule {
};
ModulosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ModulosRoutingModule);
export { ModulosRoutingModule };
//# sourceMappingURL=modulos-routing.module.js.map