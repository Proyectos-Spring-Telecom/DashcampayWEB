import { TestBed } from '@angular/core/testing';
import { ListaRolesComponent } from './lista-roles.component';
describe('ListaRolesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaRolesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaRolesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-roles.component.spec.js.map