import { TestBed } from '@angular/core/testing';

import { PuntosLigaService } from './puntos-liga.service';

describe('PuntosLigaService', () => {
  let service: PuntosLigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntosLigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
