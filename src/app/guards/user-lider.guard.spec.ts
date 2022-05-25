import { TestBed } from '@angular/core/testing';

import { UserLiderGuard } from './user-lider.guard';

describe('UserLiderGuard', () => {
  let guard: UserLiderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLiderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
