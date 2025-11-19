import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMantenimientoCombustibleComponent } from './listar-mantenimiento-combustible.component';

describe('ListarMantenimientoCombustibleComponent', () => {
  let component: ListarMantenimientoCombustibleComponent;
  let fixture: ComponentFixture<ListarMantenimientoCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarMantenimientoCombustibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMantenimientoCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

