import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioFormPrincipalComponent } from './empresa-servicio-form-principal.component';

describe('EmpresaServicioFormPrincipalComponent', () => {
  let component: EmpresaServicioFormPrincipalComponent;
  let fixture: ComponentFixture<EmpresaServicioFormPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioFormPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioFormPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
