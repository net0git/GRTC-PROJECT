import { TestBed } from '@angular/core/testing';

import { EmpresaServicioService } from './empresa-servicio.service';

describe('EmpresaServicioService', () => {
  let service: EmpresaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
