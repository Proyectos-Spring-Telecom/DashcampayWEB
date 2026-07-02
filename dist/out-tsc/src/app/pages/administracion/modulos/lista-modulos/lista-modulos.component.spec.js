import { TestBed } from '@angular/core/testing';
import { ListaModulosComponent } from './lista-modulos.component';
describe('ListaModulosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaModulosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaModulosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-modulos.component.spec.js.map