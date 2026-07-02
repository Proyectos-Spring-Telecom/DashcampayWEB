import { TestBed } from '@angular/core/testing';
import { RegistrarTipoPasajeroComponent } from './registrar-tipo-pasajero.component';
describe('RegistrarTipoPasajeroComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrarTipoPasajeroComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistrarTipoPasajeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar-tipo-pasajero.component.spec.js.map