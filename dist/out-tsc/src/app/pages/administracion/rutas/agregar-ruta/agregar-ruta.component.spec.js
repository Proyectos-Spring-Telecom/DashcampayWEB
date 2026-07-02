import { TestBed } from '@angular/core/testing';
import { AgregarRutaComponent } from './agregar-ruta.component';
describe('AgregarRutaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarRutaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarRutaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-ruta.component.spec.js.map