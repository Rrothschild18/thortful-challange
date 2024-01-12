import { Album, Artist, Track } from '@models/index';

export type ArtistStateModel = {
  id: string;
  topTracks: Track[];
  albums: Album[];
  relatedArtists: Artist[];
  errors: {};
};
