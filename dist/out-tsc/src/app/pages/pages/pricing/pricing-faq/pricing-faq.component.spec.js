import { TestBed } from '@angular/core/testing';
import { PricingFaqComponent } from './pricing-faq.component';
describe('PricingFaqComponent', () => {
    let component;
    let fixture;
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
//# sourceMappingURL=pricing-faq.component.spec.js.map