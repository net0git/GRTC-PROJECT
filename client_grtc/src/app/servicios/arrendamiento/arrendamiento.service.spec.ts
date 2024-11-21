import { TestBed } from '@angular/core/testing';

import { ArrendamientoService } from './arrendamiento.service';

describe('ArrendamientoService', () => {
  let service: ArrendamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrendamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
