import { TestBed } from '@angular/core/testing';
import { ListaOperadoresComponent } from './lista-operadores.component';
describe('ListaOperadoresComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaOperadoresComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaOperadoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-operadores.component.spec.js.map