import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizedSpotifyUser } from '@auth/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userProfileURL: string = 'https://api.spotify.com/v1/me';

  constructor(private http: HttpClient) {}

  getUser(token: string): Observable<AuthorizedSpotifyUser> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<AuthorizedSpotifyUser>(`${this.#userProfileURL}`, {
      headers,
    });
  }
}
