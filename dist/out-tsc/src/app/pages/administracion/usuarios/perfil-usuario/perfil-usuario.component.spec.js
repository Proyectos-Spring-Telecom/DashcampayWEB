import { TestBed } from '@angular/core/testing';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
describe('PerfilUsuarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PerfilUsuarioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PerfilUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=perfil-usuario.component.spec.js.map