import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { DxDataGridModule } from 'devextreme-angular';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
let PerfilUsuarioModule = class PerfilUsuarioModule {
};
PerfilUsuarioModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule,
            PerfilUsuarioRoutingModule,
            DxDataGridModule,
            PerfilUsuarioComponent
        ]
    })
], PerfilUsuarioModule);
export { PerfilUsuarioModule };
//# sourceMappingURL=perfil-usuario.module.js.map