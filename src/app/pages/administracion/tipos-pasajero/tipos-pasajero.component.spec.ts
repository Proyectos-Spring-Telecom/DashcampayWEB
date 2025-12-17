import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPasajeroComponent } from './tipos-pasajero.component';

describe('TiposPasajeroComponent', () => {
  let component: TiposPasajeroComponent;
  let fixture: ComponentFixture<TiposPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPasajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
