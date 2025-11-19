import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMantenimientoCombustibleComponent } from './registrar-mantenimiento-combustible.component';

describe('RegistrarMantenimientoCombustibleComponent', () => {
  let component: RegistrarMantenimientoCombustibleComponent;
  let fixture: ComponentFixture<RegistrarMantenimientoCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMantenimientoCombustibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMantenimientoCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

