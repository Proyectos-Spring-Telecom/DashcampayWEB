import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaTransbordosComponent } from './lista-transbordos/lista-transbordos.component';
import { AgregarTransbordoComponent } from './agregar-transbordo/agregar-transbordo.component';
const routes = [
    { path: '',
        component: ListaTransbordosComponent
    },
    { path: 'agregar-transbordo',
        component: AgregarTransbordoComponent
    },
    {
        path: 'editar-transbordo/:id',
        component: AgregarTransbordoComponent,
    },
];
let TransbordosRoutingModule = class TransbordosRoutingModule {
};
TransbordosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TransbordosRoutingModule);
export { TransbordosRoutingModule };
//# sourceMappingURL=transbordos-routing.module.js.map