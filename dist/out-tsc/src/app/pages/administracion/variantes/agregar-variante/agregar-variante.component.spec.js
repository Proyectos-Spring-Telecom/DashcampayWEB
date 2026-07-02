import { TestBed } from '@angular/core/testing';
import { AgregarVarianteComponent } from './agregar-variante.component';
describe('AgregarVarianteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarVarianteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarVarianteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-variante.component.spec.js.map