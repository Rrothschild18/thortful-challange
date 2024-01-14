import { Artist } from '@models/index';

export type HomeStateModel = {
  genres: any[];
  topArtists: Artist[];
  selectedArtistId: string;
  favoriteArtists: string[];
  errors: Record<string, any>;
};
