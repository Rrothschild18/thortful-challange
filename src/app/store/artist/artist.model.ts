import { Album, Artist, Track } from '@models/index';

export type ArtistStateModel = {
  id: string;
  topTracks: Track[];
  artist: Artist;
  albums: Album[];
  relatedArtists: Artist[];
  errors: {};
};
