import { TestBed } from '@angular/core/testing';
import { AgregarMonederoComponent } from './agregar-monedero.component';
describe('AgregarMonederoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarMonederoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarMonederoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-monedero.component.spec.js.map