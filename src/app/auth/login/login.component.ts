import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <section class="bg-primary vh-100 w-100 content">
      <header class="Header d-flex align-items-center px-10">
        <img
          alt="Youtube Music Logo"
          src="https://music.youtube.com/img/on_platform_logo_dark.svg"
        />
      </header>
      <div class="container text-center login-container ">
        <h1 class="text-white login">Login into Youtube Music</h1>

        <button
          class="login-btn mt-5"
          color="accent"
          mat-flat-button
          (click)="auth()"
        >
          Connect
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .Header {
        background-color: #030303e6;
        height: 50px;
      }

      .login {
        padding-top: 30px;
        font-size: 52px;
      }

      .login-btn {
        width: 200px;
        height: 50px;
        border-radius: 20px;
      }

      .content {
        height: 700px;
        background: linear-gradient(
          rgba(255, 255, 255, 0.1) 0%,
          rgb(0, 0, 0) 100%
        );
      }

      .login-container {
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
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
