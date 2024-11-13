import { TestBed } from '@angular/core/testing';

import { CategoriaMensualService } from './categoria-mensual.service';

describe('CategoriaMensualService', () => {
  let service: CategoriaMensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaMensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
