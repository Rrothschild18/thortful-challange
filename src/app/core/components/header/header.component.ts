import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Layout } from 'src/app/store/layout/layout.actions';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AsyncPipe,
    JsonPipe,
    NgIf,
  ],
  template: ` <section class="Header justify-content-between">
    <mat-toolbar class="w-100 ">
      <div class="d-flex">
        <button mat-icon-button class="me-3" (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <picture class="d-flex align-items-center">
          <img
            alt="Youtube Music Logo"
            src="https://music.youtube.com/img/on_platform_logo_dark.svg"
          />
        </picture>
      </div>

      <div class="d-flex align-items-center">
        @if (profileImage$ | async; as profileImage) {
          <button mat-icon-button class="me-3" (click)="toggleSidebar()">
            <mat-icon>cast</mat-icon>
          </button>
          <img matRipple class="avatar" [src]="profileImage.url" />
        } @else {
          <img
            matRipple
            class="avatar"
            src="https://www.alura.com.br/artigos/assets/novidades-angular-17/imagem1.gif"
          />
        }
      </div>
    </mat-toolbar>
    <mat-divider class="w-100" color="primary" />
  </section>`,
  styles: [
    `
      .Header {
        .mat-divider {
          border-top-color: #3d3d3d !important;
        }

        .mat-toolbar-row,
        .mat-toolbar-single-row {
          justify-content: space-between;
        }

        .avatar {
          border-radius: 50%;
          height: 30px;
          width: 30px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  #store = inject(Store);

  @Select(UserState.profileImage)
  profileImage$!: Observable<{
    url: string;
    height: number;
    width: number;
  }>;

  toggleSidebar() {
    this.#store.dispatch(new Layout.ToggleSidebar());
  }
}
