import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraDetalleComponent } from './infraestructura-detalle.component';

describe('InfraestructuraDetalleComponent', () => {
  let component: InfraestructuraDetalleComponent;
  let fixture: ComponentFixture<InfraestructuraDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
