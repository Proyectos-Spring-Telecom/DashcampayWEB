import { TestBed } from '@angular/core/testing';
import { ListaPermisosComponent } from './lista-permisos.component';
describe('ListaPermisosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaPermisosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaPermisosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-permisos.component.spec.js.map