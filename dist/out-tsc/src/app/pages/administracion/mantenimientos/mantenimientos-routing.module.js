import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MantenimientosComponent } from './mantenimientos.component';
import { ListarMantenimientoKilometrajeComponent } from './listar-mantenimiento-kilometraje/listar-mantenimiento-kilometraje.component';
import { RegistrarMantenimientoKilometrajeComponent } from './registrar-mantenimiento-kilometraje/registrar-mantenimiento-kilometraje.component';
import { ListarMantenimientoCombustibleComponent } from './listar-mantenimiento-combustible/listar-mantenimiento-combustible.component';
import { RegistrarMantenimientoCombustibleComponent } from './registrar-mantenimiento-combustible/registrar-mantenimiento-combustible.component';
import { ListarMantenimientoVehicularComponent } from './listar-mantenimiento-vehicular/listar-mantenimiento-vehicular.component';
import { RegistrarMantenimientoVehicularComponent } from './registrar-mantenimiento-vehicular/registrar-mantenimiento-vehicular.component';
const routes = [
    {
        path: '',
        component: MantenimientosComponent,
        children: [
            {
                path: '',
                redirectTo: 'mantenimiento-vehicular',
                pathMatch: 'full'
            },
            {
                path: 'mantenimiento-kilometraje',
                component: ListarMantenimientoKilometrajeComponent
            },
            {
                path: 'mantenimiento-combustible',
                component: ListarMantenimientoCombustibleComponent
            },
            {
                path: 'mantenimiento-vehicular',
                component: ListarMantenimientoVehicularComponent
            }
        ]
    },
    {
        path: 'registrar-mantenimiento-vehicular/:id',
        component: RegistrarMantenimientoVehicularComponent
    },
    {
        path: 'registrar-mantenimiento-vehicular',
        component: RegistrarMantenimientoVehicularComponent
    },
    {
        path: 'registrar-mantenimiento-kilometraje/:id',
        component: RegistrarMantenimientoKilometrajeComponent
    },
    {
        path: 'registrar-mantenimiento-kilometraje',
        component: RegistrarMantenimientoKilometrajeComponent
    },
    {
        path: 'registrar-mantenimiento-combustible/:id',
        component: RegistrarMantenimientoCombustibleComponent
    },
    {
        path: 'registrar-mantenimiento-combustible',
        component: RegistrarMantenimientoCombustibleComponent
    }
];
let MantenimientosRoutingModule = class MantenimientosRoutingModule {
};
MantenimientosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], MantenimientosRoutingModule);
export { MantenimientosRoutingModule };
//# sourceMappingURL=mantenimientos-routing.module.js.map