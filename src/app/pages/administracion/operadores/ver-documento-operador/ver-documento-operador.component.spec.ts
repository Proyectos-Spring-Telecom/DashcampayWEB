import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDocumentoOperadorComponent } from './ver-documento-operador.component';

describe('VerDocumentoOperadorComponent', () => {
  let component: VerDocumentoOperadorComponent;
  let fixture: ComponentFixture<VerDocumentoOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDocumentoOperadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDocumentoOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
