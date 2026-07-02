import { TestBed } from '@angular/core/testing';
import { AgregarVehiculoComponent } from './agregar-vehiculo.component';
describe('AgregarVehiculoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarVehiculoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarVehiculoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-vehiculo.component.spec.js.map