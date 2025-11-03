import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'vex-help-center-faq',
  templateUrl: './help-center-faq.component.html',
  styleUrls: ['./help-center-faq.component.scss'],
  standalone: true,
  imports: [MatExpansionModule]
})
export class HelpCenterFaqComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
