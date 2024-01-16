import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from 'src/app/store/layout/layout.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    HeaderComponent,
    AsyncPipe,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <!--  -->
    <app-header />

    <mat-drawer-container autosize>
      <mat-drawer #drawer mode="side" [opened]="isOpened$ | async">
        <div role="list">
          <div
            class="d-flex flex-column align-items-center justify-content-center menu"
            [routerLink]="['/home']"
            [routerLinkActive]="['active-menu']"
          >
            <mat-icon>home</mat-icon>
            <small>Home</small>
          </div>
        </div>
      </mat-drawer>

      <mat-drawer-content class=" w-100">
        <ng-content> </ng-content>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      .Header {
        picture {
          height: 48px;
        }
      }

      .menu {
        margin-top: 10px;
        width: 60px;
      }

      .active-menu {
        small {
          font-size: 10px;
          margin-top: -5px;
        }
        &:after {
          content: '';
          cursor: pointer;
          background-color: #ffffff4a !important;
          display: block;
          position: absolute;
          width: 80%;
          height: 45px;
          left: 6px;
          border-radius: 8px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Select(LayoutState.sidebarOpened)
  protected isOpened$!: Observable<boolean>;
}
