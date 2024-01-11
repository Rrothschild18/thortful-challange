import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Layout } from './layout.actions';
import { LayoutStateModel } from './layout.state';

const INITIAL_STATE: LayoutStateModel = {
  isSidebarOpen: true,
};

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { ...INITIAL_STATE },
})
@Injectable()
export class LayoutState {
  @Selector()
  public static sidebarOpened(state: LayoutStateModel): boolean {
    return state.isSidebarOpen;
  }

  @Action(Layout.OpenSidebar)
  onOpenLayoutSideBar(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      isSidebarOpen: true,
    });
  }

  @Action(Layout.CloseSidebar)
  onCloseLayoutSideBar(ctx: StateContext<LayoutStateModel>): void {
    ctx.patchState({
      isSidebarOpen: false,
    });
  }

  @Action(Layout.ToggleSidebar)
  onToggleLayoutSideBar(ctx: StateContext<LayoutStateModel>): void {
    const state = ctx.getState();

    ctx.patchState({
      isSidebarOpen: !state.isSidebarOpen,
    });
  }
}
