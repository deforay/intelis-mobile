import { TestBed } from '@angular/core/testing';

import { CrudOperationsService } from './crud-operations.service';

describe('CrudOperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudOperationsService = TestBed.get(CrudOperationsService);
    expect(service).toBeTruthy();
  });
});
