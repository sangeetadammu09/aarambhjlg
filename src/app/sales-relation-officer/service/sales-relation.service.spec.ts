import { TestBed } from '@angular/core/testing';

import { SalesRelationService } from './sales-relation.service';

describe('SalesRelationService', () => {
  let service: SalesRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
