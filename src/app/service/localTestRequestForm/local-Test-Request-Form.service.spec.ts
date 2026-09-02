import { TestBed } from '@angular/core/testing';

import { LocalTestRequestFormService } from './local-Test-Request-Form.service';

describe('LocalShipmentFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalTestRequestFormService = TestBed.get(LocalTestRequestFormService);
    expect(service).toBeTruthy();
  });
});
