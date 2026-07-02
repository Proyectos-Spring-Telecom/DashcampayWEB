import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaInstalacionComponent } from './lista-instalacion/lista-instalacion.component';
import { AgregarInstalacionComponent } from './agregar-instalacion/agregar-instalacion.component';
const routes = [
    { path: '',
        component: ListaInstalacionComponent
    },
    { path: 'agregar-instalacion',
        component: AgregarInstalacionComponent
    },
    {
        path: 'editar-instalacion/:idInstalacion',
        component: AgregarInstalacionComponent,
    },
];
let InstalacionRoutingModule = class InstalacionRoutingModule {
};
InstalacionRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], InstalacionRoutingModule);
export { InstalacionRoutingModule };
//# sourceMappingURL=instalacion-routing.module.js.map