import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFaqComponent } from './pricing-faq.component';

describe('PricingFaqComponent', () => {
  let component: PricingFaqComponent;
  let fixture: ComponentFixture<PricingFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PricingFaqComponent]
    });
    fixture = TestBed.createComponent(PricingFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
