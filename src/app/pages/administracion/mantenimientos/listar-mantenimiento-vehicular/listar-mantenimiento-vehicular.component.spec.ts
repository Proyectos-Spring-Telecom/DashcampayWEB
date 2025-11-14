import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMantenimientoVehicularComponent } from './listar-mantenimiento-vehicular.component';

describe('ListarMantenimientoVehicularComponent', () => {
  let component: ListarMantenimientoVehicularComponent;
  let fixture: ComponentFixture<ListarMantenimientoVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarMantenimientoVehicularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMantenimientoVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

