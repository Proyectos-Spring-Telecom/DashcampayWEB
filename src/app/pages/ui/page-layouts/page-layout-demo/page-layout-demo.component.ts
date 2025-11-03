import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'vex-page-layout-demo',
  templateUrl: './page-layout-demo.component.html',
  styleUrls: ['./page-layout-demo.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class PageLayoutDemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
