import { Component, OnInit } from '@angular/core';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [stagger60ms, fadeInUp400ms],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatExpansionModule]
})
export class FaqComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
