import { TestBed } from '@angular/core/testing';
import { ListaContadoraComponent } from './lista-contadora.component';
describe('ListaContadoraComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaContadoraComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaContadoraComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-contadora.component.spec.js.map