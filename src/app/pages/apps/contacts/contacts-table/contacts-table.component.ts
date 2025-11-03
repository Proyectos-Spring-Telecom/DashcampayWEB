import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { contactsData } from '../../../../../static-data/contacts';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatDialog } from '@angular/material/dialog';
import { ContactsEditComponent } from '../components/contacts-edit/contacts-edit.component';
import { Contact } from '../interfaces/contact.interface';
import { AsyncPipe } from '@angular/common';
import { ContactsDataTableComponent } from './contacts-data-table/contacts-data-table.component';
import { ContactsTableMenuComponent } from './contacts-table-menu/contacts-table-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-contacts-table',
  templateUrl: './contacts-table.component.html',
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
  styles: [
    `
      .mat-drawer-container {
        background: transparent !important;
      }
    `
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ContactsTableMenuComponent,
    ContactsDataTableComponent,
    AsyncPipe
  ]
})
export class ContactsTableComponent implements OnInit {
  searchCtrl = new UntypedFormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(debounceTime(10));

  menuOpen = false;

  activeCategory:
    | 'frequently'
    | 'starred'
    | 'all'
    | 'family'
    | 'friends'
    | 'colleagues'
    | 'business' = 'all';
  tableData = contactsData;
  tableColumns: TableColumn<Contact>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },
    {
      label: '',
      property: 'imageSrc',
      type: 'image',
      cssClasses: ['min-w-9']
    },
    {
      label: 'NAME',
      property: 'name',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'EMAIL',
      property: 'email',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'PHONE',
      property: 'phone',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: '',
      property: 'starred',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    },
    {
      label: '',
      property: 'menu',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openContact(id?: Contact['id']) {
    this.dialog.open(ContactsEditComponent, {
      data: id || null,
      width: '600px'
    });
  }

  toggleStar(id: Contact['id']) {
    const contact = this.tableData.find((c) => c.id === id);

    if (contact) {
      contact.starred = !contact.starred;
    }
  }

  setData(data: Contact[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }
}
