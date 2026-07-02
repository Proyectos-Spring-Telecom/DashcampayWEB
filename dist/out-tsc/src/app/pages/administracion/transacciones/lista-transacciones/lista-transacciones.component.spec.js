import { TestBed } from '@angular/core/testing';
import { ListaTransaccionesComponent } from './lista-transacciones.component';
describe('ListaTransaccionesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaTransaccionesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaTransaccionesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-transacciones.component.spec.js.map