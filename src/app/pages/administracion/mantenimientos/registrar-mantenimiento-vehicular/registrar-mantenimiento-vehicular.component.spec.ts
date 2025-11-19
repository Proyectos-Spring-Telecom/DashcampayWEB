import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMantenimientoVehicularComponent } from './registrar-mantenimiento-vehicular.component';

describe('RegistrarMantenimientoVehicularComponent', () => {
  let component: RegistrarMantenimientoVehicularComponent;
  let fixture: ComponentFixture<RegistrarMantenimientoVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMantenimientoVehicularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMantenimientoVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

