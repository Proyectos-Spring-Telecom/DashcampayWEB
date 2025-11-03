import { Component, OnInit } from '@angular/core';
import { Link } from '@vex/interfaces/link.interface';
import { trackByRoute } from '@vex/utils/track-by';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  animations: [stagger40ms, fadeInUp400ms],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgFor,
    MatRippleModule,
    RouterLinkActive,
    NgClass,
    RouterLink,
    RouterOutlet
  ]
})
export class HelpCenterComponent implements OnInit {
  links: (Link & { icon: string })[] = [
    {
      label: 'Getting Started',
      route: 'getting-started',
      icon: 'mat:flag'
    },
    {
      label: 'Pricing & Plans',
      route: 'pricing',
      icon: 'mat:attach_money'
    },
    {
      label: 'FAQ',
      route: 'faq',
      icon: 'mat:contact_support'
    },
    {
      label: 'Guides',
      route: 'guides',
      icon: 'mat:book'
    }
  ];

  trackByRoute = trackByRoute;

  constructor() {}

  ngOnInit() {}
}
