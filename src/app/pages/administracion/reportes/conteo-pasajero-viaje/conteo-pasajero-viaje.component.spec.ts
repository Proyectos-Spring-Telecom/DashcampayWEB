import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoPasajeroViajeComponent } from './conteo-pasajero-viaje.component';

describe('ConteoPasajeroViajeComponent', () => {
  let component: ConteoPasajeroViajeComponent;
  let fixture: ComponentFixture<ConteoPasajeroViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoPasajeroViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConteoPasajeroViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
