import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {By} from "@angular/platform-browser";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getUserMessage: () => Observable.of("user message")
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get message', () => {
    expect(component.message).toEqual("user message");
  });

  it('should render message', () => {
    let native = fixture.debugElement.queryAll(By.css('p'));
    expect(native[0].nativeElement.textContent).toContain("User works!");
    expect(native[1].nativeElement.textContent).toContain("user message");
  });
});
