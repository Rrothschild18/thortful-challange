import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist, TopItemsList } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from '@services/index';
import { Observable, catchError, of, tap } from 'rxjs';
import { Genres, GenresFromApi } from 'src/app/home/services/genres.model';
import { GenresService } from 'src/app/home/services/genres.service';
import { Home } from './home.actions';
import { HomeStateModel } from './home.model';

const INITIAL_STATE: HomeStateModel = {
  genres: [],
  topArtists: [],
  selectedArtistId: '',
  errors: {},
};

@State<HomeStateModel>({
  name: 'home',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class HomeState {
  @Selector()
  public static genres(state: HomeStateModel): Genres[] {
    return state.genres;
  }

  @Selector()
  public static topArtists(state: HomeStateModel): Artist[] {
    return state.topArtists;
  }

  constructor(
    private userService: UserService,
    private genresService: GenresService,
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
}
