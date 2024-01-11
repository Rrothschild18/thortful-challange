import { AuthorizedSpotifyUser } from './../../auth/auth.models';

export type UserStateModel = AuthorizedSpotifyUser & {
  token: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};
