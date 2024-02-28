import { TestBed } from '@angular/core/testing';

import { PurchasingManagementService } from './purchasing-management.service';

describe('PurchasingManagementService', () => {
  let service: PurchasingManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasingManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
