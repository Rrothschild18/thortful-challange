import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-artist-view',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="ArtistView">
      {{ artistId$ | async }}
    </section>
  `,
  styleUrl: './artist-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistViewComponent {
  artistId$ = new BehaviorSubject<string>('');

  @Input()
  set id(artistId: string) {
    this.artistId$.next(artistId);
  }
}
