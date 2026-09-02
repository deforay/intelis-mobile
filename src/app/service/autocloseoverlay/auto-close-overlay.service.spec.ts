import { TestBed } from '@angular/core/testing';

import { AutoCloseOverlayService } from './auto-close-overlay.service';

describe('AutoCloseOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoCloseOverlayService = TestBed.get(AutoCloseOverlayService);
    expect(service).toBeTruthy();
  });
});
