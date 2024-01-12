import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-wrapper.component').then(
        (cmp) => cmp.HomeWrapperComponent,
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home.component').then((cmp) => cmp.HomeComponent),
      },
      {
        path: 'artist-overview',
        outlet: 'overview',
        loadComponent: () =>
          import('./artist-overview/artist-overview.component').then(
            (cmp) => cmp.ArtistOverviewComponent,
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
