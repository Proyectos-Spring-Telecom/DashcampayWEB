import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { scrumboardLabels, scrumboardUsers } from '../../../../../../static-data/scrumboard';
import { DateTime } from 'luxon';
import { VexDateFormatRelativePipe } from "../../../../../../@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe";
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
let ScrumboardDialogComponent = class ScrumboardDialogComponent {
    constructor(dialogRef, data, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.form = this.fb.group({
            title: '',
            description: '',
            dueDate: this.fb.control({
                date: DateTime.local(),
                done: false
            }),
            cover: this.fb.control(null),
            attachments: this.fb.array([]),
            comments: this.fb.array([]),
            users: this.fb.control([]),
            labels: this.fb.control([])
        });
        this.commentCtrl = new UntypedFormControl();
        this.users = scrumboardUsers;
        this.labels = scrumboardLabels;
    }
    ngOnInit() {
        this.list = this.data.list;
        this.board = this.data.board;
        const card = this.data.card;
        this.form.patchValue({
            title: card.title,
            description: card.description,
            dueDate: card.dueDate || null,
            cover: card.cover || null,
            users: card.users || [],
            labels: card.labels || []
        });
        this.form.setControl('attachments', this.fb.array(card.attachments || []));
        this.form.setControl('comments', this.fb.array(card.comments || []));
    }
    save() {
        this.dialogRef.close(this.form.value);
    }
    isImageExtension(extension) {
        return extension === 'jpg' || extension === 'png';
    }
    makeCover(attachment) {
        this.form.controls.cover.setValue(attachment);
    }
    isCover(attachment) {
        return this.form.controls.cover.value === attachment;
    }
    remove(attachment) {
        if (this.form.controls.cover.value &&
            attachment.id === this.form.controls.cover.value.id) {
            this.form.controls.cover.setValue(null);
        }
        this.form.setControl('attachments', this.fb.array(this.form.controls.attachments.value.filter((a) => a !== attachment)));
    }
    addComment() {
        if (!this.commentCtrl.value) {
            return;
        }
        const comments = this.form.get('comments');
        comments.push(new FormControl({
            from: {
                name: 'David Smith',
                imageSrc: 'assets/img/avatars/1.jpg'
            },
            message: this.commentCtrl.value,
            date: DateTime.local().minus({ seconds: 1 })
        }));
        this.commentCtrl.setValue(null);
    }
};
ScrumboardDialogComponent = __decorate([
    Component({
        selector: 'vex-scrumboard-dialog',
        templateUrl: './scrumboard-dialog.component.html',
        styleUrls: ['./scrumboard-dialog.component.scss'],
        standalone: true,
        imports: [
            ReactiveFormsModule,
            MatDialogModule,
            MatIconModule,
            MatButtonModule,
            NgFor,
            MatTooltipModule,
            MatSelectModule,
            MatOptionModule,
            NgClass,
            MatDividerModule,
            MatFormFieldModule,
            TextFieldModule,
            MatInputModule,
            NgIf,
            MatMenuModule,
            VexDateFormatRelativePipe
        ]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ScrumboardDialogComponent);
export { ScrumboardDialogComponent };
//# sourceMappingURL=scrumboard-dialog.component.js.map