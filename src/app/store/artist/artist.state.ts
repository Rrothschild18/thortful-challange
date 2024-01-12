import { Injectable } from '@angular/core';
import {
  Album,
  Artist as ArtistModel,
  ArtistTopItemsParams,
  Track,
} from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ArtistService } from '@services/artist.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Artist } from './artist.actions';
import { ArtistStateModel } from './artist.model';

const INITIAL_STATE: ArtistStateModel = {
  id: '',
  relatedArtists: [],
  albums: [],
  topTracks: [],
  errors: {},
};

@State<ArtistStateModel>({
  name: 'artist',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class ArtistState {
  constructor(private artistService: ArtistService) {}

  @Selector()
  public static albums(state: ArtistStateModel): Album[] {
    return state.albums;
  }

  @Selector()
  public static topRelated(state: ArtistStateModel): ArtistModel[] {
    return state.relatedArtists;
  }

  @Selector()
  public static topTracks(state: ArtistStateModel): Track[] {
    return state.topTracks;
  }

  //** Albums */
  @Action(Artist.FirstLoadSingle)
  onFirstLoadSingle(ctx: StateContext<ArtistStateModel>): void {
    ctx.dispatch(new Artist.FetchAlbums());
    ctx.dispatch(new Artist.FetchRelated());
    ctx.dispatch(new Artist.FetchTopTracks());
  }

  //** Albums */
  @Action(Artist.FetchAlbums)
  onFetchArtistsAlbums(
    ctx: StateContext<ArtistStateModel>,
  ): Observable<unknown> {
    const state = ctx.getState();
    const params: Omit<ArtistTopItemsParams, 'id'> = {
      limit: 10,
      offset: 10,
      market: 'US',
      include_groups: 'album',
      type: 'artist',
    };

    return this.artistService.getArtistTopAlbums(state.id, params).pipe(
      tap((response) => ctx.dispatch(new Artist.FetchAlbumsSuccess(response))),
      catchError((err) => {
        ctx.dispatch(new Artist.FetchAlbumsFailed(err));
        return of({});
      }),
    );
  }

  @Action(Artist.FetchAlbumsSuccess)
  onFetchArtistsAlbumsSuccess(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchAlbumsSuccess,
  ): void {
    ctx.patchState({
      albums: payload.response.items,
    });
  }

  @Action(Artist.FetchAlbumsFailed)
  onFetchArtistsAlbumsFailed(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchAlbumsFailed,
  ): void {
    const state = ctx.getState();
    const { error } = payload.payload;

    ctx.patchState({
      errors: {
        ...state.errors,
        albums: error,
      },
    });
  }

  /** Tracks */
  @Action(Artist.FetchTopTracks)
  onFetchArtistsTopTracks(
    ctx: StateContext<ArtistStateModel>,
  ): Observable<unknown> {
    const state = ctx.getState();
    let market = 'US';

    return this.artistService
      .getArtistTopTracks(state.id, (market = 'US'))
      .pipe(
        tap((response) =>
          ctx.dispatch(new Artist.FetchTopTracksSuccess(response)),
        ),
        catchError((err) => {
          ctx.dispatch(new Artist.FetchTopTracksFailed(err));
          return of({});
        }),
      );
  }

  @Action(Artist.FetchTopTracksSuccess)
  onFetchTopTracksSuccess(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchTopTracksSuccess,
  ): void {
    ctx.patchState({
      topTracks: payload.payload.tracks,
    });
  }

  @Action(Artist.FetchTopTracksFailed)
  onFetchTopTracksFailed(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchTopTracksFailed,
  ): void {
    const state = ctx.getState();
    const { error } = payload.payload;

    ctx.patchState({
      errors: {
        ...state.errors,
        topTracks: error,
      },
    });
  }

  /** Related */
  @Action(Artist.FetchRelated)
  onFetchArtistsRelated(
    ctx: StateContext<ArtistStateModel>,
  ): Observable<unknown> {
    const state = ctx.getState();

    return this.artistService.getArtistRelated(state.id).pipe(
      tap((response) => ctx.dispatch(new Artist.FetchRelatedSuccess(response))),
      catchError((err) => {
        ctx.dispatch(new Artist.FetchRelatedFailed(err));
        return of({});
      }),
    );
  }

  @Action(Artist.FetchRelatedSuccess)
  onFetchRelatedSuccess(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchRelatedSuccess,
  ): void {
    ctx.patchState({
      relatedArtists: payload.response.artists,
    });
  }

  @Action(Artist.FetchRelatedFailed)
  onFetchRelatedFailed(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.FetchRelatedFailed,
  ): void {
    const state = ctx.getState();
    const { error } = payload.payload;

    ctx.patchState({
      errors: {
        ...state.errors,
        related: error,
      },
    });
  }

  @Action(Artist.SetArtistViewId)
  onSetArtistViewId(
    ctx: StateContext<ArtistStateModel>,
    payload: Artist.SetArtistViewId,
  ): void {
    ctx.patchState({
      id: payload.payload,
    });
  }
}
