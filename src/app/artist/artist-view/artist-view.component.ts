import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
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
import { ArtistState } from './../../store/artist/artist.state';

@Component({
  selector: 'app-artist-view',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="ArtistView">
      {{ artistId$ | async }}
      {{ albums$ | async }}
      {{ artists$ | async }}
      {{ tracks$ | async }}
    </section>
  `,
  styleUrl: './artist-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistViewComponent implements OnInit, OnDestroy {
  #store = inject(Store);
  #subSink = new Subscription();
  artistId$ = new BehaviorSubject<string>('');

  @Select(ArtistState.albums)
  albums$!: Observable<Album[]>;

  @Select(ArtistState.topRelated)
  artists$!: Observable<IArtist[]>;

  @Select(ArtistState.topRelated)
  tracks$!: Observable<Track[]>;

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
