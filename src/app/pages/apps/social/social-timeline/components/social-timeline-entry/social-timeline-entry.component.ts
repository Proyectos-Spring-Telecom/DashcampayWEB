import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'vex-profile-timeline-entry',
  templateUrl: './social-timeline-entry.component.html',
  styleUrls: ['./social-timeline-entry.component.scss'],
  standalone: true,
  imports: [NgIf, MatRippleModule, MatIconModule]
})
export class SocialTimelineEntryComponent implements OnInit {
  @Input({ required: true }) avatarUrl!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) time!: string;
  @Input() imageUrl?: string;
  @Input({ required: true }) likes!: string;
  @Input({ required: true }) comments!: string;

  constructor() {}

  ngOnInit(): void {}
}
