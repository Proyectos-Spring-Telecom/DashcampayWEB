import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import { AgregarTarifaComponent } from './agregar-tarifa/agregar-tarifa.component';
const routes = [
    { path: '',
        component: ListaTarifasComponent
    },
    { path: 'agregar-tarifa',
        component: AgregarTarifaComponent
    },
    {
        path: 'editar-tarifa/:idTarifa',
        component: AgregarTarifaComponent,
    },
];
let TarifasRoutingModule = class TarifasRoutingModule {
};
TarifasRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TarifasRoutingModule);
export { TarifasRoutingModule };
//# sourceMappingURL=tarifas-routing.module.js.map