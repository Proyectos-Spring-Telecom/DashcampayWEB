import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IncidentesComponent } from '../mantenimientos/incidentes/incidentes.component';
import { RegistrarIncidenteComponent } from '../mantenimientos/incidentes/registrar-incidente/registrar-incidente.component';
const routes = [
    {
        path: '',
        component: IncidentesComponent
    },
    {
        path: 'registrar-incidente',
        component: RegistrarIncidenteComponent
    },
    {
        path: 'registrar-incidente/:id',
        component: RegistrarIncidenteComponent
    }
];
let IncidentesRoutingModule = class IncidentesRoutingModule {
};
IncidentesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], IncidentesRoutingModule);
export { IncidentesRoutingModule };
//# sourceMappingURL=incidentes-routing.module.js.map