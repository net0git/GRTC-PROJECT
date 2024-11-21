import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioFormComponent } from './empresa-servicio-form.component';

describe('EmpresaServicioFormComponent', () => {
  let component: EmpresaServicioFormComponent;
  let fixture: ComponentFixture<EmpresaServicioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
