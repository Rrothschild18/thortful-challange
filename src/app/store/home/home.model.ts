import { Artist } from 'src/app/shared/models/artist.model';

export type HomeStateModel = {
  genres: any[];
  topArtists: Artist[];
  selectedArtistId: string;
  errors: Record<string, any>;
};
