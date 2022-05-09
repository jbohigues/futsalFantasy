import { TestBed } from '@angular/core/testing';

import { EquiposUserService } from './equipos-user.service';

describe('EquiposUserService', () => {
  let service: EquiposUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquiposUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
