import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraRoutingModule } from './bitacora-routing.module';
import { DxDataGridModule } from 'devextreme-angular';
import { BitacoraComponent } from './bitacora.component';
let BitacoraModule = class BitacoraModule {
};
BitacoraModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule,
            BitacoraRoutingModule,
            BitacoraComponent,
            DxDataGridModule
        ]
    })
], BitacoraModule);
export { BitacoraModule };
//# sourceMappingURL=bitacora.module.js.map