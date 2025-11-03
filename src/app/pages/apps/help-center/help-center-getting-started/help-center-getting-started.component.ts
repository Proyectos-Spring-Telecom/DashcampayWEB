import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'vex-help-center-getting-started',
  templateUrl: './help-center-getting-started.component.html',
  styleUrls: ['./help-center-getting-started.component.scss'],
  standalone: true,
  imports: [MatExpansionModule]
})
export class HelpCenterGettingStartedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
