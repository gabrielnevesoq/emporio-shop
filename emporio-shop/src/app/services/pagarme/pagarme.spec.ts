import { TestBed } from '@angular/core/testing';

import { Pagarme } from './pagarme';

describe('Pagarme', () => {
  let service: Pagarme;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pagarme);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
