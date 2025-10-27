import { TestBed } from '@angular/core/testing';

import { Infinitepay } from './infinitepay';

describe('Infinitepay', () => {
  let service: Infinitepay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Infinitepay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
