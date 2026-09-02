import { TestBed } from '@angular/core/testing';

import { SyncTestRequestsService } from './sync-test-requests.service';

describe('SyncTestRequestsService', () => {
  let service: SyncTestRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncTestRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
