import { TestBed } from '@angular/core/testing';
import { VerDocumentoOperadorComponent } from './ver-documento-operador.component';
describe('VerDocumentoOperadorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VerDocumentoOperadorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(VerDocumentoOperadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ver-documento-operador.component.spec.js.map