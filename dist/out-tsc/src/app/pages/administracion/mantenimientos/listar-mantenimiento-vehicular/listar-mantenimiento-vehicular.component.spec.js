import { TestBed } from '@angular/core/testing';
import { ListarMantenimientoVehicularComponent } from './listar-mantenimiento-vehicular.component';
describe('ListarMantenimientoVehicularComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListarMantenimientoVehicularComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListarMantenimientoVehicularComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listar-mantenimiento-vehicular.component.spec.js.map