import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vex-pricing-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-faq.component.html',
  styleUrls: ['./pricing-faq.component.scss']
})
export class PricingFaqComponent {
  items = [
    {
      label: 'Is there a free trial available?',
      description:
        "Yes, you can try us for free for 14 days. If you want, we'll provide you with a free, personalized onboarding call to get you up and running."
    },
    {
      label: 'Can I change my plan later?',
      description:
        'Yes, all plans are available at any point of time and you can change the selected plan anytime. No hidden costs.'
    },
    {
      label: 'What are my payment options?',
      description:
        'We offer payment through all major platforms. Enjoy payments using Stripe, PayPal, credit cards or invoice. No payment fees. Never.'
    },
    {
      label: 'What happens when I hit my usage limits?',
      description:
        "We've set usage limits to be as high as ever needed. After you hit your usage limit, you'll be notified via mail and offered an extension."
    },
    {
      label: 'What is log retention?',
      description:
        'Whenever anything happens in the application, we provide a log file for that. Log retention determines the duration we store important logs and allow you to easily export them.'
    },
    {
      label: 'What is the best plan for me?',
      description:
        'Whether you are an aspriring start-up with a low-budget or you are a grown enterprise business, everyone will enjoy all benefits using the all-in-one Premium plan for a single flat fee.'
    }
  ];
}
