import {TestBed, inject} from '@angular/core/testing';

import {ScopeGuardService} from './scope-guard.service';
import {AuthService} from "./auth.service";
import {Route, Router} from "@angular/router";

describe('ScopeGuardService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopeGuardService,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            userHasScopes: () => false
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: (to) => null
          }
        },
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ScopeGuardService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle authorized user', () => {
    let auth = TestBed.get(AuthService);
    auth.userHasScopes = () => true;

    expect(service.canActivate(
      {
        data: {
          expectedScopes: ['roleA']
        }
      }
    )).toBeTruthy();
  });

  it('should handle not authorized user', () => {
    let router = TestBed.get(Router);
    spyOn(router, 'navigate');

    expect(service.canActivate(
      {
        data: {
          expectedScopes: ['roleA']
        }
      }
    )).toBeFalsy();

    expect(router.navigate).toHaveBeenCalledWith([''])
  });
});
