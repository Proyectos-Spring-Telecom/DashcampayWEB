import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaContadoraComponent } from './lista-contadora/lista-contadora.component';
import { AgregarContadoraComponent } from './agregar-contadora/agregar-contadora.component';
const routes = [
    { path: '',
        component: ListaContadoraComponent
    },
    { path: 'agregar-contadora',
        component: AgregarContadoraComponent
    },
    {
        path: 'editar-contadora/:idContadora',
        component: AgregarContadoraComponent,
    },
];
let ContadorRoutingModule = class ContadorRoutingModule {
};
ContadorRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ContadorRoutingModule);
export { ContadorRoutingModule };
//# sourceMappingURL=contador-routing.module.js.map