import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesVehiculosPorRutaComponent } from './reportes-vehiculos-por-ruta.component';

describe('ReportesVehiculosPorRutaComponent', () => {
  let component: ReportesVehiculosPorRutaComponent;
  let fixture: ComponentFixture<ReportesVehiculosPorRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesVehiculosPorRutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesVehiculosPorRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
