import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes = (route.data as any).expectedScopes;

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
