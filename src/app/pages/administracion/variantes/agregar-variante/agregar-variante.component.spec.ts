import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVarianteComponent } from './agregar-variante.component';

describe('AgregarVarianteComponent', () => {
  let component: AgregarVarianteComponent;
  let fixture: ComponentFixture<AgregarVarianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarVarianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarVarianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
