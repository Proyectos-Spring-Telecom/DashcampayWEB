import { TestBed } from '@angular/core/testing';
import { RegistrarIncidenteComponent } from './registrar-incidente.component';
describe('RegistrarIncidenteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrarIncidenteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistrarIncidenteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar-incidente.component.spec.js.map