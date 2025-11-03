import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaudacionDispositivoInstalacionComponent } from './recaudacion-dispositivo-instalacion.component';

describe('RecaudacionDispositivoInstalacionComponent', () => {
  let component: RecaudacionDispositivoInstalacionComponent;
  let fixture: ComponentFixture<RecaudacionDispositivoInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecaudacionDispositivoInstalacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecaudacionDispositivoInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
