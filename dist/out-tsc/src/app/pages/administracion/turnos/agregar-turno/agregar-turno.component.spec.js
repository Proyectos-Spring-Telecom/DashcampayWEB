import { TestBed } from '@angular/core/testing';
import { AgregarTurnoComponent } from './agregar-turno.component';
describe('AgregarTurnoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarTurnoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarTurnoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-turno.component.spec.js.map