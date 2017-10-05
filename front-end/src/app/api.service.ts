import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(public authHttp: AuthHttp, public http: Http) {
  }

  getUserMessage(): Observable<string> {
    return this.authHttp.get(`/api/user`)
      .map(response => response.text())
      .catch(this.handleError);
  }

  getAdminMessage(): Observable<string> {
    return this.authHttp.get(`/api/admin`)
      .map(response => response.text())
      .catch(this.handleError);
  }

  getPrivateMessage(): Observable<string> {
    return this.authHttp.get(`/api/private`)
      .map(response => response.text())
      .catch(this.handleError);
  }

  getPublicMessage(): Observable<string> {
    return this.http.get(`/api/public`)
      .map(response => response.text())
      .catch(this.handleError);
  }

  handleError(err: any) {
    return Observable.throw(err.json && err.json() || err.message || 'Server error');
  }

}
