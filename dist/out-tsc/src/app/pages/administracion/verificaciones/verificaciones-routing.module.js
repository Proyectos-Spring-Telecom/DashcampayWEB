import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarVerificacionesComponent } from './listar-verificaciones/listar-verificaciones.component';
import { RegistrarVerificacionComponent } from './registrar-verificacion/registrar-verificacion.component';
const routes = [
    {
        path: '',
        component: ListarVerificacionesComponent
    },
    {
        path: 'registrar-verificacion',
        component: RegistrarVerificacionComponent
    },
    {
        path: 'registrar-verificacion/:id',
        component: RegistrarVerificacionComponent
    }
];
let VerificacionesRoutingModule = class VerificacionesRoutingModule {
};
VerificacionesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VerificacionesRoutingModule);
export { VerificacionesRoutingModule };
//# sourceMappingURL=verificaciones-routing.module.js.map