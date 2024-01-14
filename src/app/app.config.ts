import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ArtistState } from './store/artist/artist.state';
import { HomeState } from './store/home/home.state';
import { LayoutState } from './store/layout/layout.model';
import { UserState } from './store/user/user.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([LayoutState, UserState, HomeState, ArtistState]),
    ),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ],
};
