import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilPasajeroComponent } from './perfil-pasajero.component';
const routes = [
    {
        path: '',
        component: PerfilPasajeroComponent
    },
];
let PerfilPasajeroRoutingModule = class PerfilPasajeroRoutingModule {
};
PerfilPasajeroRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PerfilPasajeroRoutingModule);
export { PerfilPasajeroRoutingModule };
//# sourceMappingURL=perfil-pasajero-routing.module.js.map