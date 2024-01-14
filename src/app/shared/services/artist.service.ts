import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Artist,
  ArtistList,
  ArtistTopAlbumsList,
  ArtistTopItemsParams,
  Market,
  TrackListing,
} from '@models/index';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  #artistURL: string = `${environment.baseURL}/artists`;

  constructor(private http: HttpClient) {}

  getOneArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.#artistURL}/${id}`);
  }

  getArtistTopAlbums(
    id: string,
    getParams: Omit<ArtistTopItemsParams, 'id' | 'artist'>,
  ): Observable<ArtistTopAlbumsList> {
    const params = new HttpParams({ fromObject: getParams });

    return this.http.get<ArtistTopAlbumsList>(
      `${this.#artistURL}/${id}/albums`,
      {
        params,
      },
    );
  }

  getArtistTopTracks(id: string, market: Market): Observable<TrackListing> {
    const params = new HttpParams({ fromObject: { market } });

    return this.http.get<TrackListing>(`${this.#artistURL}/${id}/top-tracks`, {
      params,
    });
  }

  getArtistRelated(id: string): Observable<ArtistList> {
    return this.http.get<ArtistList>(
      `${this.#artistURL}/${id}/related-artists`,
    );
  }

  getSeveralArtists(ids: string[]): Observable<ArtistList> {
    const params = new HttpParams({ fromObject: { ids: ids.join(',') } });
    return this.http.get<ArtistList>(`${this.#artistURL}`, { params });
  }
}
