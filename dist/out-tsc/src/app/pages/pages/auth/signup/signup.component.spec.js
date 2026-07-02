import { TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
describe('SignupComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=signup.component.spec.js.map