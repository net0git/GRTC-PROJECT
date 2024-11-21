import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEmpresasEstadoComponent } from './reportes-empresas-estado.component';

describe('ReportesEmpresasEstadoComponent', () => {
  let component: ReportesEmpresasEstadoComponent;
  let fixture: ComponentFixture<ReportesEmpresasEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEmpresasEstadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEmpresasEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
