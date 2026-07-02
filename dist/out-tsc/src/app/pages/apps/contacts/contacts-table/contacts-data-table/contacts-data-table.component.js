import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { stagger20ms } from "../../../../../../@vex/animations/stagger.animation";
import { fadeInUp400ms } from "../../../../../../@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "../../../../../../@vex/animations/scale-fade-in.animation";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexScrollbarComponent } from "../../../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
let ContactsDataTableComponent = class ContactsDataTableComponent {
    constructor() {
        this.pageSize = 20;
        this.pageSizeOptions = [10, 20, 50];
        this.searchStr = '';
        this.toggleStar = new EventEmitter();
        this.openContact = new EventEmitter();
        this.visibleColumns = [];
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
        if (changes['searchStr']) {
            this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
        }
    }
    emitToggleStar(event, id) {
        event.stopPropagation();
        this.toggleStar.emit(id);
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
], ContactsDataTableComponent.prototype, "data", void 0);
__decorate([
    Input({ required: true })
], ContactsDataTableComponent.prototype, "columns", void 0);
__decorate([
    Input()
], ContactsDataTableComponent.prototype, "pageSize", void 0);
__decorate([
    Input()
], ContactsDataTableComponent.prototype, "pageSizeOptions", void 0);
__decorate([
    Input()
], ContactsDataTableComponent.prototype, "searchStr", void 0);
__decorate([
    Output()
], ContactsDataTableComponent.prototype, "toggleStar", void 0);
__decorate([
    Output()
], ContactsDataTableComponent.prototype, "openContact", void 0);
__decorate([
    ViewChild(MatPaginator, { static: true })
], ContactsDataTableComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], ContactsDataTableComponent.prototype, "sort", void 0);
ContactsDataTableComponent = __decorate([
    Component({
        selector: 'vex-contacts-data-table',
        templateUrl: './contacts-data-table.component.html',
        styleUrls: ['./contacts-data-table.component.scss'],
        providers: [
            {
                provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                useValue: {
                    appearance: 'fill'
                }
            }
        ],
        animations: [stagger20ms, fadeInUp400ms, scaleFadeIn400ms],
        standalone: true,
        imports: [
            VexScrollbarComponent,
            MatTableModule,
            MatSortModule,
            NgFor,
            NgIf,
            NgClass,
            MatCheckboxModule,
            MatButtonModule,
            MatIconModule,
            MatMenuModule,
            MatPaginatorModule
        ]
    })
], ContactsDataTableComponent);
export { ContactsDataTableComponent };
//# sourceMappingURL=contacts-data-table.component.js.map