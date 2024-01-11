import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { spotifyTokenGuard } from './spotify-token.guard';

describe('spotifyTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => spotifyTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
