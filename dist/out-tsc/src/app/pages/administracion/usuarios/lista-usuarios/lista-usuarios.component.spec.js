import { TestBed } from '@angular/core/testing';
import { ListaUsuariosComponent } from './lista-usuarios.component';
describe('ListaUsuariosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaUsuariosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-usuarios.component.spec.js.map