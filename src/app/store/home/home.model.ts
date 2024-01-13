import { Artist } from '@models/index';

export type HomeStateModel = {
  genres: any[];
  topArtists: Artist[];
  selectedArtistId: string;
  errors: Record<string, any>;
};
