import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaudacionDiariaRutaComponent } from './recaudacion-diaria-ruta/recaudacion-diaria-ruta.component';
import { RecaudacionOperadorComponent } from './recaudacion-operador/recaudacion-operador.component';
import { RecaudacionVehiculoComponent } from './recaudacion-vehiculo/recaudacion-vehiculo.component';
import { RecaudacionDispositivoInstalacionComponent } from './recaudacion-dispositivo-instalacion/recaudacion-dispositivo-instalacion.component';
import { ValidacionesDetalladasComponent } from './validaciones-detalladas/validaciones-detalladas.component';
import { ConteoPasajeroViajeComponent } from './conteo-pasajero-viaje/conteo-pasajero-viaje.component';
const routes = [
    {
        path: 'recaudacion-diaria-ruta',
        component: RecaudacionDiariaRutaComponent
    },
    {
        path: 'recaudacion-operador',
        component: RecaudacionOperadorComponent
    },
    {
        path: 'recaudacion-vehiculo',
        component: RecaudacionVehiculoComponent
    },
    {
        path: 'recaudacion-instalacionInstalacion',
        component: RecaudacionDispositivoInstalacionComponent
    },
    {
        path: 'validaciones-detalladas',
        component: ValidacionesDetalladasComponent
    },
    {
        path: 'conteo-pasajero-viaje',
        component: ConteoPasajeroViajeComponent
    },
];
let ReportesRoutingModule = class ReportesRoutingModule {
};
ReportesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ReportesRoutingModule);
export { ReportesRoutingModule };
//# sourceMappingURL=reportes-routing.module.js.map