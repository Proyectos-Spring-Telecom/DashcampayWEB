import { TestBed } from '@angular/core/testing';
import { TalleresComponent } from './talleres.component';
describe('TalleresComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TalleresComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TalleresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=talleres.component.spec.js.map