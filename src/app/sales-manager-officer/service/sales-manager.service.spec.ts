import { TestBed } from '@angular/core/testing';
import { SalesManagerService } from './sales-manager.service';

describe('SalesRelationService', () => {
  let service: SalesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
