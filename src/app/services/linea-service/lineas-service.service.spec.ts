import { TestBed } from '@angular/core/testing';

import { LineasServiceService } from './lineas-service.service';

describe('LineasServiceService', () => {
  let service: LineasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
