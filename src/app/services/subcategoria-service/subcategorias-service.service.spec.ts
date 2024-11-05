import { TestBed } from '@angular/core/testing';

import { SubcategoriasServiceService } from './subcategorias-service.service';

describe('SubcategoriasServiceService', () => {
  let service: SubcategoriasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
