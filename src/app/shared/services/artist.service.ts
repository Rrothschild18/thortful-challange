import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  ArtistTopAlbumsList,
  ArtistTopItemsParams,
} from '../models/albums.model';
import { Artist } from '../models/artist.model';

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
    getParams: Omit<ArtistTopItemsParams, 'id'>,
  ): Observable<ArtistTopAlbumsList> {
    const params = new HttpParams({ fromObject: getParams });

    return this.http.get<ArtistTopAlbumsList>(
      `${this.#artistURL}/${id}/albums`,
      {
        params,
      },
    );
  }

  getArtistTopTracks(
    id: string,
    getParams: Omit<ArtistTopItemsParams, 'id'>,
  ): Observable<ArtistTopAlbumsList> {
    const params = new HttpParams({ fromObject: getParams });

    return this.http.get<ArtistTopAlbumsList>(
      `${this.#artistURL}/${id}/albums`,
      {
        params,
      },
    );
  }

  getArtistRelated(
    id: string,
    getParams: Omit<ArtistTopItemsParams, 'id'>,
  ): Observable<ArtistTopAlbumsList> {
    const params = new HttpParams({ fromObject: getParams });

    return this.http.get<ArtistTopAlbumsList>(
      `${this.#artistURL}/${id}/albums`,
      {
        params,
      },
    );
  }
}
