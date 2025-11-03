import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInstalacionComponent } from './agregar-instalacion.component';

describe('AgregarInstalacionComponent', () => {
  let component: AgregarInstalacionComponent;
  let fixture: ComponentFixture<AgregarInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarInstalacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
