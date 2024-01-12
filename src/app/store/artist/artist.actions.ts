export namespace Layout {
  export class OpenSidebar {
    public static readonly type = '[Layout Sidebar] Open Layout Sidebar';
  }

  export class CloseSidebar {
    public static readonly type = '[Layout Sidebar] Close Layout Sidebar';
  }

  export class ToggleSidebar {
    public static readonly type =
      '[Layout Sidebar] Toggle Layout Sidebar current state';
  }
}
