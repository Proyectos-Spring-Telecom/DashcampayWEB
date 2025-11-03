import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Testimonial {
  description: string;
  imageSrc: string;
  name: string;
  starCount: number;
}

@Component({
  selector: 'vex-pricing-testimonials',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pricing-testimonials.component.html',
  styleUrls: ['./pricing-testimonials.component.scss']
})
export class PricingTestimonialsComponent {
  items: Testimonial[] = [
    {
      description:
        'Your stuff is awesome! Needless to say we are extremely satisfied with the results and will recommend to my anyone I know.',
      imageSrc: '/assets/img/avatars/2.jpg',
      name: 'John Doe',
      starCount: 4
    },
    {
      description:
        "It's perfect. No matter where you go, you always know it's the coolest, most happening thing around! We've used it for the last five years.",
      imageSrc: '/assets/img/avatars/3.jpg',
      name: 'Diane Fisher',
      starCount: 5
    },
    {
      description:
        'This is worth much more than I paid. If you want real marketing that works and effective implementation - they got you covered.',
      imageSrc: '/assets/img/avatars/5.jpg',
      name: 'Frank Powell',
      starCount: 5
    },
    {
      description:
        'This is the next killer app. We have no regrets! Best app for specialized tooling. Thanks guys, keep up the good work!',
      imageSrc: '/assets/img/avatars/4.jpg',
      name: 'Pamela Wanda',
      starCount: 4
    }
  ];

  getStarsArray(testimonial: Testimonial): number[] {
    return testimonial.starCount ? Array(testimonial.starCount) : [];
  }
}
