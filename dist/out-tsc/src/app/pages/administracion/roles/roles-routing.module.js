import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaRolesComponent } from './lista-roles/lista-roles.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';
const routes = [
    { path: '',
        component: ListaRolesComponent
    },
    { path: 'agregar-rol',
        component: AgregarRolComponent
    },
    {
        path: 'editar-rol/:idRol',
        component: AgregarRolComponent,
    },
];
let RolesRoutingModule = class RolesRoutingModule {
};
RolesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RolesRoutingModule);
export { RolesRoutingModule };
//# sourceMappingURL=roles-routing.module.js.map