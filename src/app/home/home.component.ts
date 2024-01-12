import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Artist } from '../shared/models/artist.model';
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
    MatGridListModule,
    RouterModule,
  ],
  template: `
    <section class="Home">
      <section class="container">
        <mat-chip-listbox aria-label="Genres selection" class="mt-10">
          @for (genre of genres$ | async; track genre) {
            <mat-chip-option color="accent">{{
              genre | titlecase
            }}</mat-chip-option>
          }
        </mat-chip-listbox>

        <h1>Favorite artists</h1>
        <div class="Scroll d-flex flex-nowrap mt-10">
          @if (artists$ | async; as artists) {
            @for (artist of artists; track artist.uri) {
              <a
                [routerLink]="[
                  '/home',
                  {
                    outlets: {
                      overview: ['artist-overview', { id: artist.id }]
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
                        >1.1 mi followers</small
                      >
                    </div>
                  </div>
                </div>
              </a>
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

        .Scroll {
          width: 1200px;
          overflow-x: scroll;
          height: 240px;

          // scroll bar style - poc
          /* width */
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
})
export class HomeComponent implements OnInit {
  readonly #store = inject(Store);

  @Select(HomeState.genres)
  genres$!: Observable<string[]>;

  @Select(HomeState.topArtists)
  artists$!: Observable<Artist[]>;

  ngOnInit(): void {
    this.#store.dispatch(new Home.FirstLoad());
  }

  selectCurrentArtist(id: string) {
    this.#store.dispatch(new Home.SetCurrentSelectedArtistId(id));
  }
}
