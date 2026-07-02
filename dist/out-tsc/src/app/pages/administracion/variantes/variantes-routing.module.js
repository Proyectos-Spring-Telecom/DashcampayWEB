import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaVariantesComponent } from './lista-variantes/lista-variantes.component';
import { AgregarVarianteComponent } from './agregar-variante/agregar-variante.component';
const routes = [
    { path: '',
        component: ListaVariantesComponent
    },
    { path: 'agregar-variante',
        component: AgregarVarianteComponent
    },
    {
        path: 'editar-variante/:idVariante',
        component: AgregarVarianteComponent,
    },
];
let VariantesRoutingModule = class VariantesRoutingModule {
};
VariantesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VariantesRoutingModule);
export { VariantesRoutingModule };
//# sourceMappingURL=variantes-routing.module.js.map