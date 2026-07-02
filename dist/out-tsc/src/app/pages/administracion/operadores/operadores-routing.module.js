import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaOperadoresComponent } from './lista-operadores/lista-operadores.component';
import { AgregarOperadorComponent } from './agregar-operador/agregar-operador.component';
import { VerDocumentoOperadorComponent } from './ver-documento-operador/ver-documento-operador.component';
const routes = [
    { path: '',
        component: ListaOperadoresComponent
    },
    { path: 'agregar-operador',
        component: AgregarOperadorComponent
    },
    {
        path: 'editar-operador/:idOperador',
        component: AgregarOperadorComponent,
    },
    {
        path: 'ver-documento',
        component: VerDocumentoOperadorComponent
    },
];
let OperadoresRoutingModule = class OperadoresRoutingModule {
};
OperadoresRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], OperadoresRoutingModule);
export { OperadoresRoutingModule };
//# sourceMappingURL=operadores-routing.module.js.map