import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenresFromApi } from './genres.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  #genresURL: string =
    'https://api.spotify.com/v1/recommendations/available-genre-seeds';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<GenresFromApi> {
    return this.http.get<GenresFromApi>(`${this.#genresURL}`);
  }
}
