import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaZonasComponent } from './lista-zonas.component';

describe('ListaZonasComponent', () => {
  let component: ListaZonasComponent;
  let fixture: ComponentFixture<ListaZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaZonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
