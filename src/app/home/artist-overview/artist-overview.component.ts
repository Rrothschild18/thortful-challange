import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist.model';
import { ArtistService } from 'src/app/shared/services/artist.service';

@Component({
  selector: 'app-artist-overview',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: ` <section class="ArtistOverview">
    <!-- <> -->
    <!-- <> -->
    <pre>
  {{ artist$ | async | json }}
</pre
    >
  </section>`,
  styles: [
    `
      .ArtistOverview {
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
        width: 40dvh;
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
    this.artistId = artistId;
  }

  artistId!: string;

  artist$!: Observable<Artist>;

  ngOnInit() {
    this.fetchArtist();
  }

  @HostBinding('class.slide-in') slideIn = true;
  closeSlideOutPanel() {
    this.slideIn = false;
  }

  fetchArtist() {
    this.artist$ = this.#artistService.getOneArtist(this.artistId);
  }
}
