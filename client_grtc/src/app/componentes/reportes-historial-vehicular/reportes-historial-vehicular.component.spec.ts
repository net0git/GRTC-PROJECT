import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesHistorialVehicularComponent } from './reportes-historial-vehicular.component';

describe('ReportesHistorialVehicularComponent', () => {
  let component: ReportesHistorialVehicularComponent;
  let fixture: ComponentFixture<ReportesHistorialVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesHistorialVehicularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesHistorialVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
