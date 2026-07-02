import { __decorate } from "tslib";
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { MatInputModule } from '@angular/material/input';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
let PasajerosComponent = class PasajerosComponent {
    constructor(pasaService, route, alerts) {
        this.pasaService = pasaService;
        this.route = route;
        this.alerts = alerts;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.isLoading = false;
        this.loading = false;
        this.listaPasajeros = [];
        this.grid = false;
        this.loadingVisible = false;
        this.mensajeAgrupar = "Arrastre un encabezado de columna aquí para agrupar por esa columna";
        this.destroyRef = inject(DestroyRef);
        this.autoExpandAllGroups = true;
        this.isGrouped = false;
        this.showFilterRow = true;
        this.showHeaderFilter = true;
    }
    ngOnInit() {
        this.obtenerListaPasajeros();
    }
    obtenerListaPasajeros() {
        this.loading = true;
        this.pasaService.obtenerPasajeros().subscribe((res) => {
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            this.listaPasajeros = res.pasajeros.sort((a, b) => b.Id - a.Id);
        }, (error) => {
            console.error('Error al obtener pasajeros:', error);
            this.loading = false;
        });
    }
    limpiarCampos() {
        const today = new Date();
        this.dataGrid.instance.clearGrouping();
        this.isGrouped = false;
        this.obtenerListaPasajeros();
        this.dataGrid.instance.refresh();
    }
    toggleExpandGroups() {
        const groupedColumns = this.dataGrid.instance.getVisibleColumns()
            .filter(col => (col.groupIndex ?? -1) >= 0);
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
};
__decorate([
    ViewChild(DxDataGridComponent, { static: false })
], PasajerosComponent.prototype, "dataGrid", void 0);
PasajerosComponent = __decorate([
    Component({
        selector: 'vex-pasajeros',
        templateUrl: './pasajeros.component.html',
        styleUrl: './pasajeros.component.scss',
        animations: [fadeInRight400ms],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            MatButtonToggleModule,
            ReactiveFormsModule,
            VexPageLayoutContentDirective,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatMenuModule,
            MatTableModule,
            MatSortModule,
            MatCheckboxModule,
            MatPaginatorModule,
            FormsModule,
            CommonModule,
            MatDialogModule,
            MatInputModule,
            DxDataGridModule
        ]
    })
], PasajerosComponent);
export { PasajerosComponent };
//# sourceMappingURL=pasajeros.component.js.map