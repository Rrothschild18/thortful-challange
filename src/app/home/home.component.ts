import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { Artist } from '@models/artist.model';
import { Track } from '@models/index';
import { Select, Store } from '@ngxs/store';
import { ArtistService } from '@services/index';
import { RecommendationsService } from '@services/recommendations.service';
import {
  Observable,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Home } from '../store/home/home.actions';
import { HomeState } from '../store/home/home.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatChipsModule,
    TitleCasePipe,
    RouterModule,
    MatRippleModule,
    MatDividerModule,
  ],
  template: `
    <section class="Home">
      <section class="container">
        <section class="my-6">
          <h1 class="mb-6 fs-500">Recommended artists</h1>

          @if ((selectedGenres$ | async) || []; as selectedGenres) {
            <mat-chip-listbox
              aria-label="Genres selection"
              class="mt-5"
              [multiple]="true"
            >
              @for (genre of genres$ | async; track genre) {
                <mat-chip-option
                  color="accent"
                  [selected]="selectedGenres.includes(genre)"
                  (selectionChange)="onSelectGenre($event, genre)"
                  >{{ genre | titlecase }}</mat-chip-option
                >
              }
            </mat-chip-listbox>
          }

          <div class="d-flex my-10">
            @defer (when recommendedArtists$ | async) {
              <!-- <h1> -->
              @if (recommendedArtists$ | async; as recommendedArtists) {
                @for (
                  recommendedArtist of recommendedArtists;
                  track recommendedArtist.id
                ) {
                  <a
                    class="text-decoration-none"
                    [routerLink]="[
                      '/home',
                      {
                        outlets: {
                          overview: ['artist-overview', recommendedArtist.id]
                        }
                      }
                    ]"
                    (click)="selectCurrentArtist(recommendedArtist.id)"
                  >
                    <div class="Artist me-4">
                      <div class="content">
                        @if (recommendedArtist.images) {
                          <img src="{{ recommendedArtist.images[0].url }}" />
                        }

                        <div class="d-flex flex-column align-items-center">
                          <p class="text-white fw-bold m-0 mt-2">
                            {{ recommendedArtist.name }}
                          </p>
                          <small class="text-gray fw-bold m-0"
                            >Popularity:
                            {{ recommendedArtist.popularity }}</small
                          >
                        </div>
                      </div>
                    </div>
                  </a>
                }
              }
            } @placeholder {
              <p>Loading</p>
            } @loading {
              <p>Loading</p>
            }
          </div>
        </section>

        <h1 class="mb-6 fs-500">All time artists</h1>
        <div class="Scroll d-flex flex-nowrap my-10">
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

        <h1 class="mb-6 fs-500">Favorite artists</h1>
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
      </section>
    </section>
  `,
  styles: [
    `
      .Home {
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

        .fs-500 {
          font-weight: 500;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #recommendationService = inject(RecommendationsService);
  readonly #artistService = inject(ArtistService);

  @Select(HomeState.favoriteArtists)
  favoriteArtists$!: Observable<Artist[]>;

  @Select(HomeState.genres)
  genres$!: Observable<string[]>;

  @Select(HomeState.topArtists)
  artists$!: Observable<Artist[]>;

  @Select(HomeState.selectedGenres)
  selectedGenres$!: Observable<string[]>;

  @Select(HomeState.favoriteArtistsIds)
  favoriteArtistsIds$!: Observable<string[]>;

  recommendedArtists$!: Observable<Artist[]>;

  ngOnInit(): void {
    this.#store.dispatch(new Home.FirstLoad());
    this.recommendedArtists$ = this.selectedGenres$.pipe(
      withLatestFrom(this.favoriteArtistsIds$),
      switchMap(([genres, artistsIds]) => {
        console.log({ genres, artistsIds });

        return this.#recommendationService.artistsRecommendations(
          genres,
          artistsIds,
        );
      }),
      map((response) => {
        const artistsIds = response.tracks.reduce(
          (acc: string[], curr: Track) => [
            ...acc,
            ...curr.artists.map((artist: Artist) => artist.id),
          ],
          [],
        );

        return artistsIds.slice(0, 6);
      }),
      tap((v) => {
        debugger;
      }),
      switchMap((ids) =>
        this.#artistService
          .getSeveralArtists(ids)
          .pipe(map((response) => response.artists)),
      ),
      shareReplay(),
    );
  }

  selectCurrentArtist(id: string) {
    this.#store.dispatch(new Home.SetCurrentSelectedArtistId(id));
  }

  onSelectGenre(event: MatChipSelectionChange, genre: string) {
    const isSelected = event.selected;

    if (isSelected) {
      this.#store.dispatch(new Home.SelectGenre(genre));

      return;
    }

    if (!isSelected) {
      this.#store.dispatch(new Home.UnselectGenre(genre));
      return;
    }

    return;
  }
}
