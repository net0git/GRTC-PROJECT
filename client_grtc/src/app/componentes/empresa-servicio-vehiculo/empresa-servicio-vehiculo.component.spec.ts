import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioVehiculoComponent } from './empresa-servicio-vehiculo.component';

describe('EmpresaServicioVehiculoComponent', () => {
  let component: EmpresaServicioVehiculoComponent;
  let fixture: ComponentFixture<EmpresaServicioVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioVehiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
