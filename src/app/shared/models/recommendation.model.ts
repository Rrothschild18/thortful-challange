import { Market } from './index';

export type SearchArtistParams = {
  q: string;
  type: ResourceType;
  limit?: number;
  offset?: number;
  include_external?: 'audio';
  market?: Market;
};

export type ResourceType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode'
  | 'audiobook';

export type SearchResponse = {
  artists: Record<string, any>;
};

// type SearchResponseKey<T> = T extends Artist
//   ? 'artist'
//   : T extends Album
//     ? 'album'
//     : never;

// export type SearchResponse<T extends Artist | Album | Track> = {
//   [key in SearchResponseKey<T>]: ResourceList<T>;
// };

// export type ResourceList<T> = {
//   href: string;
//   limit: number;
//   next: string;
//   offset: number;
//   previous: string;
//   total: number;
//   items: T[];
// };
