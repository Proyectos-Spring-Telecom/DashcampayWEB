import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
const routes = [
    { path: '',
        component: MapaComponent
    },
];
let MonitoreoRoutingModule = class MonitoreoRoutingModule {
};
MonitoreoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], MonitoreoRoutingModule);
export { MonitoreoRoutingModule };
//# sourceMappingURL=monitoreo-routing.module.js.map