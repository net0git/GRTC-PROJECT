import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesConductoresComponent } from './reportes-conductores.component';

describe('ReportesConductoresComponent', () => {
  let component: ReportesConductoresComponent;
  let fixture: ComponentFixture<ReportesConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesConductoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
