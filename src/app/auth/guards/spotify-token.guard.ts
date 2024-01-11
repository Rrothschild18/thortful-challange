import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';

export const spotifyTokenGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const hasTokensFragmentsAtURL = !!route.fragment;
  const hasAccessTokenFromLocalStorage = !!localStorage.getItem('accessToken');

  if (hasTokensFragmentsAtURL || hasAccessTokenFromLocalStorage) {
    const [_, spotifyToken] = route?.fragment?.split('=')!;
    const accessToken = spotifyToken.split('&')[0];

    localStorage.setItem('accessToken', accessToken);
    router.navigate(['/home']);

    return true;
  }

  if (!hasTokensFragmentsAtURL) {
    router.navigate(['/auth']);

    return false;
  }

  return false;
};
