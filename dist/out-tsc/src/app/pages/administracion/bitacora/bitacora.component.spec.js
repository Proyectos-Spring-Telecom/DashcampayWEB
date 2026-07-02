import { TestBed } from '@angular/core/testing';
import { BitacoraComponent } from './bitacora.component';
describe('BitacoraComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BitacoraComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(BitacoraComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bitacora.component.spec.js.map