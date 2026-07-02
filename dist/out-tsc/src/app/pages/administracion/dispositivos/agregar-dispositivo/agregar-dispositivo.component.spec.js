import { TestBed } from '@angular/core/testing';
import { AgregarDispositivoComponent } from './agregar-dispositivo.component';
describe('AgregarDispositivoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarDispositivoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarDispositivoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-dispositivo.component.spec.js.map