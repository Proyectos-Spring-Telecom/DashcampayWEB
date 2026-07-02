import { __decorate } from "tslib";
import { Component, DestroyRef, inject, Input, ViewChild } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from "../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexPageLayoutHeaderDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
let AioTableComponent = class AioTableComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.layoutCtrl = new UntypedFormControl('boxed');
        /**
         * Simulating a service with HTTP that returns Observables
         * You probably want to remove this and do all requests in a service with HTTP
         */
        this.subject$ = new ReplaySubject(1);
        this.data$ = this.subject$.asObservable();
        this.customers = [];
        this.columns = [
            {
                label: 'Checkbox',
                property: 'checkbox',
                type: 'checkbox',
                visible: true
            },
            { label: 'Image', property: 'image', type: 'image', visible: true },
            {
                label: 'Name',
                property: 'name',
                type: 'text',
                visible: true,
                cssClasses: ['font-medium']
            },
            {
                label: 'First Name',
                property: 'firstName',
                type: 'text',
                visible: false
            },
            { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
            { label: 'Contact', property: 'contact', type: 'button', visible: true },
            {
                label: 'Address',
                property: 'address',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: 'Street',
                property: 'street',
                type: 'text',
                visible: false,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: 'Zipcode',
                property: 'zipcode',
                type: 'text',
                visible: false,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: 'City',
                property: 'city',
                type: 'text',
                visible: false,
                cssClasses: ['text-secondary', 'font-medium']
            },
            {
                label: 'Phone',
                property: 'phoneNumber',
                type: 'text',
                visible: true,
                cssClasses: ['text-secondary', 'font-medium']
            },
            { label: 'Labels', property: 'labels', type: 'button', visible: true },
            { label: 'Actions', property: 'actions', type: 'button', visible: true }
        ];
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 20, 50];
        this.selection = new SelectionModel(true, []);
        this.searchCtrl = new UntypedFormControl();
        this.labels = aioTableLabels;
        this.destroyRef = inject(DestroyRef);
    }
    get visibleColumns() {
        return this.columns
            .filter((column) => column.visible)
            .map((column) => column.property);
    }
    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
    getData() {
        return of(aioTableData.map((customer) => new Customer(customer)));
    }
    ngOnInit() {
        this.getData().subscribe((customers) => {
            this.subject$.next(customers);
        });
        this.dataSource = new MatTableDataSource();
        this.data$.pipe(filter(Boolean)).subscribe((customers) => {
            this.customers = customers;
            this.dataSource.data = customers;
        });
        this.searchCtrl.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => this.onFilterChange(value));
    }
    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }
    createCustomer() {
        this.dialog
            .open(CustomerCreateUpdateComponent)
            .afterClosed()
            .subscribe((customer) => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            if (customer) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                this.customers.unshift(new Customer(customer));
                this.subject$.next(this.customers);
            }
        });
    }
    updateCustomer(customer) {
        this.dialog
            .open(CustomerCreateUpdateComponent, {
            data: customer
        })
            .afterClosed()
            .subscribe((updatedCustomer) => {
            /**
             * Customer is the updated customer (if the user pressed Save - otherwise it's null)
             */
            if (updatedCustomer) {
                /**
                 * Here we are updating our local array.
                 * You would probably make an HTTP request here.
                 */
                const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
                this.customers[index] = new Customer(updatedCustomer);
                this.subject$.next(this.customers);
            }
        });
    }
    deleteCustomer(customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
        this.selection.deselect(customer);
        this.subject$.next(this.customers);
    }
    deleteCustomers(customers) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        customers.forEach((c) => this.deleteCustomer(c));
    }
    onFilterChange(value) {
        if (!this.dataSource) {
            return;
        }
        value = value.trim();
        value = value.toLowerCase();
        this.dataSource.filter = value;
    }
    toggleColumnVisibility(column, event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.visible = !column.visible;
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
    trackByProperty(index, column) {
        return column.property;
    }
    onLabelChange(change, row) {
        const index = this.customers.findIndex((c) => c === row);
        this.customers[index].labels = change.value;
        this.subject$.next(this.customers);
    }
};
__decorate([
    Input()
], AioTableComponent.prototype, "columns", void 0);
__decorate([
    ViewChild(MatPaginator, { static: true })
], AioTableComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], AioTableComponent.prototype, "sort", void 0);
AioTableComponent = __decorate([
    Component({
        selector: 'vex-aio-table',
        templateUrl: './aio-table.component.html',
        styleUrls: ['./aio-table.component.scss'],
        animations: [fadeInUp400ms, stagger40ms],
        standalone: true,
        imports: [
            VexPageLayoutComponent,
            VexPageLayoutHeaderDirective,
            VexBreadcrumbsComponent,
            MatButtonToggleModule,
            ReactiveFormsModule,
            VexPageLayoutContentDirective,
            NgIf,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatMenuModule,
            MatTableModule,
            MatSortModule,
            MatCheckboxModule,
            NgFor,
            NgClass,
            MatPaginatorModule,
            FormsModule,
            MatDialogModule,
            MatInputModule
        ]
    })
], AioTableComponent);
export { AioTableComponent };
//# sourceMappingURL=aio-table.component.js.map