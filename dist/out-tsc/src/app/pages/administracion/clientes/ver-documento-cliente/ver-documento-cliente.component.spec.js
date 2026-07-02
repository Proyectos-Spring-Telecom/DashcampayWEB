import { TestBed } from '@angular/core/testing';
import { VerDocumentoClienteComponent } from './ver-documento-cliente.component';
describe('VerDocumentoClienteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VerDocumentoClienteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(VerDocumentoClienteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ver-documento-cliente.component.spec.js.map