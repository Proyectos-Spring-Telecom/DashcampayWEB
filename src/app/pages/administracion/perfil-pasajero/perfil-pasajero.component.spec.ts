import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPasajeroComponent } from './perfil-pasajero.component';

describe('PerfilPasajeroComponent', () => {
  let component: PerfilPasajeroComponent;
  let fixture: ComponentFixture<PerfilPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPasajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
