import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraResolucionFormComponent } from './infraestructura-resolucion-form.component';

describe('InfraestructuraResolucionFormComponent', () => {
  let component: InfraestructuraResolucionFormComponent;
  let fixture: ComponentFixture<InfraestructuraResolucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraResolucionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraResolucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
