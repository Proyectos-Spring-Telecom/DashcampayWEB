import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaMonederosComponent } from './lista-monederos/lista-monederos.component';
import { AgregarMonederoComponent } from './agregar-monedero/agregar-monedero.component';
const routes = [
    { path: '',
        component: ListaMonederosComponent
    },
    { path: 'agregar-monedero',
        component: AgregarMonederoComponent
    },
    {
        path: 'editar-monedero/:idMonedero',
        component: AgregarMonederoComponent,
    },
];
let MonederosRoutingModule = class MonederosRoutingModule {
};
MonederosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], MonederosRoutingModule);
export { MonederosRoutingModule };
//# sourceMappingURL=monederos-routing.module.js.map