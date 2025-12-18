import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTallerComponent } from './registrar-taller.component';

describe('RegistrarTallerComponent', () => {
  let component: RegistrarTallerComponent;
  let fixture: ComponentFixture<RegistrarTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTallerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
