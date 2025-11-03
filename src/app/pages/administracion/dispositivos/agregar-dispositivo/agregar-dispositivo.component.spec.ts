import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDispositivoComponent } from './agregar-dispositivo.component';

describe('AgregarDispositivoComponent', () => {
  let component: AgregarDispositivoComponent;
  let fixture: ComponentFixture<AgregarDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
