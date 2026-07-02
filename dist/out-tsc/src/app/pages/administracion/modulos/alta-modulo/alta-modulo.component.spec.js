import { TestBed } from '@angular/core/testing';
import { AltaModuloComponent } from './alta-modulo.component';
describe('AltaModuloComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AltaModuloComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AltaModuloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=alta-modulo.component.spec.js.map