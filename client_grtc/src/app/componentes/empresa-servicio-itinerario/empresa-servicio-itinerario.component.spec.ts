import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioItinerarioComponent } from './empresa-servicio-itinerario.component';

describe('EmpresaServicioItinerarioComponent', () => {
  let component: EmpresaServicioItinerarioComponent;
  let fixture: ComponentFixture<EmpresaServicioItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaServicioItinerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
