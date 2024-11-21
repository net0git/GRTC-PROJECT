import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEmpresasPorRutaComponent } from './reportes-empresas-por-ruta.component';

describe('ReportesEmpresasPorRutaComponent', () => {
  let component: ReportesEmpresasPorRutaComponent;
  let fixture: ComponentFixture<ReportesEmpresasPorRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEmpresasPorRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEmpresasPorRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
