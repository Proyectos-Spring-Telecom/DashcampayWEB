import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-error404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class Error404Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
