import { TestBed } from '@angular/core/testing';
import { ListaTurnosComponent } from './lista-turnos.component';
describe('ListaTurnosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaTurnosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaTurnosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-turnos.component.spec.js.map