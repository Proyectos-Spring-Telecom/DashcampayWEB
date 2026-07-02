import { TestBed } from '@angular/core/testing';
import { ListaRutasComponent } from './lista-rutas.component';
describe('ListaRutasComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaRutasComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaRutasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-rutas.component.spec.js.map