import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CoreModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'thortful-challange';
  localStorage: Storage = window.localStorage;

  #router = inject(Router);
  isLoginRoute$!: Observable<boolean>;

  constructor() {
    this.hideMenuByUrl();
  }

  ngOnInit(): void {
    const localStorageData = this.localStorage.getItem('favoriteArtistsIds');
    const parsedIds = JSON.parse(localStorageData!)?.favoriteArtistsIds ?? [];

    if (!parsedIds.length) {
      const idsToAdd = JSON.stringify({ favoriteArtistsIds: [] });
      this.localStorage.setItem('favoriteArtistsIds', idsToAdd);
    }
  }

  hideMenuByUrl() {
    this.isLoginRoute$ = this.#router.events.pipe(
      // filter((router) => router instanceof NavigationEnd),
      map((router: unknown) => {
        let routers = router as NavigationEnd;
        const paths = ['/', '/auth', '/not-found'];
        debugger;
        console.log({
          routers,
          isLoginRoute: !paths.includes(routers.url),
        });
        return !paths.includes(routers.url);
      }),
    );
  }
}
