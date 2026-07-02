import { TestBed } from '@angular/core/testing';
import { BitacoraViajesComponent } from './bitacora-viajes.component';
describe('BitacoraViajesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BitacoraViajesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(BitacoraViajesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bitacora-viajes.component.spec.js.map