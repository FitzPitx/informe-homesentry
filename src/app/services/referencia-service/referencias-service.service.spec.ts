import { TestBed } from '@angular/core/testing';

import { ReferenciasServiceService } from './referencias-service.service';

describe('ReferenciasServiceService', () => {
  let service: ReferenciasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenciasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
