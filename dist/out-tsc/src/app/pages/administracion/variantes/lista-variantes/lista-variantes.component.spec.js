import { TestBed } from '@angular/core/testing';
import { ListaVariantesComponent } from './lista-variantes.component';
describe('ListaVariantesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaVariantesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaVariantesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-variantes.component.spec.js.map