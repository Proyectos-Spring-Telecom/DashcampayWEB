import { TestBed } from '@angular/core/testing';
import { ListaZonasComponent } from './lista-zonas.component';
describe('ListaZonasComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaZonasComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaZonasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-zonas.component.spec.js.map