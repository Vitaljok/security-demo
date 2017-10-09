import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {By} from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getPublicMessage: () => Observable.of("public message")
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get message', () => {
    expect(component.message).toEqual("public message");
  });

  it('should render message', () => {
    let native = fixture.debugElement.queryAll(By.css('p'));
    expect(native[0].nativeElement.textContent).toContain("Home works!");
    expect(native[1].nativeElement.textContent).toContain("public message");
  });
});
