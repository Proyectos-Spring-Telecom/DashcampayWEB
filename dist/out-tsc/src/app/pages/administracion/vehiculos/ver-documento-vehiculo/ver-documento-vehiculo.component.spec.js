import { TestBed } from '@angular/core/testing';
import { VerDocumentoVehiculoComponent } from './ver-documento-vehiculo.component';
describe('VerDocumentoVehiculoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VerDocumentoVehiculoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(VerDocumentoVehiculoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ver-documento-vehiculo.component.spec.js.map