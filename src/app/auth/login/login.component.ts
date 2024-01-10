import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <section class="bg-primary vh-100">
      <div class="container text-center">
        <h3 class="m-0 text-white">Login Works</h3>

        <button mat-flat-button color="primary" (click)="auth()">
          Connect
        </button>
      </div>
    </section>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  auth() {
    const authEndpoint = `${environment.authURL}?`;
    const clientId = `client_id=${environment.clientId}&`;
    const redirectUrl = `redirect_uri=${environment.redirectURL}&`;
    const scopes = `scope=${environment.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    // return `${authEndpoint}${clientId}${redirectUrl}${scopes}${responseType}`;

    window.location.href = `${authEndpoint}${clientId}${redirectUrl}${scopes}${responseType}`;
  }
}
