import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContadoraComponent } from './lista-contadora.component';

describe('ListaContadoraComponent', () => {
  let component: ListaContadoraComponent;
  let fixture: ComponentFixture<ListaContadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaContadoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaContadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
