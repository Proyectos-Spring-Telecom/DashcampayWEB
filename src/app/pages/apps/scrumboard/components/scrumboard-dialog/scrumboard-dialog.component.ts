import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { ScrumboardCard } from '../../interfaces/scrumboard-card.interface';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl
} from '@angular/forms';
import {
  scrumboardLabels,
  scrumboardUsers
} from '../../../../../../static-data/scrumboard';
import { ScrumboardList } from '../../interfaces/scrumboard-list.interface';
import { Scrumboard } from '../../interfaces/scrumboard.interface';
import { ScrumboardAttachment } from '../../interfaces/scrumboard-attachment.interface';
import { DateTime } from 'luxon';
import { ScrumboardComment } from '../../interfaces/scrumboard-comment.interface';
import { ScrumboardUser } from '../../interfaces/scrumboard-user.interface';
import { ScrumboardLabel } from '../../interfaces/scrumboard-label.interface';
import { VexDateFormatRelativePipe } from '@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe';
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

@Component({
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
})
export class ScrumboardDialogComponent implements OnInit {
  form = this.fb.group({
    title: '',
    description: '',
    dueDate: this.fb.control<ScrumboardCard['dueDate']>({
      date: DateTime.local(),
      done: false
    }),
    cover: this.fb.control<ScrumboardAttachment | null>(null),
    attachments: this.fb.array<ScrumboardAttachment>([]),
    comments: this.fb.array<ScrumboardComment>([]),
    users: this.fb.control<ScrumboardUser[]>([]),
    labels: this.fb.control<ScrumboardLabel[]>([])
  });

  commentCtrl = new UntypedFormControl();

  users = scrumboardUsers;
  labels = scrumboardLabels;

  list!: ScrumboardList;
  board!: Scrumboard;

  constructor(
    private dialogRef: MatDialogRef<ScrumboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      card: ScrumboardCard;
      list: ScrumboardList;
      board: Scrumboard;
    },
    private fb: FormBuilder
  ) {}

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

  isImageExtension(extension: string) {
    return extension === 'jpg' || extension === 'png';
  }

  makeCover(attachment: ScrumboardAttachment) {
    this.form.controls.cover.setValue(attachment);
  }

  isCover(attachment: ScrumboardAttachment) {
    return this.form.controls.cover.value === attachment;
  }

  remove(attachment: ScrumboardAttachment) {
    if (
      this.form.controls.cover.value &&
      attachment.id === this.form.controls.cover.value.id
    ) {
      this.form.controls.cover.setValue(null);
    }

    this.form.setControl(
      'attachments',
      this.fb.array(
        this.form.controls.attachments.value.filter((a) => a !== attachment)
      )
    );
  }

  addComment() {
    if (!this.commentCtrl.value) {
      return;
    }

    const comments = this.form.get('comments') as UntypedFormArray;
    comments.push(
      new FormControl({
        from: {
          name: 'David Smith',
          imageSrc: 'assets/img/avatars/1.jpg'
        },
        message: this.commentCtrl.value,
        date: DateTime.local().minus({ seconds: 1 })
      } as ScrumboardComment)
    );

    this.commentCtrl.setValue(null);
  }
}
