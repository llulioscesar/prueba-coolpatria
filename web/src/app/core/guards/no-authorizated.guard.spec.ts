import { TestBed, async, inject } from '@angular/core/testing';

import { NoAuthorizatedGuard } from './no-authorizated.guard';

describe('NoAuthorizatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAuthorizatedGuard]
    });
  });

  it('should ...', inject([NoAuthorizatedGuard], (guard: NoAuthorizatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
