import { TestBed } from '@angular/core/testing';

import { OrderInstalmentService } from './order-instalment.service';

describe('OrderInstalmentService', () => {
  let service: OrderInstalmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderInstalmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
