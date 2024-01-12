import { Album, Artist, ExternalUrls } from '@models/index';

export interface TrackListing {
  tracks: Track[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track',
}
