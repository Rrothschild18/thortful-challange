import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistList, SearchArtistParams, Track } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  #searchURL: string = 'https://api.spotify.com/v1/search';
  #recommendationURL: string = 'https://api.spotify.com/v1/recommendations';

  constructor(private http: HttpClient) {}

  searchArtist(searchArtistParams: SearchArtistParams): Observable<ArtistList> {
    const params = new HttpParams({ fromObject: searchArtistParams });

    return this.http.get<ArtistList>(`${this.#searchURL}/`, {
      params,
    });
  }

  artistsRecommendations(
    seed_genres: string[],
    artistsIds: string[],
  ): Observable<{ tracks: Track[] }> {
    let toParams: Record<string, unknown> = {};

    if (!artistsIds.length) {
      toParams['seed_artists'] = ['1Xyo4u8uXC1ZmMpatF05PJ']; //Default artist
    }

    if (!seed_genres.length) {
      toParams['seed_genres'] = [];
    }

    const params = new HttpParams({
      fromObject: {
        seed_genres: seed_genres,
        seed_artists: artistsIds,
        ...toParams,
      },
    });

    return this.http.get<never>(`${this.#recommendationURL}`, {
      params,
    });
  }
}
