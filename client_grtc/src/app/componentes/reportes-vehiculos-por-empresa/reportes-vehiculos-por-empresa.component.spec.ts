import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesVehiculosPorEmpresaComponent } from './reportes-vehiculos-por-empresa.component';

describe('ReportesVehiculosPorEmpresaComponent', () => {
  let component: ReportesVehiculosPorEmpresaComponent;
  let fixture: ComponentFixture<ReportesVehiculosPorEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesVehiculosPorEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesVehiculosPorEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
