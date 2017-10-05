import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {environment} from "../environments/environment";


@Injectable()
export class AuthService {
  userProfile: any;

  requestedScopes: string = 'openid profile read:user read:admin';

  auth0: any = new auth0.WebAuth({
    clientID: '2a0R60c54bobem1PH6dEMgXZFrfCUc0l',
    domain: 'vitaljok.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'security-demo-api',
    redirectUri: environment.auth0.redirectHost + '/callback',
    scope: this.requestedScopes
  });

  constructor(public router: Router) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);

        // setTimeout(() => {
        //     this.router.navigate(['/private']);
        //   }, 3000
        // );

        this.router.navigate(['/private']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }


  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(callback): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      callback(err, profile);
    });
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = (JSON.parse(localStorage.getItem('scopes')) || '').split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
