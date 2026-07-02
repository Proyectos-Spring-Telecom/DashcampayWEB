import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenerarTransaccionComponent } from './generar-transaccion/generar-transaccion.component';
const routes = [
    { path: '',
        component: GenerarTransaccionComponent
    },
];
let PuntoVentaRoutingModule = class PuntoVentaRoutingModule {
};
PuntoVentaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PuntoVentaRoutingModule);
export { PuntoVentaRoutingModule };
//# sourceMappingURL=punto-venta-routing.module.js.map