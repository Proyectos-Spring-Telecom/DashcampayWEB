import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'vex-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss'],
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    RouterLink,
    MatRippleModule,
    MatProgressBarModule
  ]
})
export class QuickpanelComponent implements OnInit {
  date = DateTime.local().toFormat('DD');
  dayName = DateTime.local().toFormat('EEEE');

  constructor() {}

  ngOnInit() {}
}
