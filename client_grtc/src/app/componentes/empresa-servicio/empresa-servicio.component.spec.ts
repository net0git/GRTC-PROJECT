import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioComponent } from './empresa-servicio.component';

describe('EmpresaServicioComponent', () => {
  let component: EmpresaServicioComponent;
  let fixture: ComponentFixture<EmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
