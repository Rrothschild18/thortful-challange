import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: ` <section class="Header">
    <mat-toolbar>
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <picture class="d-flex align-items-center">
        <img
          alt="Youtube Music Logo"
          src="https://music.youtube.com/img/on_platform_logo_dark.svg"
        />
      </picture>
    </mat-toolbar>
  </section>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
