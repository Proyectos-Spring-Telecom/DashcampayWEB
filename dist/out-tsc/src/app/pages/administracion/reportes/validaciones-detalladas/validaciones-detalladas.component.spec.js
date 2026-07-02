import { TestBed } from '@angular/core/testing';
import { ValidacionesDetalladasComponent } from './validaciones-detalladas.component';
describe('ValidacionesDetalladasComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ValidacionesDetalladasComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ValidacionesDetalladasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=validaciones-detalladas.component.spec.js.map