import { TestBed } from '@angular/core/testing';

import { MarcaModeloService } from './marca-modelo.service';

describe('MarcaModeloService', () => {
  let service: MarcaModeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaModeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
