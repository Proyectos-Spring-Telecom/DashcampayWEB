import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
let CalendarEditComponent = class CalendarEditComponent {
    constructor(dialogRef, event, fb) {
        this.dialogRef = dialogRef;
        this.event = event;
        this.fb = fb;
        this.form = this.fb.group({
            title: null,
            start: null,
            end: null
        });
    }
    ngOnInit() {
        this.form.patchValue(this.event);
    }
    save() {
        this.dialogRef.close({
            ...this.event,
            ...this.form.value
        });
    }
};
CalendarEditComponent = __decorate([
    Component({
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
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], CalendarEditComponent);
export { CalendarEditComponent };
//# sourceMappingURL=calendar-edit.component.js.map