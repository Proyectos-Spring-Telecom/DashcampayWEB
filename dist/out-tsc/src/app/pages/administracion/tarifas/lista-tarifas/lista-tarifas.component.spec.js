import { TestBed } from '@angular/core/testing';
import { ListaTarifasComponent } from './lista-tarifas.component';
describe('ListaTarifasComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListaTarifasComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaTarifasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-tarifas.component.spec.js.map