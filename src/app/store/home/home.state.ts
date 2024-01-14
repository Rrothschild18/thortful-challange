import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist, ArtistList, TopItemsList } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ArtistService, UserService } from '@services/index';
import { Observable, catchError, of, tap } from 'rxjs';
import { Genres, GenresFromApi } from 'src/app/home/services/genres.model';
import { GenresService } from 'src/app/home/services/genres.service';
import { Home } from './home.actions';
import { HomeStateModel } from './home.model';

const INITIAL_STATE: HomeStateModel = {
  genres: [],
  topArtists: [],
  selectedArtistId: '',
  favoriteArtistsIds: [],
  favoriteArtists: [],
  errors: {},
};

@State<HomeStateModel>({
  name: 'home',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class HomeState {
  localStorage: Storage = window.localStorage;

  @Selector()
  public static genres(state: HomeStateModel): Genres[] {
    return state.genres;
  }

  @Selector()
  public static topArtists(state: HomeStateModel): Artist[] {
    return state.topArtists;
  }

  @Selector()
  public static favoriteArtists(state: HomeStateModel): Artist[] {
    console.log({ v: state.favoriteArtists });
    return state.favoriteArtists;
  }

  @Selector()
  public static favoriteArtistsIds(state: HomeStateModel): string[] {
    return state.favoriteArtistsIds;
  }

  constructor(
    private userService: UserService,
    private genresService: GenresService,
    private artistService: ArtistService,
  ) {}

  @Action(Home.FirstLoad)
  onHomeFirstLoad(ctx: StateContext<HomeStateModel>): void {
    ctx.dispatch(new Home.FetchMusicGenres());
    ctx.dispatch(
      new Home.FetchTopArtists({
        limit: 10,
        offset: 1,
        time_range: 'medium_term',
      }),
    );

    ctx.dispatch(
      new Home.RestoreFavoriteArtist(
        JSON.parse(this.localStorage.getItem('favoriteArtistsIds')! ?? []),
      ),
    );

    ctx.dispatch(new Home.FetchFavoriteArtists());
  }

  /** Genres */
  @Action(Home.FetchMusicGenres)
  onFetchMusicGenres(
    ctx: StateContext<HomeStateModel>,
  ): Observable<GenresFromApi> {
    return this.genresService.getGenres().pipe(
      catchError((err) => {
        ctx.dispatch(new Home.FetchMusicGenresFailed({ error: err }));

        if (err.status === HttpStatusCode.TooManyRequests)
          return of({
            genres: [
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
            ] as unknown as Genres[],
          });

        return of({
          genres: [
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
          ] as unknown as Genres[],
        });
      }),
      tap((response: GenresFromApi) =>
        ctx.dispatch(new Home.FetchMusicGenresSuccess(response.genres)),
      ),
    );
  }

  @Action(Home.FetchMusicGenresSuccess)
  onFetchGenresSuccess(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchMusicGenresSuccess,
  ): void {
    ctx.patchState({
      genres: payload.payload,
    });
  }

  @Action(Home.FetchMusicGenresSuccess)
  onFetchGenresFailed(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchMusicGenresFailed,
  ): void {
    const stateErrors = ctx.getState().errors;
    ctx.patchState({
      errors: {
        ...stateErrors,
        genres: payload.payload.error,
      },
    });
  }

  /** Top Items */
  @Action(Home.FetchTopArtists)
  onFetchTopArtists(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchTopArtists,
  ): Observable<TopItemsList> {
    return this.userService.getUserTopItems(payload.params).pipe(
      catchError((err) => {
        ctx.dispatch(new Home.FetchSingleArtistsFailed({ error: err }));
        if (err.status === HttpStatusCode.TooManyRequests) {
          // return mock artists
        }
        return of({
          href: '',
          limit: 0,
          next: 0,
          offset: 0,
          previous: '',
          total: 0,
          items: [],
        } as unknown as TopItemsList);
      }),
      tap((response) =>
        ctx.dispatch(new Home.FetchTopArtistsSuccess(response)),
      ),
    );
  }

  @Action(Home.FetchTopArtistsSuccess)
  onFetchTopArtistsSuccess(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchTopArtistsSuccess,
  ): void {
    const state = ctx.getState();
    const ids = state.topArtists.map((artist) => artist.id);

    ctx.dispatch(new Home.RestoreFavoriteArtist(ids));

    ctx.patchState({
      topArtists: payload.response.items,
    });
  }

  @Action(Home.FetchTopArtistsFailed)
  onFetchTopArtistsFailed(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchTopArtistsFailed,
  ): void {
    const stateErrors = ctx.getState().errors;
    ctx.patchState({
      errors: {
        ...stateErrors,
        topItems: payload,
      },
    });
  }

  @Action(Home.SetCurrentSelectedArtistId)
  onSetCurrentSelectedArtistId(
    ctx: StateContext<HomeStateModel>,
    payload: Home.SetCurrentSelectedArtistId,
  ): void {
    ctx.patchState({
      selectedArtistId: payload.artistId,
    });
  }

  @Action(Home.AddFavoriteArtist)
  onAddFavoriteArtist(
    ctx: StateContext<HomeStateModel>,
    payload: Home.AddFavoriteArtist,
  ): void {
    let state = ctx.getState();

    ctx.patchState({
      favoriteArtistsIds: [...state.favoriteArtistsIds, payload.artistId],
    });

    state = ctx.getState();

    this.localStorage.setItem(
      'favoriteArtistsIds',
      JSON.stringify(state.favoriteArtistsIds),
    );
  }

  @Action(Home.RemoveFavoriteArtist)
  onRemoveFavoriteArtist(
    ctx: StateContext<HomeStateModel>,
    payload: Home.RemoveFavoriteArtist,
  ): void {
    let state = ctx.getState();

    ctx.patchState({
      favoriteArtistsIds: state.favoriteArtistsIds.filter(
        (id) => id !== payload.artistId,
      ),
    });

    state = ctx.getState();

    this.localStorage.setItem(
      'favoriteArtistsIds',
      JSON.stringify(state.favoriteArtistsIds),
    );
  }

  @Action(Home.RestoreFavoriteArtist)
  onRestoreFavoriteArtists(
    ctx: StateContext<HomeStateModel>,
    payload: Home.RestoreFavoriteArtist,
  ): void {
    ctx.patchState({
      favoriteArtistsIds: payload.artistsId,
    });
  }

  @Action(Home.FetchFavoriteArtists)
  onFetchFavoriteArtists(
    ctx: StateContext<HomeStateModel>,
  ): Observable<ArtistList> {
    const state = ctx.getState();

    return this.artistService.getSeveralArtists(state.favoriteArtistsIds).pipe(
      catchError((err) => {
        ctx.dispatch(new Home.FetchFavoriteArtistsFailed({ error: err }));
        if (err.status === HttpStatusCode.TooManyRequests) {
          // return mock artists
        }
        return of({
          href: '',
          limit: 0,
          next: 0,
          offset: 0,
          previous: '',
          total: 0,
          items: [],
        } as unknown as ArtistList);
      }),
      tap((response) =>
        ctx.dispatch(new Home.FetchFavoriteArtistsSuccess(response)),
      ),
    );
  }

  @Action(Home.FetchFavoriteArtistsSuccess)
  onFetchFavoriteArtistsSuccess(
    ctx: StateContext<HomeStateModel>,
    payload: Home.FetchFavoriteArtistsSuccess,
  ): void {
    debugger;
    ctx.patchState({
      favoriteArtists: payload.payload.artists || [],
    });
  }
}
