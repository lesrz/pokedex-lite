import { TestBed } from '@angular/core/testing';

import { LoginActivate } from './loginactivate.guard';

describe('LoginActivate', () => {
  let guard: LoginActivate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginActivate);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
