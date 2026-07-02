var CustomerCreateUpdateComponent_1;
import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
let CustomerCreateUpdateComponent = class CustomerCreateUpdateComponent {
    static { CustomerCreateUpdateComponent_1 = this; }
    static { this.id = 100; }
    constructor(defaults, dialogRef, fb) {
        this.defaults = defaults;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.form = this.fb.group({
            id: [CustomerCreateUpdateComponent_1.id++],
            imageSrc: this.defaults?.imageSrc,
            firstName: [this.defaults?.firstName || ''],
            lastName: [this.defaults?.lastName || ''],
            street: this.defaults?.street || '',
            city: this.defaults?.city || '',
            zipcode: this.defaults?.zipcode || '',
            phoneNumber: this.defaults?.phoneNumber || '',
            notes: this.defaults?.notes || ''
        });
        this.mode = 'create';
    }
    ngOnInit() {
        if (this.defaults) {
            this.mode = 'update';
        }
        else {
            this.defaults = {};
        }
        this.form.patchValue(this.defaults);
    }
    save() {
        if (this.mode === 'create') {
            this.createCustomer();
        }
        else if (this.mode === 'update') {
            this.updateCustomer();
        }
    }
    createCustomer() {
        const customer = this.form.value;
        if (!customer.imageSrc) {
            customer.imageSrc = 'assets/img/avatars/1.jpg';
        }
        this.dialogRef.close(customer);
    }
    updateCustomer() {
        const customer = this.form.value;
        if (!this.defaults) {
            throw new Error('Customer ID does not exist, this customer cannot be updated');
        }
        customer.id = this.defaults.id;
        this.dialogRef.close(customer);
    }
    isCreateMode() {
        return this.mode === 'create';
    }
    isUpdateMode() {
        return this.mode === 'update';
    }
};
CustomerCreateUpdateComponent = CustomerCreateUpdateComponent_1 = __decorate([
    Component({
        selector: 'vex-customer-create-update',
        templateUrl: './customer-create-update.component.html',
        styleUrls: ['./customer-create-update.component.scss'],
        standalone: true,
        imports: [
            ReactiveFormsModule,
            MatDialogModule,
            NgIf,
            MatButtonModule,
            MatMenuModule,
            MatIconModule,
            MatDividerModule,
            MatFormFieldModule,
            MatInputModule
        ]
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], CustomerCreateUpdateComponent);
export { CustomerCreateUpdateComponent };
//# sourceMappingURL=customer-create-update.component.js.map