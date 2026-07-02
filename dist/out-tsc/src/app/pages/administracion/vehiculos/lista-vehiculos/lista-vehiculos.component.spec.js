import { TestBed } from '@angular/core/testing';
import { ListaVehiculosComponent } from './lista-vehiculos.component';
describe('ListaVehiculosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaVehiculosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaVehiculosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-vehiculos.component.spec.js.map