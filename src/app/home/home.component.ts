import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { Artist } from '@models/artist.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Home } from '../store/home/home.actions';
import { HomeState } from '../store/home/home.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MatChipsModule, TitleCasePipe, RouterModule],
  template: `
    <section class="Home">
      <section class="container">
        <h1 class="my-10">Recommended artists</h1>
        <div class="Scroll d-flex flex-nowrap mt-10">
          @if (artists$ | async; as artists) {
            @for (artist of artists; track artist.uri) {
              <a
                class="text-decoration-none"
                [routerLink]="[
                  '/home',
                  {
                    outlets: {
                      overview: ['artist-overview', artist.id]
                    }
                  }
                ]"
                (click)="selectCurrentArtist(artist.id)"
              >
                <div class="Artist me-4">
                  <div class="content">
                    <img src="{{ artist.images[0].url }}" />

                    <div class="d-flex flex-column align-items-center">
                      <p class="text-white fw-bold m-0 mt-2">
                        {{ artist.name }}
                      </p>
                      <small class="text-gray fw-bold m-0"
                        >Popularity: {{ artist.popularity }}</small
                      >
                    </div>
                  </div>
                </div>
              </a>
            }
          }
        </div>

        <h1 class="my-10">Favorite artists</h1>
        <div class="Scroll d-flex flex-nowrap mt-10">
          @if (favoriteArtists$ | async; as favoriteArtists) {
            @for (favoriteArtist of favoriteArtists; track favoriteArtist.uri) {
              <a
                class="text-decoration-none"
                [routerLink]="[
                  '/home',
                  {
                    outlets: {
                      overview: ['artist-overview', favoriteArtist.id]
                    }
                  }
                ]"
                (click)="selectCurrentArtist(favoriteArtist.id)"
              >
                <div class="Artist me-4">
                  <div class="content">
                    <img src="{{ favoriteArtist.images[0].url }}" />

                    <div class="d-flex flex-column align-items-center">
                      <p class="text-white fw-bold m-0 mt-2">
                        {{ favoriteArtist.name }}
                      </p>
                      <small class="text-gray fw-bold m-0"
                        >Popularity: {{ favoriteArtist.popularity }}</small
                      >
                    </div>
                  </div>
                </div>
              </a>
            } @empty {
              <h4>No favorite artists</h4>
            }
          }
        </div>

        <h1 class="mt-10">Recomendations</h1>

        <mat-chip-listbox aria-label="Genres selection" class="mt-5">
          @for (genre of genres$ | async; track genre) {
            <mat-chip-option color="accent">{{
              genre | titlecase
            }}</mat-chip-option>
          }
        </mat-chip-listbox>
      </section>
    </section>
  `,
  styles: [
    `
      .Home {
        height: 2000px;
        mat-chip-option {
          height: 32px;
          min-width: 32px;
          border-radius: 16px;
          font-size: 14px;
          border-radius: 8px;
          height: 36px;
        }

        a {
          cursor: pointer;
        }

        .Scroll {
          width: 1200px;
          overflow-x: scroll;
          height: 270px;

          &::-webkit-scrollbar {
            width: 10px;
            background: transparent;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px #000;
            border-radius: 10px;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(97, 97, 97, 0.38);
          }
        }

        .Artist {
          height: 190px;
          width: 190px;

          p {
            font-size: 14px;
          }

          small {
            font-size: 12px;
          }

          img {
            height: 175px;
            width: 175px;
            border-radius: 50%;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly #store = inject(Store);

  @Select(HomeState.favoriteArtists)
  favoriteArtists$!: Observable<Artist[]>;

  @Select(HomeState.genres)
  genres$!: Observable<string[]>;

  @Select(HomeState.topArtists)
  artists$!: Observable<Artist[]>;

  ngOnInit(): void {
    this.#store.dispatch(new Home.FirstLoad());
    this.#store.select(HomeState).subscribe((v) => {
      v;
    });
  }

  selectCurrentArtist(id: string) {
    this.#store.dispatch(new Home.SetCurrentSelectedArtistId(id));
  }
}
