import { TestBed } from '@angular/core/testing';

import { HistorialvehicularService } from './historialvehicular.service';

describe('HistorialvehicularService', () => {
  let service: HistorialvehicularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialvehicularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
