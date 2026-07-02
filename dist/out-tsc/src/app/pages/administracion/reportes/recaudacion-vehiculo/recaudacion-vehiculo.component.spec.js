import { TestBed } from '@angular/core/testing';
import { RecaudacionVehiculoComponent } from './recaudacion-vehiculo.component';
describe('RecaudacionVehiculoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecaudacionVehiculoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RecaudacionVehiculoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=recaudacion-vehiculo.component.spec.js.map