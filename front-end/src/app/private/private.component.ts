import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  public message: string;
  profile: any;

  constructor(public auth: AuthService, private api: ApiService) {
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    this.api.getPrivateMessage().subscribe(text => this.message = text)
  }


}
