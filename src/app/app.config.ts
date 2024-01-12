import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HomeState } from './store/home/home.state';
import { LayoutState } from './store/layout/layout.model';
import { UserState } from './store/user/user.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([LayoutState, UserState, HomeState]),
    ),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ],
};
