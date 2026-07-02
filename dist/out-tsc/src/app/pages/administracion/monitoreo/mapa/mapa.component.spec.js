import { TestBed } from '@angular/core/testing';
import { MapaComponent } from './mapa.component';
describe('MapaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MapaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MapaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mapa.component.spec.js.map