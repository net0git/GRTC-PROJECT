import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraCertificadoFormComponent } from './infraestructura-certificado-form.component';

describe('InfraestructuraCertificadoFormComponent', () => {
  let component: InfraestructuraCertificadoFormComponent;
  let fixture: ComponentFixture<InfraestructuraCertificadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraCertificadoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraCertificadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
