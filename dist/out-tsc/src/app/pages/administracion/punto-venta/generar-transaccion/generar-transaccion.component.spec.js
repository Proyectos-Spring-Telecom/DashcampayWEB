import { TestBed } from '@angular/core/testing';
import { GenerarTransaccionComponent } from './generar-transaccion.component';
describe('GenerarTransaccionComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GenerarTransaccionComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(GenerarTransaccionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=generar-transaccion.component.spec.js.map