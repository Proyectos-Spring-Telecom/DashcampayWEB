import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgregarDispositivoComponent } from './agregar-dispositivo/agregar-dispositivo.component';
import { ListaDispositivosComponent } from './lista-dispositivos/lista-dispositivos.component';
const routes = [
    { path: '',
        component: ListaDispositivosComponent
    },
    { path: 'agregar-validador',
        component: AgregarDispositivoComponent
    },
    {
        path: 'editar-validador/:idValidador',
        component: AgregarDispositivoComponent,
    },
];
let DispositivosRoutingModule = class DispositivosRoutingModule {
};
DispositivosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], DispositivosRoutingModule);
export { DispositivosRoutingModule };
//# sourceMappingURL=dispositivos-routing.module.js.map