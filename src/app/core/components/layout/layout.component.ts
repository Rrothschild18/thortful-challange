import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  ],
  template: `
    <!--  -->
    <app-header />

    <mat-drawer-container class="vh-100" autosize>
      <mat-drawer #drawer mode="side">
        <p>Auto-resizing sidenav</p>
      </mat-drawer>

      <div>
        <button type="button" mat-button (click)="drawer.toggle()">
          Toggle sidenav
        </button>
      </div>

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
export class LayoutComponent {}
