import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaPermisosComponent } from './lista-permisos/lista-permisos.component';
import { AltaPermisoComponent } from './alta-permiso/alta-permiso.component';
const routes = [
    {
        path: '',
        component: ListaPermisosComponent
    },
    { path: 'agregar-permiso',
        component: AltaPermisoComponent
    },
    {
        path: 'editar-permiso/:idPermiso',
        component: AltaPermisoComponent,
    },
];
let PermisosRoutingModule = class PermisosRoutingModule {
};
PermisosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PermisosRoutingModule);
export { PermisosRoutingModule };
//# sourceMappingURL=permisos-routing.module.js.map