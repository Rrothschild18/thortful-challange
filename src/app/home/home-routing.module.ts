import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-wrapper.component').then(
        (cmp) => cmp.HomeWrapperComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home.component').then((cmp) => cmp.HomeComponent),
      },
      {
        path: 'artist-overview/:id',
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
