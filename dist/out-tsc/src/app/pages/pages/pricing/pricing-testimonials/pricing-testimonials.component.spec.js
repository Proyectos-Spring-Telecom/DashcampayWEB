import { TestBed } from '@angular/core/testing';
import { PricingTestimonialsComponent } from './pricing-testimonials.component';
describe('PricingTestimonialsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PricingTestimonialsComponent]
        });
        fixture = TestBed.createComponent(PricingTestimonialsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pricing-testimonials.component.spec.js.map