import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-error-500',
  templateUrl: './error-500.component.html',
  styleUrls: ['./error-500.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class Error500Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
