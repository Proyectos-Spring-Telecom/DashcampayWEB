import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vex-mail-label',
  templateUrl: './mail-label.component.html',
  styleUrls: ['./mail-label.component.scss'],
  standalone: true
})
export class MailLabelComponent implements OnInit {
  @Input({ required: true }) label!: string;

  constructor() {}

  ngOnInit(): void {}
}
