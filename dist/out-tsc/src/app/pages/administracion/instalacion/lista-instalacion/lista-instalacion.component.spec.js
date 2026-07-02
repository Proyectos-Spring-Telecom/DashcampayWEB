import { TestBed } from '@angular/core/testing';
import { ListaInstalacionComponent } from './lista-instalacion.component';
describe('ListaInstalacionComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaInstalacionComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaInstalacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-instalacion.component.spec.js.map