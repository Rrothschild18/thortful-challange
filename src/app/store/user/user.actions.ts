import { AuthorizedSpotifyUser } from './../../auth/auth.models';

export namespace User {
  export class GetMe {
    public static readonly type = '[User] Get current user from spotify';
  }

  export class GetMeSuccess {
    public static readonly type = '[User] Get current user successful from api';
  }

  export class GetMeFail {
    public static readonly type = '[User] Get current user from api failed';
  }

  export class SetMe {
    public static readonly type = '[User] Set authorized spotify';
    constructor(
      public payload: { user: AuthorizedSpotifyUser; accessToken: string }
    ) {}
  }
}
