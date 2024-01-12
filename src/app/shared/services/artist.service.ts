import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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
}
