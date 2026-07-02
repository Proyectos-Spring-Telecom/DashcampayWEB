import { TestBed } from '@angular/core/testing';
import { AltaClienteComponent } from './alta-cliente.component';
describe('AltaClienteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AltaClienteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AltaClienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=alta-cliente.component.spec.js.map