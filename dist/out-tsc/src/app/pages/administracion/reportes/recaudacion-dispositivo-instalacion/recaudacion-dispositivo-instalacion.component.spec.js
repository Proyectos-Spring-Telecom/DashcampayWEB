import { TestBed } from '@angular/core/testing';
import { RecaudacionDispositivoInstalacionComponent } from './recaudacion-dispositivo-instalacion.component';
describe('RecaudacionDispositivoInstalacionComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecaudacionDispositivoInstalacionComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RecaudacionDispositivoInstalacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=recaudacion-dispositivo-instalacion.component.spec.js.map