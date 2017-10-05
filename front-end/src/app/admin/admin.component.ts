import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public message: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAdminMessage().subscribe(text => this.message = text)
  }

}
