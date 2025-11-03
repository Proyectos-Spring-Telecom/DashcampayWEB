import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'vex-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class CalendarEditComponent implements OnInit {
  form = this.fb.group({
    title: null,
    start: null,
    end: null
  });

  constructor(
    private dialogRef: MatDialogRef<CalendarEditComponent>,
    @Inject(MAT_DIALOG_DATA) public event: CalendarEvent<any>,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.form.patchValue(this.event);
  }

  save() {
    this.dialogRef.close({
      ...this.event,
      ...this.form.value
    });
  }
}
