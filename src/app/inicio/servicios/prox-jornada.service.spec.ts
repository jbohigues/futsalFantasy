import { TestBed } from '@angular/core/testing';

import { ProxJornadaService } from './prox-jornada.service';

describe('ProxJornadaService', () => {
  let service: ProxJornadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxJornadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
