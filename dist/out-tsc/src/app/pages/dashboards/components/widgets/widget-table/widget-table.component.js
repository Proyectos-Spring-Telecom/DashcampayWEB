import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let WidgetTableComponent = class WidgetTableComponent {
    constructor() {
        this.pageSize = 6;
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes['columns']) {
            this.visibleColumns = this.columns.map((column) => column.property);
        }
        if (changes['data']) {
            this.dataSource.data = this.data;
        }
    }
    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }
};
__decorate([
    Input({ required: true })
], WidgetTableComponent.prototype, "data", void 0);
__decorate([
    Input({ required: true })
], WidgetTableComponent.prototype, "columns", void 0);
__decorate([
    Input()
], WidgetTableComponent.prototype, "pageSize", void 0);
__decorate([
    ViewChild(MatPaginator, { static: true })
], WidgetTableComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], WidgetTableComponent.prototype, "sort", void 0);
WidgetTableComponent = __decorate([
    Component({
        selector: 'vex-widget-table',
        templateUrl: './widget-table.component.html',
        standalone: true,
        imports: [
            MatButtonModule,
            MatIconModule,
            MatTableModule,
            MatSortModule,
            NgFor,
            NgIf,
            NgClass,
            MatTooltipModule,
            MatPaginatorModule
        ]
    })
], WidgetTableComponent);
export { WidgetTableComponent };
//# sourceMappingURL=widget-table.component.js.map