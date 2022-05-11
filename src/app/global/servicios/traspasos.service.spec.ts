import { TestBed } from '@angular/core/testing';

import { TraspasosService } from './traspasos.service';

describe('TraspasosService', () => {
  let service: TraspasosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraspasosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
