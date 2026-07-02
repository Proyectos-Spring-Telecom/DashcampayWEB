import { TestBed } from '@angular/core/testing';
import { RegistrarTallerComponent } from './registrar-taller.component';
describe('RegistrarTallerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrarTallerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistrarTallerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar-taller.component.spec.js.map