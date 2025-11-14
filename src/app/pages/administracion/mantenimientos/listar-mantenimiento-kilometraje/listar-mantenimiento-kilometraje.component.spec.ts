import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMantenimientoKilometrajeComponent } from './listar-mantenimiento-kilometraje.component';

describe('ListarMantenimientoKilometrajeComponent', () => {
  let component: ListarMantenimientoKilometrajeComponent;
  let fixture: ComponentFixture<ListarMantenimientoKilometrajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarMantenimientoKilometrajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMantenimientoKilometrajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

