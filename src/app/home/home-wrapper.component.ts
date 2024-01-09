import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-wrapper',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWrapperComponent {}
