import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TopItemsList, UserTopItemsParams } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #topItemsURL: string = `${environment.baseURL}/me/top`;
  readonly #profileURL: string = `${environment.baseURL}/users/{user_id}`;
  readonly #followingURL: string = `${environment.baseURL}/me/following`;

  constructor(private http: HttpClient) {}

  getUserTopItems(getParams: UserTopItemsParams): Observable<TopItemsList> {
    const params = new HttpParams({ fromObject: getParams });

    return this.http.get<TopItemsList>(`${this.#topItemsURL}/artists`, {
      params,
    });
  }

  getUserProfile(): Observable<unknown> {
    return this.http.get<unknown>(`${this.#profileURL}/`);
  }

  getUserFollowers(): Observable<unknown> {
    return this.http.get<unknown>(`${this.#followingURL}/`);
  }
}
