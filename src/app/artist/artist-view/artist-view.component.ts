import { AsyncPipe, DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Album, Artist as IArtist, Track } from '@models/index';
import { Select, Store } from '@ngxs/store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  concatMap,
  filter,
  map,
  tap,
} from 'rxjs';
import { Artist } from 'src/app/store/artist/artist.actions';
import { FollowersCounterPipe } from './../../shared/pipes/followers-counter.pipe';
import { ArtistState } from './../../store/artist/artist.state';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-artist-view',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatIconModule,
    MatButtonModule,
    FollowersCounterPipe,
    TitleCasePipe,
    MatListModule,
    MatDividerModule,
    DatePipe,
    RouterLink,
  ],
  template: `
    <section class="ArtistView">
      <!-- {{ artistId$ | async }}
      {{ albums$ | async }}
      {{ artists$ | async }}
 -->
      @if (artist$ | async; as artist) {
        <section class="Banner">
          <div
            class="background-img"
            [style.background-image]="'url(' + artist.images[0]?.url + ')'"
          ></div>
          <div class="container content">
            <h1 class="m-0">
              {{ artist.name }}
            </h1>
            <p class="text-white m-0 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores corrupti rem, provident impedit nesciunt itaque
              mollitia similique eveniet optio nihil repellendus fuga architecto
              tempore recusandae voluptatibus aut quasi eos suscipit!
            </p>
            <div class="action-buttons mt-4">
              <button class="white me-2" mat-flat-button color="accent">
                <p>Shuffle</p>
                <mat-icon> shuffle </mat-icon>
              </button>
              <button class="white me-3" mat-flat-button color="accent">
                <p>Radio</p>
                <mat-icon> stream </mat-icon>
              </button>
              <button class="white followers" mat-stroked-button color="warn">
                <small
                  >Follow {{ artist.followers.total | followersCounter }}</small
                >
              </button>
            </div>
          </div>
        </section>
      }

      <section class="TopTracks my-10">
        <div class="container">
          <h1>Songs</h1>

          <mat-list role="list">
            @for (track of tracks$ | async; track track.id) {
              <mat-list-item role="listitem" class="py-1 w-100">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center spacing">
                    <img
                      class="track-cover me-2 "
                      [src]="track.album.images[0].url"
                    />
                    <p class="m-0">
                      {{ track.name }}
                    </p>
                  </div>

                  <div class="spacing text-center">
                    {{ artistName$ | async }}
                  </div>

                  <div class="spacing text-end">
                    {{ track.album.name }}
                  </div>
                </div>
              </mat-list-item>
              <mat-divider class="w-100"> </mat-divider>
            }
          </mat-list>
        </div>
      </section>

      <section class="Albums container my-10">
        <h1>Albums</h1>

        <div class="Scroll d-flex no-wrap">
          @for (album of albums$ | async; track album.id) {
            <div class="d-flex flex-column album-content me-6">
              <img class="album-cover" [src]="album.images[0].url" />
              <div>
                <p class="m-0 album-title mt-2">{{ album.name }}</p>
                <div class="d-flex">
                  <p class="m-0 text-grey me-1">
                    {{ album.album_type | titlecase }} •
                  </p>
                  <p class="m-0 text-grey">
                    {{ album.release_date | date: 'yyyy' }}
                  </p>
                </div>
              </div>
            </div>
          } @empty {
            <p>No albums</p>
          }
        </div>
      </section>

      <section class="Related container my-10">
        <h1>Related Artists</h1>

        <div class="Scroll d-flex no-wrap">
          @for (
            relatedArtist of relatedArtists$ | async;
            track relatedArtist.id
          ) {
            <a [routerLink]="['/artist', relatedArtist.id]">
              <div
                class="d-flex flex-column artist-content me-6 align-items-center"
              >
                <img
                  class="artist-cover"
                  src="{{ relatedArtist.images[0].url }}"
                />
                <div>
                  <p class="m-0 title text-center mt-2">
                    {{ relatedArtist.name }}
                  </p>
                  <p class="m-0 text-grey">
                    {{ relatedArtist.followers.total | followersCounter }}
                    followers
                  </p>
                </div>
              </div>
            </a>
          } @empty {
            <p>No related artists</p>
          }
        </div>
      </section>
    </section>
  `,
  styles: [
    `
      .ArtistView {
        .content {
          margin-top: -230px;
          z-index: 999;
          display: block;
          position: relative;

          h1 {
            font-size: 42px;
          }

          .action-buttons {
            .white {
              border-radius: 30px;
              height: 36px;
              font-size: 16px;
              width: 110px;
            }
            p {
              height: 17px;
              margin: 0;
              font-size: 12px;
            }

            .followers {
              width: 150px;
              border: 1px solid #ff4e45;
              color: #ff4e45;

              small {
                font-size: 14px;
                height: 24px;
              }
            }
          }
        }

        .Banner {
          .background-img {
            &::before {
              content: '';
              position: absolute;
              background: linear-gradient(
                0deg,
                rgb(0, 0, 0) 0%,
                rgb(255 255 255 / 0%) 100%
              );
              width: 100%;
              height: 701px;
            }

            width: 100%;
            height: 700px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            -webkit-mask: linear-gradient(#000, #0000);
            mask: linear-gradient(#000, #0000);
          }
        }

        .TopTracks {
          mat-divider {
            color: red;
          }
          .track-cover {
            width: 32px;
            height: 32px;
          }
        }

        .spacing {
          width: 350px;
          p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: block;
          }
        }

        .Albums {
          .album-content {
            width: 230px;
            height: 100%;

            .album-cover {
              width: 226px;
              height: 226px;
              border-radius: 4px;
            }
            .album-title {
              font-weight: 500;
            }
          }
        }

        .Scroll {
          max-width: 1200px;
          overflow-x: scroll;
          height: 100%;

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

        .Related {
          .artist-content {
            height: 100%;

            .artist-cover {
              width: 226px;
              height: 226px;
              border-radius: 50%;
            }

            .title {
              font-weight: 500;
            }
          }
        }

        a {
          text-decoration: none;
          color: unset;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistViewComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #subSink = new Subscription();
  artistId$ = new BehaviorSubject<string>('');

  @Select(ArtistState.artist)
  artist$!: Observable<IArtist>;

  @Select(ArtistState.albums)
  albums$!: Observable<Album[]>;

  @Select(ArtistState.topRelated)
  relatedArtists$!: Observable<IArtist[]>;

  @Select(ArtistState.topTracks)
  tracks$!: Observable<Track[]>;

  @Select(ArtistState.artistName)
  artistName$!: Observable<string>;

  @Input()
  set id(artistId: string) {
    this.artistId$.next(artistId);
  }

  firstLoad$!: Observable<string>;

  ngOnInit(): void {
    this.firstLoad();
  }

  ngOnDestroy(): void {
    this.#subSink.unsubscribe();
  }

  firstLoad() {
    this.firstLoad$ = this.artistId$.asObservable().pipe(
      filter((id) => !!id.length),
      map((id) => id),
    );

    //https://angular.io/api/core/rxjs-interop/takeUntilDestroyed PREVIEW
    const firstLoadSubscription = this.firstLoad$
      .pipe(
        concatMap((id) => this.#store.dispatch(new Artist.SetArtistViewId(id))),
        tap(() => {
          this.#store.dispatch(new Artist.FirstLoadSingle());
        }),
      )
      .subscribe();

    this.#subSink.add(firstLoadSubscription);
  }
}
