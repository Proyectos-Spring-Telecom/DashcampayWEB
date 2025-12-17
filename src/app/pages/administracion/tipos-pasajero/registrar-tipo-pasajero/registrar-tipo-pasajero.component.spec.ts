import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoPasajeroComponent } from './registrar-tipo-pasajero.component';

describe('RegistrarTipoPasajeroComponent', () => {
  let component: RegistrarTipoPasajeroComponent;
  let fixture: ComponentFixture<RegistrarTipoPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTipoPasajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarTipoPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
