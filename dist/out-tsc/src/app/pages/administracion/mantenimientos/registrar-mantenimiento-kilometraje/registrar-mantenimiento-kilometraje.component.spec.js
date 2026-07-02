import { TestBed } from '@angular/core/testing';
import { RegistrarMantenimientoKilometrajeComponent } from './registrar-mantenimiento-kilometraje.component';
describe('RegistrarMantenimientoKilometrajeComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistrarMantenimientoKilometrajeComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistrarMantenimientoKilometrajeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar-mantenimiento-kilometraje.component.spec.js.map