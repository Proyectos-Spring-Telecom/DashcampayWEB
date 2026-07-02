import { TestBed } from '@angular/core/testing';
import { ListarMantenimientoKilometrajeComponent } from './listar-mantenimiento-kilometraje.component';
describe('ListarMantenimientoKilometrajeComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListarMantenimientoKilometrajeComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListarMantenimientoKilometrajeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listar-mantenimiento-kilometraje.component.spec.js.map