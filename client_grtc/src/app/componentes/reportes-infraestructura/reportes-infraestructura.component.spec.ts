import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesInfraestructuraComponent } from './reportes-infraestructura.component';

describe('ReportesInfraestructuraComponent', () => {
  let component: ReportesInfraestructuraComponent;
  let fixture: ComponentFixture<ReportesInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesInfraestructuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
