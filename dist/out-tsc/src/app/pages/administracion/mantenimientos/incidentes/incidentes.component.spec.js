import { TestBed } from '@angular/core/testing';
import { IncidentesComponent } from './incidentes.component';
describe('IncidentesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IncidentesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(IncidentesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=incidentes.component.spec.js.map