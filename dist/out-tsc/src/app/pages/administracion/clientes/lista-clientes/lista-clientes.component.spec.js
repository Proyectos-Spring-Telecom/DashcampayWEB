import { TestBed } from '@angular/core/testing';
import { ListaClientesComponent } from './lista-clientes.component';
describe('ListaClientesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaClientesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaClientesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-clientes.component.spec.js.map