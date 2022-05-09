import { TestBed } from '@angular/core/testing';

import { EquiposRealesService } from './equipos-reales.service';

describe('EquiposRealesService', () => {
  let service: EquiposRealesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquiposRealesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
