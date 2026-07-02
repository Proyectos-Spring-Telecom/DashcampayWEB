import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BitacoraComponent } from './bitacora.component';
const routes = [
    { path: '', component: BitacoraComponent }
];
let BitacoraRoutingModule = class BitacoraRoutingModule {
};
BitacoraRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BitacoraRoutingModule);
export { BitacoraRoutingModule };
//# sourceMappingURL=bitacora-routing.module.js.map