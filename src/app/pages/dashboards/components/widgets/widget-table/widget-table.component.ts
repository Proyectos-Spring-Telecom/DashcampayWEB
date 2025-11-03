import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
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
export class WidgetTableComponent<T>
  implements OnInit, OnChanges, AfterViewInit
{
  @Input({ required: true }) data!: T[];
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input() pageSize = 6;

  visibleColumns!: Array<keyof T | string>;
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
