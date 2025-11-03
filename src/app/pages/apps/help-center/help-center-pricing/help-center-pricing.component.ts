import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-help-center-pricing',
  templateUrl: './help-center-pricing.component.html',
  styleUrls: ['./help-center-pricing.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class HelpCenterPricingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
