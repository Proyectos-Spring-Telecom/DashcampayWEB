import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOperadorComponent } from './agregar-operador.component';

describe('AgregarOperadorComponent', () => {
  let component: AgregarOperadorComponent;
  let fixture: ComponentFixture<AgregarOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOperadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
