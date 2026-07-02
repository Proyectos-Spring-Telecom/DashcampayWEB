import { TestBed } from '@angular/core/testing';
import { PerfilPasajeroComponent } from './perfil-pasajero.component';
describe('PerfilPasajeroComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PerfilPasajeroComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PerfilPasajeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=perfil-pasajero.component.spec.js.map