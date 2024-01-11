import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Store } from '@ngxs/store';
import { catchError, concatMap, map, of } from 'rxjs';
import { User } from 'src/app/store/user/user.actions';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const store = inject(Store);
  const router = inject(Router);
  const localStorage: Storage = window.localStorage;
  const accessToken = localStorage.getItem('accessToken')!;
  const hasAccessTokenFromLocalStorage = !!accessToken;

  if (hasAccessTokenFromLocalStorage) {
    return authService.getUser(accessToken).pipe(
      concatMap((spotifyUser) =>
        store.dispatch(new User.SetMe({ user: spotifyUser, accessToken }))
      ),
      map(() => true),
      catchError((err: unknown) => {
        console.log({ err });
        router.navigate(['/auth']);
        return of(false);
      })
    );
  }

  if (!hasAccessTokenFromLocalStorage) {
    router.navigate(['/auth']);

    return false;
  }

  return false;
};
