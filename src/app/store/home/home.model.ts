import { Artist } from '@models/index';

export type HomeStateModel = {
  genres: any[];
  topArtists: Artist[];
  favoriteArtists: Artist[];
  selectedArtistId: string;
  favoriteArtistsIds: string[];
  errors: Record<string, any>;
};
