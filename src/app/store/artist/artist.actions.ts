import {
  ArtistList,
  ArtistTopAlbumsList,
  Artist as IArtist,
  TrackListing,
} from '@models/index';

export namespace Artist {
  export class FirstLoadSingle {
    public static readonly type = '[Artist] FirstLoadSingle';
  }

  /** Artist */

  export class FetchArtist {
    public static readonly type = '[Artist] Fetch artist ';
  }

  export class FetchArtistSuccess {
    public static readonly type = '[Artist] Fetch artist  successful';
    constructor(public payload: IArtist) {}
  }

  export class FetchArtistFailed {
    public static readonly type = '[Artist] Fetch artist  error occurred';
    constructor(public payload: { error: Record<string, unknown> }) {}
  }

  /** Tracks */
  export class FetchTopTracks {
    public static readonly type = '[Artist] Fetch artist top tracks';
  }

  export class FetchTopTracksSuccess {
    public static readonly type = '[Artist] Fetch artist top tracks successful';
    constructor(public payload: TrackListing) {}
  }

  export class FetchTopTracksFailed {
    public static readonly type =
      '[Artist] Fetch artist top tracks error occurred';
    constructor(public payload: { error: Record<string, unknown> }) {}
  }

  /** Albums */
  export class FetchAlbums {
    public static readonly type = '[Artist] Fetch artist albums';
  }

  export class FetchAlbumsSuccess {
    public static readonly type = '[Artist] Fetch artist albums successful';
    constructor(public response: ArtistTopAlbumsList) {}
  }

  export class FetchAlbumsFailed {
    public static readonly type = '[Artist] Fetch artist albums error occurred';
    constructor(public payload: { error: Record<string, unknown> }) {}
  }

  /** Related Artists */

  export class FetchRelated {
    public static readonly type = '[Artist] Fetch related artist';
  }

  export class FetchRelatedSuccess {
    public static readonly type = '[Artist] Fetch related artists successful';
    constructor(public response: ArtistList) {}
  }

  export class FetchRelatedFailed {
    public static readonly type =
      '[Artist] Fetch related artists error occurred';
    constructor(public payload: { error: Record<string, unknown> }) {}
  }
  export class SetArtistViewId {
    public static readonly type = '[Artist] Set artist view';
    constructor(public payload: string) {}
  }
}
