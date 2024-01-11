import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopItemsList, UserTopItemsParams } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #topItemsURL: string = 'https://api.spotify.com/v1/me/top';
  #profileURL: string = 'https://api.spotify.com/v1/users/{user_id}';
  #followingURL: string = 'https://api.spotify.com/v1/me/following';

  constructor(private http: HttpClient) {}

  getUserTopItems(getParams: UserTopItemsParams): Observable<TopItemsList> {
    const params = new HttpParams();

    Object.entries(
      ([key, value]: [keyof UserTopItemsParams, string | number]) => {
        params.append(key, value);
      },
    );

    return this.http.get<TopItemsList>(
      `${this.#topItemsURL}/${getParams.type}s`,
      {
        params,
      },
    );
  }
}
