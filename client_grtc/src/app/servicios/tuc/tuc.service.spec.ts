import { TestBed } from '@angular/core/testing';

import { TucService } from './tuc.service';

describe('TucService', () => {
  let service: TucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
