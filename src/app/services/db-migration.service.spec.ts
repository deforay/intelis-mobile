import { TestBed } from '@angular/core/testing';

import { DbMigrationService } from './db-migration.service';

describe('DbMigrationService', () => {
  let service: DbMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbMigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
