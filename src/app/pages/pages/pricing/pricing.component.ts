import { Component, OnInit } from '@angular/core';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf } from '@angular/common';
import { PricingTestimonialsComponent } from './pricing-testimonials/pricing-testimonials.component';
import { PricingFaqComponent } from './pricing-faq/pricing-faq.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'vex-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  animations: [stagger60ms, fadeInUp400ms],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgClass,
    PricingTestimonialsComponent,
    NgForOf,
    PricingFaqComponent,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class PricingComponent implements OnInit {
  isYearlyChecked: boolean = false;

  items: {
    icon: string;
    label: string;
    description: string;
  }[] = [
    {
      icon: 'mat:check',
      label: 'Quick & easy integration',
      description:
        'Simple to set up and integrate with popular tools such as Angular, React, Vue, Symfony and Laravel. Supports single-page applications and hash-based routing.'
    },
    {
      icon: 'mat:check',
      label: 'Open and flexible API',
      description:
        'Simple to set up and integrate with popular tools and applications, our open APIs make the tracking process as easy and intuitive as possible.'
    },
    {
      icon: 'mat:check',
      label: 'Email financial reports',
      description:
        'Keep an eye on your traffic with weekly reports. Get pre-read articles up to a month before publication. Be able to pay for your own advertising, if necessary.'
    },
    {
      icon: 'mat:check',
      label: 'Flexible proxy scripts',
      description:
        'You can set up a proxy to change the file access rights for a specific folder, if the user has some special permissions which allows modification.'
    },
    {
      icon: 'mat:check',
      label: 'You own your data',
      description:
        'We only store the stuff you tell us to. And we take your privacy very seriously. Because of this, we only store the data we need to do our jobs for you. '
    },
    {
      icon: 'mat:check',
      label: 'Optimized workflows',
      description:
        'The best way to do things is not to do them. Automate things with our included Workflow-Manager. Enjoy easy creation of complex business operations.'
    },
    {
      icon: 'mat:check',
      label: 'Developer platform',
      description:
        'Dig deep into the code and watch the magic happen. You’ll also learn a bit about JavaScript’s event loop, closures, async functions, promises, arrays, strings and much more.'
    },
    {
      icon: 'mat:check',
      label: 'Third party integrations',
      description:
        "Connect third-party products like Amazon Echo, Sonos speakers, and games consoles. It's a good way to synchronize all your devices into a single app."
    }
  ];

  constructor() {}

  ngOnInit() {}
}
