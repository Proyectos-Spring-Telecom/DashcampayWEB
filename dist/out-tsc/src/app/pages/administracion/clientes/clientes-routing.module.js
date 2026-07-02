import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { VerDocumentoClienteComponent } from './ver-documento-cliente/ver-documento-cliente.component';
const routes = [
    { path: '',
        component: ListaClientesComponent
    },
    { path: 'agregar-cliente',
        component: AltaClienteComponent
    },
    {
        path: 'editar-cliente/:idCliente',
        component: AltaClienteComponent,
    },
    {
        path: 'ver-documento',
        component: VerDocumentoClienteComponent
    },
];
let ClientesRoutingModule = class ClientesRoutingModule {
};
ClientesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ClientesRoutingModule);
export { ClientesRoutingModule };
//# sourceMappingURL=clientes-routing.module.js.map