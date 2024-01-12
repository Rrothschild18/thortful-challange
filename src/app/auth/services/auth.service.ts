import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizedSpotifyUser } from '@auth/auth.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #userProfileURL: string = `${environment.baseURL}/me`;

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
