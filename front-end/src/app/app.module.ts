import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {PrivateComponent} from './private/private.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {Http, HttpModule, RequestOptions} from "@angular/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./auth.service";
import {CallbackComponent} from './callback/callback.component';
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {ApiService} from "./api.service";
import {AuthGuardService as AuthGuard} from "./auth-guard.service";
import {ScopeGuardService as ScopeGuard} from "./scope-guard.service";

const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [ScopeGuard],
    data: {expectedScopes: ['read:user']}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ScopeGuard],
    data: {expectedScopes: ['read:admin']}
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    PrivateComponent,
    HomeComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,
    ApiService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    ScopeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
