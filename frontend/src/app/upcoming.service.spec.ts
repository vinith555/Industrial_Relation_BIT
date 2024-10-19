import { TestBed } from '@angular/core/testing';

import { UpcomingService } from './upcoming.service';

describe('UpcomingService', () => {
  let service: UpcomingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
