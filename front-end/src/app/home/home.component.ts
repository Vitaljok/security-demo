import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPublicMessage().subscribe(text => this.message = text)
  }

}
