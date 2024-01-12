import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GenresFromApi } from './genres.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  readonly #genresURL: string = `${environment.baseURL}/recommendations/available-genre-seeds`;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<GenresFromApi> {
    return this.http.get<GenresFromApi>(`${this.#genresURL}`);
  }
}
