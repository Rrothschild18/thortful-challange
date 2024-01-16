import { ArtistList, TopItemsList, UserTopItemsParams } from '@models/index';
import { Genres } from 'src/app/home/services/genres.model';

export namespace Home {
  export class FirstLoad {
    public static readonly type = '[Home] FirstLoad';
  }

  /** Top Artists */
  export class FetchTopArtists {
    public static readonly type = '[Home] Fetch user top artists';
    constructor(public params: UserTopItemsParams) {}
  }

  export class FetchTopArtistsSuccess {
    public static readonly type = '[Home] Fetch user top artists success';
    constructor(public response: TopItemsList) {}
  }

  export class FetchTopArtistsFailed {
    public static readonly type =
      '[Home] Fetch  user top artists occurred an error';
  }

  /** Ent Top Artist */

  /** Artist */
  export class FetchSingleArtist {
    public static readonly type = '[Home] Fetch user top artists';
  }

  export class FetchSingleArtistsSuccess {
    public static readonly type = '[Home] Fetch a single artist success';
  }

  export class FetchSingleArtistsFailed {
    public static readonly type =
      '[Home] Fetch a single artist occurred an error';
    constructor(public payload: { error: Record<string, any> }) {}
  }

  /** End Artist */

  /** Genres */
  export class FetchMusicGenres {
    public static readonly type = '[Home] Fetch music genres';
  }

  export class FetchMusicGenresSuccess {
    public static readonly type = '[Home] Fetch music genres success';
    constructor(public payload: Genres[]) {}
  }

  export class FetchMusicGenresFailed {
    public static readonly type = '[Home] Fetch music genres occurred an error';
    constructor(public payload: { error: Record<string, any> }) {}
  }

  export class SelectGenre {
    public static readonly type =
      '[Home] Select music genre for recommendation';
    constructor(public genre: string) {}
  }

  export class UnselectGenre {
    public static readonly type =
      '[Home] Unelect music genre for recommendation';
    constructor(public genre: string) {}
  }

  /** End Genres */

  export class SetCurrentSelectedArtistId {
    public static readonly type = '[Home] Set current selected artistId';
    constructor(public artistId: string) {}
  }
  export class AddFavoriteArtist {
    public static readonly type = '[Home] Add a new favorite artist';
    constructor(public artistId: string) {}
  }

  export class RemoveFavoriteArtist {
    public static readonly type = '[Home] Remove a favorite artist';
    constructor(public artistId: string) {}
  }

  export class RestoreFavoriteArtist {
    public static readonly type =
      '[Home] Restore favorite artists from local storage';
    constructor(public artistsId: string[]) {}
  }

  /** Favorite Artists */

  export class FetchFavoriteArtists {
    public static readonly type = '[Home] Fetch favorite artists';
    constructor() {}
  }
  export class FetchFavoriteArtistsSuccess {
    public static readonly type = '[Home] Fetch favorite artist success';
    constructor(public payload: ArtistList) {}
  }
  export class FetchFavoriteArtistsFailed {
    public static readonly type = '[Home] Fetch favorite artists failed';
    constructor(public payload: { error: Record<string, any> }) {}
  }

  /** End Artists */

  /** Recommended Artists */
  export class FetchRecommendedArtists {
    public static readonly type = '[Home] Fetch recommended artists';
    constructor() {}
  }
  export class FetchRecommendedArtistsSuccess {
    public static readonly type = '[Home] Fetch recommended artist success';
    constructor(public payload: ArtistList) {}
  }
  export class FetchRecommendedArtistsFailed {
    public static readonly type = '[Home] Fetch recommended artists failed';
    constructor(public payload: { error: Record<string, any> }) {}
  }

  /** End Recommend  */
}
