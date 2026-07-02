import { TestBed } from '@angular/core/testing';
import { AltaUsuarioComponent } from './alta-usuario.component';
describe('AltaUsuarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AltaUsuarioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AltaUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=alta-usuario.component.spec.js.map