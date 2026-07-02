import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { HasPermissionDirective } from '../../services/haspermission.directive';
let TiposPasajeroComponent = class TiposPasajeroComponent {
    constructor(tiposPasajeroService, alerts, router) {
        this.tiposPasajeroService = tiposPasajeroService;
        this.alerts = alerts;
        this.router = router;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.listaTiposPasajero = [];
        this.showFilterRow = true;
        this.showHeaderFilter = true;
        this.loadingVisible = false;
        this.mensajeAgrupar = "Arrastre un encabezado de columna aquí para agrupar por esa columna";
        this.loading = false;
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
    }
    ngOnInit() {
        this.obtenerListaTiposPasajero();
    }
    obtenerListaTiposPasajero() {
        this.loading = true;
        this.tiposPasajeroService.obtenerTiposPasajero().subscribe({
            next: (response) => {
                this.loading = false;
                this.listaTiposPasajero = (response.data || []).sort((a, b) => b.id - a.id);
            },
            error: (err) => {
                this.loading = false;
                console.error('Error al obtener tipos de pasajero:', err);
                this.alerts.open({
                    type: 'error',
                    title: '¡Error!',
                    message: 'Error al cargar los tipos de pasajero',
                    confirmText: 'Aceptar',
                    backdropClose: false
                });
            }
        });
    }
    limpiarCampos() {
        this.dataGrid.instance.clearGrouping();
        this.isGrouped = false;
        this.obtenerListaTiposPasajero();
        this.dataGrid.instance.refresh();
    }
    toggleExpandGroups() {
        const groupedColumns = this.dataGrid.instance.getVisibleColumns()
            .filter((col) => (col.groupIndex ?? -1) >= 0);
        if (groupedColumns.length === 0) {
            this.alerts.open({
                type: 'info',
                title: '¡Ops!',
                message: 'Debes arrastar un encabezado de una columna para expandir o contraer grupos.',
                backdropClose: false
            });
        }
        else {
            this.autoExpandAllGroups = !this.autoExpandAllGroups;
            this.dataGrid.instance.refresh();
        }
    }
    actualizarTipoPasajero(id) {
        this.router.navigateByUrl(`/administracion/tipos-pasajero/editar/${id}`);
    }
    async activar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Activar!',
            message: `¿Está seguro que requiere activar el tipo de pasajero: <br> <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false
        });
        if (res !== 'confirm')
            return;
        this.tiposPasajeroService.updateEstatus(rowData.id, 1).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Confirmación Realizada!',
                    message: 'El tipo de pasajero ha sido activado.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.obtenerListaTiposPasajero();
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: String(error),
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
            }
        });
    }
    async desactivar(rowData) {
        const res = await this.alerts.open({
            type: 'warning',
            title: '¡Desactivar!',
            message: `¿Está seguro que requiere desactivar el tipo de pasajero: <br> <strong>${rowData.nombre}</strong>?`,
            showCancel: true,
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            backdropClose: false
        });
        if (res !== 'confirm')
            return;
        this.tiposPasajeroService.updateEstatus(rowData.id, 0).subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Confirmación Realizada!',
                    message: 'El tipo de pasajero ha sido desactivado.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.obtenerListaTiposPasajero();
                this.dataGrid.instance.refresh();
            },
            error: (error) => {
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: String(error),
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
            }
        });
    }
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], TiposPasajeroComponent.prototype, "dataGrid", void 0);
TiposPasajeroComponent = __decorate([
    Component({
        selector: 'vex-tipos-pasajero',
        standalone: true,
        imports: [
            CommonModule,
            DxDataGridModule,
            FormsModule,
            ReactiveFormsModule,
            VexPageLayoutComponent,
            VexPageLayoutContentDirective,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            MatButtonToggleModule,
            RouterModule,
            HasPermissionDirective
        ],
        templateUrl: './tipos-pasajero.component.html',
        styleUrl: './tipos-pasajero.component.scss',
        animations: [fadeInRight400ms]
    })
], TiposPasajeroComponent);
export { TiposPasajeroComponent };
//# sourceMappingURL=tipos-pasajero.component.js.map