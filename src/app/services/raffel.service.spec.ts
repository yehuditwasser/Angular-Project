import { TestBed } from '@angular/core/testing';

import { RaffelService } from './raffel.service';

describe('RaffelService', () => {
  let service: RaffelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaffelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
