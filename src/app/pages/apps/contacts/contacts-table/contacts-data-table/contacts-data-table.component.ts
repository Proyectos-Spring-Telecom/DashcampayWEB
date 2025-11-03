import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { stagger20ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { Contact } from '../../interfaces/contact.interface';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component';

@Component({
  selector: 'vex-contacts-data-table',
  templateUrl: './contacts-data-table.component.html',
  styleUrls: ['./contacts-data-table.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
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
export class ContactsDataTableComponent<T>
  implements OnInit, OnChanges, AfterViewInit
{
  @Input({ required: true }) data!: T[];
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [10, 20, 50];
  @Input() searchStr: string = '';

  @Output() toggleStar = new EventEmitter<Contact['id']>();
  @Output() openContact = new EventEmitter<Contact['id']>();

  visibleColumns: Array<keyof T | string> = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
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

  emitToggleStar(event: Event, id: Contact['id']) {
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
}
