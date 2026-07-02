import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { contactsData } from '../../../../../../static-data/contacts';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
export let contactIdCounter = 50;
let ContactsEditComponent = class ContactsEditComponent {
    get isEdit() {
        return !!this.contactId;
    }
    constructor(contactId, dialogRef, fb) {
        this.contactId = contactId;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.form = this.fb.group({
            name: this.fb.control('', {
                nonNullable: true
            }),
            email: this.fb.control('', {
                nonNullable: true
            }),
            phone: this.fb.control('', {
                nonNullable: true
            }),
            company: this.fb.control('', {
                nonNullable: true
            }),
            notes: this.fb.control('', {
                nonNullable: true
            }),
            birthday: this.fb.control('', {
                nonNullable: true
            })
        });
    }
    ngOnInit() {
        if (this.contactId) {
            const contact = contactsData.find((c) => c.id === this.contactId);
            if (!contact) {
                throw new Error('Contact not found');
            }
            this.contact = contact;
            this.form.patchValue(this.contact);
        }
    }
    toggleStar() {
        if (this.contact) {
            this.contact.starred = !this.contact.starred;
        }
    }
    save() {
        const form = this.form.getRawValue();
        if (!this.contact) {
            this.contact = {
                ...form,
                imageSrc: '',
                selected: false,
                starred: false,
                id: contactIdCounter++
            };
        }
        this.contact.name = form.name;
        this.contact.email = form.email;
        this.contact.phone = form.phone;
        this.contact.company = form.company;
        this.contact.notes = form.notes;
        this.contact.birthday = form.birthday;
        this.dialogRef.close();
    }
};
ContactsEditComponent = __decorate([
    Component({
        selector: 'vex-contacts-edit',
        templateUrl: './contacts-edit.component.html',
        styleUrls: ['./contacts-edit.component.scss'],
        standalone: true,
        imports: [
            ReactiveFormsModule,
            MatDialogModule,
            NgIf,
            MatButtonModule,
            MatIconModule,
            MatMenuModule,
            MatDividerModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule
        ]
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ContactsEditComponent);
export { ContactsEditComponent };
//# sourceMappingURL=contacts-edit.component.js.map