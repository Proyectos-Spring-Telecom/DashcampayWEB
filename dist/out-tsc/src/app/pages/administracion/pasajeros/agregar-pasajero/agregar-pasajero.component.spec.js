import { TestBed } from '@angular/core/testing';
import { AgregarPasajeroComponent } from './agregar-pasajero.component';
describe('AgregarPasajeroComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarPasajeroComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarPasajeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-pasajero.component.spec.js.map