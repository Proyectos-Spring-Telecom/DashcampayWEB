import { TestBed } from '@angular/core/testing';
import { RecaudacionOperadorComponent } from './recaudacion-operador.component';
describe('RecaudacionOperadorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecaudacionOperadorComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RecaudacionOperadorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=recaudacion-operador.component.spec.js.map