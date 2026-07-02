import { TestBed } from '@angular/core/testing';
import { ListaTalleresComponent } from './lista-talleres.component';
describe('ListaTalleresComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListaTalleresComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListaTalleresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lista-talleres.component.spec.js.map