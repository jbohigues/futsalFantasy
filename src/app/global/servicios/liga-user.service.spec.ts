import { TestBed } from '@angular/core/testing';

import { LigaUserService } from './liga-user.service';

describe('LigaUserService', () => {
  let service: LigaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
