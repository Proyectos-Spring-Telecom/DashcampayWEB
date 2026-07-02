import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaTransaccionesComponent } from './lista-transacciones/lista-transacciones.component';
import { AgregarTransaccionComponent } from './agregar-transaccion/agregar-transaccion.component';
const routes = [
    { path: '',
        component: ListaTransaccionesComponent
    },
    { path: 'agregar-transaccion',
        component: AgregarTransaccionComponent
    },
    {
        path: 'editar-transaccion/:idTransaccion',
        component: AgregarTransaccionComponent,
    },
];
let TransaccionesRoutingModule = class TransaccionesRoutingModule {
};
TransaccionesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TransaccionesRoutingModule);
export { TransaccionesRoutingModule };
//# sourceMappingURL=transacciones-routing.module.js.map