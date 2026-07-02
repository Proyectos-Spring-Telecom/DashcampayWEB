import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaZonasComponent } from './lista-zonas/lista-zonas.component';
import { AgregarZonaComponent } from './agregar-zona/agregar-zona.component';
const routes = [
    { path: '',
        component: ListaZonasComponent
    },
    { path: 'agregar-zona',
        component: AgregarZonaComponent
    },
    {
        path: 'editar-zona/:idZona',
        component: AgregarZonaComponent,
    },
];
let ZonasRoutingModule = class ZonasRoutingModule {
};
ZonasRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ZonasRoutingModule);
export { ZonasRoutingModule };
//# sourceMappingURL=zonas-routing.module.js.map