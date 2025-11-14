import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMantenimientoKilometrajeComponent } from './registrar-mantenimiento-kilometraje.component';

describe('RegistrarMantenimientoKilometrajeComponent', () => {
  let component: RegistrarMantenimientoKilometrajeComponent;
  let fixture: ComponentFixture<RegistrarMantenimientoKilometrajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMantenimientoKilometrajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMantenimientoKilometrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

