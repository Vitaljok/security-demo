import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Router} from "@angular/router";

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        {
          provide: Router,
          useValue: {
            navigate: (to: any) => null
          }
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should forward to Auth0 on login', () => {
    spyOn(service.auth0, 'authorize');
    service.login();
    expect(service.auth0.authorize).toHaveBeenCalled();
  });

  it('should clear session on logout',
    inject([Router], (router: Router) => {
      spyOn(localStorage, 'removeItem');
      spyOn(router, 'navigate');

      service.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('expires_at');
      expect(localStorage.removeItem).toHaveBeenCalledWith('scopes');
      expect(router.navigate).toHaveBeenCalledWith(['']);
    }));

  it('should handle authentication',
    inject([Router], (router: Router) => {
      spyOn(localStorage, 'setItem');
      spyOn(router, 'navigate');

      service.auth0.parseHash = (cb) => cb(null,
        {accessToken: 'abc-123', idToken: 'xyz-456', scope: ['roleA', 'ŗoleB']});

      service.handleAuthentication();

      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'abc-123');
      expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'xyz-456');
      expect(localStorage.setItem).toHaveBeenCalledWith('expires_at', 'null');
      expect(localStorage.setItem).toHaveBeenCalledWith('scopes', JSON.stringify(['roleA', 'ŗoleB']));
      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
      expect(router.navigate).toHaveBeenCalledWith(['/private']);
    }));

  it('should handle authentication error',
    inject([Router], (router: Router) => {
      spyOn(localStorage, 'setItem');
      spyOn(router, 'navigate');

      service.auth0.parseHash = (cb) => cb('Authentication error!', null);

      service.handleAuthentication();

      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

  it('should check authenticated user', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => new Date().getTime() + 1000);
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should check not authenticated user', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => new Date().getTime() - 1000);
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should get user profile', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => 'abc-123');
    spyOn(service.auth0.client, 'userInfo').and.callFake((token, cb) => cb(null, "profile"));

    service.getProfile((err, profile) => {
      expect(profile).toEqual('profile')
    });

    expect(service.auth0.client.userInfo).toHaveBeenCalled();
  });

  it('should check user scopes', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify('roleA roleB'));
    expect(service.userHasScopes(['roleA'])).toBeTruthy();
    expect(service.userHasScopes(['roleB'])).toBeTruthy();
    expect(service.userHasScopes(['roleA', 'roleB'])).toBeTruthy();
    expect(service.userHasScopes(['roleA', 'roleB', 'roleC'])).toBeFalsy();
  });
});
