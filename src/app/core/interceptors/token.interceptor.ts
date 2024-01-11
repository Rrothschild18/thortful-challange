import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/store/user/user.state';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);
  const localStorage: Storage = window.localStorage;
  const storeAccessToken = store.selectSnapshot(UserState).token;
  const localStorageAccessToken = localStorage.getItem('accessToken');

  if (storeAccessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${storeAccessToken}`,
      },
    });

    return next(req);
  }

  if (localStorageAccessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorageAccessToken}`,
      },
    });

    return next(req);
  }

  router.navigate(['/auth']);

  return next(req);
};
