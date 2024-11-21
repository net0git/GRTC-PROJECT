import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioArrendamientoComponent } from './empresa-servicio-arrendamiento.component';

describe('EmpresaServicioArrendamientoComponent', () => {
  let component: EmpresaServicioArrendamientoComponent;
  let fixture: ComponentFixture<EmpresaServicioArrendamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioArrendamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioArrendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
