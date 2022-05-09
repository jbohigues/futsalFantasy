import { TestBed } from '@angular/core/testing';

import { JugadoresRealesService } from './jugadores-reales.service';

describe('JugadoresRealesService', () => {
  let service: JugadoresRealesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadoresRealesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
