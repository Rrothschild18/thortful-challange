import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngxs/store';
import { Layout } from 'src/app/store/layout/layout.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: ` <section class="Header">
    <mat-toolbar>
      <button
        mat-icon-button
        class="me-3"
        aria-label="Example icon-button with menu icon"
        (click)="toggleSidebar()"
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
    <mat-divider class="w-100" color="primary" />
  </section>`,
  styles: [
    `
      .Header {
        .mat-divider {
          border-top-color: #3d3d3d !important;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  #store = inject(Store);

  toggleSidebar() {
    this.#store.dispatch(new Layout.ToggleSidebar());
  }
}
