import { TestBed } from '@angular/core/testing';
import { AgregarRolComponent } from './agregar-rol.component';
describe('AgregarRolComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AgregarRolComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarRolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-rol.component.spec.js.map