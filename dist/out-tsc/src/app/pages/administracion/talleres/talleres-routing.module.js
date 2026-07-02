import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaTalleresComponent } from './lista-talleres/lista-talleres.component';
import { AgregarTallerComponent } from './agregar-taller/agregar-taller.component';
const routes = [
    {
        path: '',
        component: ListaTalleresComponent
    },
    {
        path: 'agregar-taller',
        component: AgregarTallerComponent
    },
    {
        path: 'registrar-taller',
        component: AgregarTallerComponent
    },
    {
        path: 'editar-taller/:idTaller',
        component: AgregarTallerComponent,
    },
];
let TalleresRoutingModule = class TalleresRoutingModule {
};
TalleresRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TalleresRoutingModule);
export { TalleresRoutingModule };
//# sourceMappingURL=talleres-routing.module.js.map