import { AsyncPipe, DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, concatMap, filter } from 'rxjs';
import { ArtistTopAlbumsList } from 'src/app/shared/models/albums.model';
import { Artist } from 'src/app/shared/models/artist.model';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-artist-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    SharedModule,
    MatChipsModule,
    TitleCasePipe,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  template: ` <!-- <> -->
    <section class="ArtistOverview">
      <div class="d-flex justify-content-end">
        <button
          mat-icon-button
          (click)="closeAuxiliaryRoute()"
          [routerLink]="['/home']"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="d-flex flex-column p-5">
        @if (artist$ | async; as artist) {
          <div class="Artist">
            <div
              class="content w-100 d-flex flex-column justify-content-center align-items-center w-100"
            >
              <img class="artist_photo" src="{{ artist.images[0].url }}" />

              <div class="d-flex flex-column align-items-center w-100">
                <p class="text-white fw-bold m-0 mt-2">
                  {{ artist.name }}
                </p>
                <small class="text-gray fw-bold m-0 ">
                  {{ artist.followers.total | followersCounter }}</small
                >

                <div class="mt-3 w-100">
                  <small class="fw-bold  d-block section-title mb-2"
                    >Genres</small
                  >
                  <div class="d-flex flex-wrap align-items-start">
                    @for (genre of artist.genres; track genre) {
                      <mat-chip-option
                        class="me-1 mb-1"
                        color="warn"
                        [selectable]="false"
                        >{{ genre | titlecase }}</mat-chip-option
                      >
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <div class="mt-3">
          <section class="Album">
            <small class="fw-bold d-block section-title mb-2">Top albums</small>
            <div class="row">
              @if (artistTopAlbums$ | async; as topAlbums) {
                @for (album of topAlbums.items; track album) {
                  <div class="col">
                    <div class=" album_cover_photo">
                      <img
                        class="album_cover_photo"
                        [src]="album.images[0].url"
                      />
                      <div class="mt-2">
                        <p class="text-white fw-bold m-0 album-title">
                          {{ album.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          </section>
        </div>

        <div class="d-flex justify-content-end mt-5">
          <div>
            <button
              mat-button
              class="d-flex align-items-center justify-content-center"
            >
              <mat-icon>arrow_forward</mat-icon>
              <p class="m-0 text-decoration-underline details">
                See full details
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>`,
  styles: [
    `
      .ArtistOverview {
        .section-title {
          font-size: 16px;
        }

        .details {
          height: 25px;
        }

        .Artist {
          p {
            font-size: 14px;
          }

          .artist_photo {
            height: 200px;
            width: 200px;
            border-radius: 50%;
          }

          mat-chip-option {
            height: 20px;
            min-width: 32px;
            border-radius: 4px;
            font-size: 12px;
            background-color: #f50000;
          }
        }

        .Album {
          .section-title {
            font-size: 16px;
          }

          .album_cover_photo {
            width: 110px;

            img {
              border-radius: 4px;
              width: 150px;
              height: 150px;
            }

            .album-title {
              font-size: 12px;
            }
          }
        }
      }

      @keyframes smooth-appear {
        to {
          right: 0;
        }
      }

      :host {
        position: fixed;
        top: 0;
        right: -100%;
        width: 60dvh;
        border-left: 1px solid #3d3d3d;
        height: 100%;
        background-color: #030303;

        &.slide-in {
          animation: smooth-appear 1s ease forwards;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistOverviewComponent implements OnInit {
  readonly #artistService = inject(ArtistService);

  @Input()
  set id(artistId: string) {
    this.artistId$.next(artistId);
  }

  artistId$ = new BehaviorSubject<string>('');
  artist$!: Observable<Artist>;
  artistTopAlbums$!: Observable<ArtistTopAlbumsList>;

  ngOnInit() {
    this.fetchArtist();
    this.fetchAlbums();
  }

  @HostBinding('class.slide-in') slideIn = true;
  closeSlideOutPanel() {
    this.slideIn = false;
  }

  fetchArtist() {
    this.artist$ = this.artistId$.pipe(
      filter((value) => !!value.length),
      concatMap((artistId) => {
        return this.#artistService.getOneArtist(artistId);
      }),
    );
  }

  fetchAlbums() {
    this.artistTopAlbums$ = this.artistId$.pipe(
      filter((value) => !!value.length),
      concatMap((artistId) => {
        return this.#artistService.getArtistTopAlbums(artistId, {
          include_groups: 'album',
          limit: 3,
          offset: 1,
          market: 'US',
          type: 'tracks',
        });
      }),
    );
  }

  closeAuxiliaryRoute() {
    this.slideIn = false;
  }
}
