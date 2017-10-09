import {TestBed, inject} from '@angular/core/testing';

import {AuthGuardService} from './auth-guard.service';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

describe('AuthGuardService', () => {
  let guard: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: (to:any) => null
          }
        }
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.get(AuthGuardService);
  });


  it('should handle authenticated user', () => {
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should guard anonymous user',
    inject([AuthService, Router], (auth: AuthService, router: Router) => {
      auth.isAuthenticated = () => false;
      spyOn(router, 'navigate');
      expect(guard.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    }));
});
