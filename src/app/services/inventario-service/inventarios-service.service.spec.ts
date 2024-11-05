import { TestBed } from '@angular/core/testing';

import { InventariosServiceService } from './inventarios-service.service';

describe('InventariosServiceService', () => {
  let service: InventariosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventariosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
