import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { User } from './user.actions';
import { UserStateModel } from './user.model';

const INITIAL_STATE: UserStateModel = {
  country: '',
  display_name: '',
  email: '',
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: '',
  },
  followers: {
    href: '',
    total: 0,
  },
  href: '',
  id: '',
  images: [
    {
      url: '',
      height: 300,
      width: 300,
    },
  ],
  product: '',
  type: '',
  uri: '',
  token: '',
};

@State<UserStateModel>({
  name: 'user',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class UserState {
  @Selector()
  public static profileImage(state: UserStateModel) {
    return state.images[0];
  }

  @Action(User.SetMe)
  onSetUserMe(ctx: StateContext<UserStateModel>, payload: User.SetMe) {
    const { user, accessToken } = payload.payload;

    ctx.setState({
      ...user,
      token: accessToken,
    });
  }

  @Action(User.GetMe)
  onGetUserMe(ctx: StateContext<UserStateModel>) {
    return of();
  }

  @Action(User.GetMeSuccess)
  onGetUserMeSuccess(ctx: StateContext<UserStateModel>) {
    // return of();
  }

  @Action(User.GetMeFail)
  onGetUserMeFailed(ctx: StateContext<UserStateModel>) {
    // return of();
  }
}
