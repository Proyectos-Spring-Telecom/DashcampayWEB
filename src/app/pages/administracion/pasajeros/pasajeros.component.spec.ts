import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosComponent } from './pasajeros.component';

describe('PasajerosComponent', () => {
  let component: PasajerosComponent;
  let fixture: ComponentFixture<PasajerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasajerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasajerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
