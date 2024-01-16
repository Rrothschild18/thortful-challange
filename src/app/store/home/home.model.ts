import { Artist } from '@models/index';

export type HomeStateModel = {
  genres: any[];
  topArtists: Artist[];
  favoriteArtists: Artist[];
  recommendedArtists: Artist[];
  selectedArtistId: string;
  favoriteArtistsIds: string[];
  selectedGenres: string[];
  errors: Record<string, any>;
};
