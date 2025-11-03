import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDocumentoClienteComponent } from './ver-documento-cliente.component';

describe('VerDocumentoClienteComponent', () => {
  let component: VerDocumentoClienteComponent;
  let fixture: ComponentFixture<VerDocumentoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDocumentoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDocumentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
