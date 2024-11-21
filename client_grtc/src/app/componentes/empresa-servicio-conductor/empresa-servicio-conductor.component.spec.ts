import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioConductorComponent } from './empresa-servicio-conductor.component';

describe('EmpresaServicioConductorComponent', () => {
  let component: EmpresaServicioConductorComponent;
  let fixture: ComponentFixture<EmpresaServicioConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioConductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
