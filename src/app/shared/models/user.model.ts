export type UserTopItemsParams = {
  time_range: 'medium_term' | 'short_term';
  limit: number;
  offset: number;
};

export type TopItemsList = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
};

export type Item = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Followers = {
  href: string;
  total: number;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};
