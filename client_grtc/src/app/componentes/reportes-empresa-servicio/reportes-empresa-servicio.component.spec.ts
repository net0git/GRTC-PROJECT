import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEmpresaServicioComponent } from './reportes-empresa-servicio.component';

describe('ReportesEmpresaServicioComponent', () => {
  let component: ReportesEmpresaServicioComponent;
  let fixture: ComponentFixture<ReportesEmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEmpresaServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
