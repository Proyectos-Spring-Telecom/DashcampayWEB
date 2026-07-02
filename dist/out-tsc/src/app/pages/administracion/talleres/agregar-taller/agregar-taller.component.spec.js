import { TestBed } from '@angular/core/testing';
import { AgregarTallerComponent } from './agregar-taller.component';
describe('AgregarTallerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgregarTallerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AgregarTallerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agregar-taller.component.spec.js.map