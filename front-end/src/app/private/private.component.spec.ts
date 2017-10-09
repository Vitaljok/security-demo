import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivateComponent} from './private.component';
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth.service";
import {By} from "@angular/platform-browser";

describe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getPrivateMessage: () => Observable.of("private message")
          }
        },
        {
          provide: AuthService,
          useValue: {
            getProfile: () => null
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get message', () => {
    expect(component.message).toEqual("private message");
  });

  it('should render message', () => {
    let native = fixture.debugElement.queryAll(By.css('p'));
    expect(native[0].nativeElement.textContent).toContain("Private page works!");
    expect(native[1].nativeElement.textContent).toContain("private message");
  });
});
