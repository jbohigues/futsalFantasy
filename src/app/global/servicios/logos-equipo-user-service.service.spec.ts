import { TestBed } from '@angular/core/testing';

import { LogosEquipoUserServiceService } from './logos-equipo-user-service.service';

describe('LogosEquipoUserServiceService', () => {
  let service: LogosEquipoUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogosEquipoUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
