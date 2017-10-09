import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {By} from "@angular/platform-browser";
import {inject} from "@angular/core/testing";

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {
}

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            handleAuthentication: () => {
            },
            isAuthenticated: () => false,
            userHasScopes: (scopes: any) => false
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('for anonymous user', () => {

    it('should render log in button', () => {
      let btn = fixture.debugElement.queryAll(By.css('button'));
      expect(btn.length).toBe(1);
      expect(btn[0].nativeElement.textContent).toContain("Log in");
    });

    it('should hide links to pages', () => {
      let btn = fixture.debugElement.queryAll(By.css('nav.navbar-nav li.nav-item a.nav-link '));
      expect(btn.length).toBe(0);
    });
  });


  describe('for authenticated user', () => {

    it('should render log out button',
      inject([AuthService],
        (auth: AuthService) => {
          auth.isAuthenticated = () => true;
          fixture.detectChanges();
          let btn = fixture.debugElement.queryAll(By.css('button'));
          expect(btn.length).toBe(1);
          expect(btn[0].nativeElement.textContent).toContain("Log out");
        }));

    it('should render links',
      inject([AuthService],
        (auth: AuthService) => {
          auth.isAuthenticated = () => true;
          fixture.detectChanges();
          let btn = fixture.debugElement.queryAll(By.css('ul.navbar-nav li.nav-item a.nav-link'));
          expect(btn.length).toBe(1);
          expect(btn[0].nativeElement.textContent).toContain("Private");
        }));

    it('should render links for USER scope',
      inject([AuthService],
        (auth: AuthService) => {
          auth.isAuthenticated = () => true;
          auth.userHasScopes = (scopes:Array<string>) => scopes.indexOf("read:user") > -1;
          fixture.detectChanges();
          let btn = fixture.debugElement.queryAll(By.css('ul.navbar-nav li.nav-item a.nav-link'));
          expect(btn.length).toBe(2);
          expect(btn[0].nativeElement.textContent).toContain("Private");
          expect(btn[1].nativeElement.textContent).toContain("User");
        }));

    it('should render links for ADMIN scope',
      inject([AuthService],
        (auth: AuthService) => {
          auth.isAuthenticated = () => true;
          auth.userHasScopes = (scopes:Array<string>) => scopes.indexOf("read:admin") > -1;
          fixture.detectChanges();
          let btn = fixture.debugElement.queryAll(By.css('ul.navbar-nav li.nav-item a.nav-link'));
          expect(btn.length).toBe(2);
          expect(btn[0].nativeElement.textContent).toContain("Private");
          expect(btn[1].nativeElement.textContent).toContain("Admin");
        }));

    it('should render links for USER and ADMIN scope',
      inject([AuthService],
        (auth: AuthService) => {
          auth.isAuthenticated = () => true;
          auth.userHasScopes = (scopes:Array<string>) => true;
          fixture.detectChanges();
          let btn = fixture.debugElement.queryAll(By.css('ul.navbar-nav li.nav-item a.nav-link'));
          expect(btn.length).toBe(3);
          expect(btn[0].nativeElement.textContent).toContain("Private");
          expect(btn[1].nativeElement.textContent).toContain("User");
          expect(btn[2].nativeElement.textContent).toContain("Admin");
        }));
  });
});
