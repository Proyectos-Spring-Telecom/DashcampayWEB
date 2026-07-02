import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
const routes = [
    { path: '',
        component: ListaUsuariosComponent
    },
    { path: 'agregar-usuario',
        component: AltaUsuarioComponent
    },
    {
        path: 'editar-usuario/:idUsuario',
        component: AltaUsuarioComponent,
    },
];
let UsuariosRoutingModule = class UsuariosRoutingModule {
};
UsuariosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UsuariosRoutingModule);
export { UsuariosRoutingModule };
//# sourceMappingURL=usuarios-routing.module.js.map