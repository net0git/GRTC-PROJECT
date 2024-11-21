import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioResolucionFormComponent } from './empresa-servicio-resolucion-form.component';

describe('EmpresaServicioResolucionFormComponent', () => {
  let component: EmpresaServicioResolucionFormComponent;
  let fixture: ComponentFixture<EmpresaServicioResolucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioResolucionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioResolucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
