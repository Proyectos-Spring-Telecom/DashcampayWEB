import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaTurnosComponent } from './lista-turnos/lista-turnos.component';
import { AgregarTurnoComponent } from './agregar-turno/agregar-turno.component';
const routes = [
    { path: '',
        component: ListaTurnosComponent
    },
    { path: 'agregar-turno',
        component: AgregarTurnoComponent
    },
    {
        path: 'editar-turno/:idTurno',
        component: AgregarTurnoComponent,
    },
];
let TurnosRoutingModule = class TurnosRoutingModule {
};
TurnosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TurnosRoutingModule);
export { TurnosRoutingModule };
//# sourceMappingURL=turnos-routing.module.js.map