import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { contactsData } from '../../../../../../static-data/contacts';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

export let contactIdCounter = 50;

@Component({
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
})
export class ContactsEditComponent implements OnInit {
  form = this.fb.group({
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

  contact?: Contact;

  get isEdit(): boolean {
    return !!this.contactId;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private contactId: Contact['id'],
    private dialogRef: MatDialogRef<ContactsEditComponent>,
    private fb: FormBuilder
  ) {}

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
}
