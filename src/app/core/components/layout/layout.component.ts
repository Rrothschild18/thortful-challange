import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    HeaderComponent,
    AsyncPipe,
  ],
  template: `
    <!--  -->
    <app-header />

    <mat-drawer-container class="vh-100" autosize>
      <mat-drawer #drawer mode="side" [opened]="isOpened$ | async">
        some content to expand
      </mat-drawer>

      <ng-content> </ng-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      .Header {
        picture {
          height: 48px;
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
