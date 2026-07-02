import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
const routes = [
    { path: '', component: PerfilUsuarioComponent }
];
let PerfilUsuarioRoutingModule = class PerfilUsuarioRoutingModule {
};
PerfilUsuarioRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PerfilUsuarioRoutingModule);
export { PerfilUsuarioRoutingModule };
//# sourceMappingURL=perfil-usuario-routing.module.js.map