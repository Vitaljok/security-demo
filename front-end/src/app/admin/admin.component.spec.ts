import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminComponent} from './admin.component';
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {By} from "@angular/platform-browser";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getAdminMessage: () => Observable.of("admin message")
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get message', () => {
    expect(component.message).toEqual("admin message");
  });

  it('should render message', () => {
    let native = fixture.debugElement.queryAll(By.css('p'));
    expect(native[0].nativeElement.textContent).toContain("Admin works!");
    expect(native[1].nativeElement.textContent).toContain("admin message");
  });
});
