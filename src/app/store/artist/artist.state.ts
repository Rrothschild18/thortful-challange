import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { ArtistStateModel } from './artist.model';

const INITIAL_STATE: ArtistStateModel = {
  id: '',
  relatedArtists: [],
  albums: [],
  topTracks: [],
};

@State<ArtistStateModel>({
  name: 'artist',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class ArtistState {
  // @Selector()
  // public static sidebarOpened(state: ArtistStateModel): boolean {
  //   return state;
  // }
  // @Action(Layout.OpenSidebar)
  // onOpenLayoutSideBar(ctx: StateContext<ArtistStateModel>): void {
  //   ctx.patchState({
  //     isSidebarOpen: true,
  //   });
  // }
}
