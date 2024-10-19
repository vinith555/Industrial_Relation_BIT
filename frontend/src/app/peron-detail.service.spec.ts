import { TestBed } from '@angular/core/testing';

import { PeronDetailService } from './peron-detail.service';

describe('PeronDetailService', () => {
  let service: PeronDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeronDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
