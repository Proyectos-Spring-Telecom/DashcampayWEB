import { TestBed } from '@angular/core/testing';
import { AgregarOperadorComponent } from './agregar-operador.component';
describe('AgregarOperadorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarOperadorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarOperadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-operador.component.spec.js.map