import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public message: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserMessage().subscribe(text => this.message = text)
  }

}
