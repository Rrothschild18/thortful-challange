import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchArtistParams } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  #searchURL: string = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) {}

  searchArtist(searchArtistParams: SearchArtistParams): Observable<never> {
    const params = new HttpParams({ fromObject: searchArtistParams });

    return this.http.get<never>(`${this.#searchURL}/`, {
      params,
    });
  }
}
