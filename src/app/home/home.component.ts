import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, catchError, map, of } from 'rxjs';
import { TopItemsList } from '../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { Genres } from './services/genres.model';
import { GenresService } from './services/genres.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatChipsModule,
    TitleCasePipe,
    MatGridListModule,
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
          @if (topItems$ | async; as topItems) {
            @for (artist of topItems.items; track artist.uri) {
              <div class="Artist me-4">
                <div class="content">
                  <img src="{{ artist.images[0].url }}" />

                  <div class="d-flex flex-column align-items-center">
                    <p class="text-white fw-bold m-0 mt-2">{{ artist.name }}</p>
                    <small class="text-gray fw-bold m-0"
                      >1.1 mi followers</small
                    >
                  </div>
                </div>
              </div>
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
  private genresService = inject(GenresService);
  private userService = inject(UserService);

  genres$!: Observable<string[]>;
  topItems$!: Observable<TopItemsList>;

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchUserTopItems();
  }

  fetchGenres() {
    this.genres$ = this.genresService.getGenres().pipe(
      map(
        ({ genres }: { genres: Genres[] }) =>
          genres.slice(0, 11) as unknown as string[], //TitleCasePipe only accepts strings inputs
      ),
      catchError((err) => {
        console.log({ err });
        if (err.status === HttpStatusCode.TooManyRequests)
          //Remove
          return of([
            'acoustic',
            'afrobeat',
            'alt-rock',
            'alternative',
            'ambient',
            'anime',
            'black-metal',
            'bluegrass',
            'blues',
            'bossanova',
            'brazil',
          ]);

        return of([]);
      }),
    );
  }

  fetchUserTopItems() {
    this.topItems$ = this.userService.getUserTopItems({
      limit: 10,
      offset: 5,
      type: 'artist',
      time_range: 'medium_term',
    });
  }
}
