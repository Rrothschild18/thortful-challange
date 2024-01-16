import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Artist, SearchResponse } from '@models/index';
import { Select, Store } from '@ngxs/store';
import { RecommendationsService } from '@services/index';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
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
    RouterLink,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  template: ` <section class="Header justify-content-between">
    <mat-toolbar class="w-100 ">
      <div class="d-flex">
        <button mat-icon-button class="me-3" (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <a class="d-flex align-items-center" [routerLink]="['/home']">
          <img
            alt="Youtube Music Logo"
            src="https://music.youtube.com/img/on_platform_logo_dark.svg"
          />
        </a>
      </div>

      <div
        class="input-search-container d-flex align-items-center"
        [style]="
          (focus$ | async)
            ? { border: 'solid 1px #292929' }
            : { 'border-color': ' solid 1px  transparent' }
        "
      >
        <mat-icon class="px-4"> search </mat-icon>
        <input
          class="search"
          matInput
          type="text"
          [matAutocomplete]="auto"
          placeholder="Search"
          [formControl]="userSearchControl"
          (focus)="addFocusStyle()"
          (blur)="removeFocusStyle()"
        />

        <mat-autocomplete #auto="matAutocomplete">
          @for (artist of userSearchResults$ | async; track artist.id) {
          <mat-option
            [routerLink]="['/artist', artist.id]"
            [value]="artist.id"
            (onSelectionChange)="redirectToArtistView($event)"
          >
            <div class="d-flex align-items-center">
              @if (artist.images[0]; as image) {
              <img
                [style.height]="'30px'"
                [style.width]="'30px'"
                [style.border-radius]="'50%'"
                [src]="image.url"
                class="search-avatar"
              />
              } @else {
              <div
                class="d-flex justify-content-center align-items-center"
                [style.height]="'30px'"
                [style.width]="'30px'"
                [style.border-radius]="'50%'"
                [style.border]="'1px solid #fff'"
              >
                <mat-icon class="m-0"> person </mat-icon>
              </div>
              }

              <small class="ms-4">{{ artist.name }}</small>
            </div>
          </mat-option>
          } @empty { @if (userSearchControl.value.length > 3) {
          <mat-option> No artists have been found </mat-option>
          } }
        </mat-autocomplete>
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
        input {
          color: #fff;
          &:focus {
            outline: none;
          }
        }

        .input-search-container {
          width: 30%;
          border-radius: 8px;
          background-color: #292929;
          border-color: unset;
          height: 40px;

          .search {
            width: 450px;
            background-color: transparent;
            border: 0;
          }
        }
        .search-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
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
export class HeaderComponent implements OnInit {
  #store = inject(Store);
  #router = inject(Router);
  #recommendationService = inject(RecommendationsService);
  protected userSearchControl = new FormControl<string>('', {
    nonNullable: true,
  });
  protected userSearchResults$!: Observable<Artist[]>;
  protected focus$ = new BehaviorSubject<boolean>(false);

  @Select(UserState.profileImage)
  profileImage$!: Observable<{
    url: string;
    height: number;
    width: number;
  }>;

  ngOnInit() {
    this.onUserSearch();
  }

  redirectToArtistView(event: MatOptionSelectionChange<string>): void {
    const { value } = event.source;

    this.userSearchControl.setValue('');
    this.#router.navigate(['/artist', value]);
  }

  toggleSidebar() {
    this.#store.dispatch(new Layout.ToggleSidebar());
  }

  onUserSearch() {
    this.userSearchResults$ = this.userSearchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        filter((query) => query!?.length > 3),
        distinctUntilChanged(),
        switchMap((query) =>
          this.#recommendationService.searchArtist({
            q: query,
            type: 'artist',
          })
        )
      )
      .pipe(map((response: SearchResponse) => response.artists['items']));
  }

  addFocusStyle() {
    this.focus$.next(true);
  }

  removeFocusStyle() {
    this.focus$.next(false);
  }
}
