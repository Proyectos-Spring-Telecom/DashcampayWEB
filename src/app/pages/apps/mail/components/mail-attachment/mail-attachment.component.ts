import { Component, Input, OnInit } from '@angular/core';
import { MailAttachment } from '../../interfaces/mail-attachment.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'vex-mail-attachment',
  templateUrl: './mail-attachment.component.html',
  styleUrls: ['./mail-attachment.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class MailAttachmentComponent implements OnInit {
  @Input({ required: true }) attachment!: MailAttachment;

  constructor() {}

  ngOnInit(): void {}

  isImage() {
    return (
      this.attachment?.type === 'png' ||
      this.attachment?.type === 'jpg' ||
      this.attachment?.type === 'gif' ||
      this.attachment?.type === 'jpe'
    );
  }
}
