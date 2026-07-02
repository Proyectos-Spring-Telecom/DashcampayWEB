import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BitacoraViajesComponent } from './bitacora-viajes.component';
const routes = [
    {
        path: '',
        component: BitacoraViajesComponent
    },
];
let BitacoraViajesRoutingModule = class BitacoraViajesRoutingModule {
};
BitacoraViajesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BitacoraViajesRoutingModule);
export { BitacoraViajesRoutingModule };
//# sourceMappingURL=bitacora-viajes-routing.module.js.map