import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
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
    const ids = this.localStorage.getItem('favoriteArtistsIds')! ?? [];
    const parsedIds = JSON.parse(ids);
    debugger;

    if (!parsedIds.length) {
      this.localStorage.setItem('favoriteArtistsIds', JSON.stringify([]));
    }
  }

  hideMenuByUrl() {
    this.isLoginRoute$ = this.#router.events.pipe(
      filter((router) => router instanceof NavigationEnd),
      map((router: unknown) => {
        let routers = router as NavigationEnd;
        const paths = ['/auth', '/not-found'];

        return !paths.includes(routers.url);
      })
    );
  }
}
