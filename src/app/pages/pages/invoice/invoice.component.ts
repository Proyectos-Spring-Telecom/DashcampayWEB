import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [MatIconModule]
})
export class InvoiceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
