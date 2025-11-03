import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarContadoraComponent } from './agregar-contadora.component';

describe('AgregarContadoraComponent', () => {
  let component: AgregarContadoraComponent;
  let fixture: ComponentFixture<AgregarContadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarContadoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarContadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
