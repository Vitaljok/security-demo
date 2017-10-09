import {inject, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {AuthHttp} from "angular2-jwt";
import {Http, HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend, ConnectionBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ApiService,
        {provide: AuthHttp, useClass: Http},
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should get public message',
    inject([ApiService, XHRBackend], (service: ApiService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((conn) => {
        expect(conn.request.method).toBe(RequestMethod.Get);
        expect(conn.request.url).toBe("/api/public");

        conn.mockRespond(
          new Response(
            new ResponseOptions({
              body: "public message"
            })
          )
        )
      });

      service.getPublicMessage().subscribe((res) => {
        expect(res).toEqual("public message");
      });
    }));

  it('should get private message',
    inject([ApiService, ConnectionBackend], (service: ApiService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((conn) => {
        expect(conn.request.method).toBe(RequestMethod.Get);
        expect(conn.request.url).toBe("/api/private");

        conn.mockRespond(
          new Response(
            new ResponseOptions({
              body: "private message"
            })
          )
        )
      });

      service.getPrivateMessage().subscribe((res) => {
        expect(res).toEqual("private message");
      });
    }));

  it('should handle error',
    inject([ApiService, ConnectionBackend], (service: ApiService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((conn) => {
        expect(conn.request.method).toBe(RequestMethod.Get);
        expect(conn.request.url).toBe("/api/user");

        conn.mockError(
          new Response(
            new ResponseOptions({
              status: 500,
              statusText: "Something wrong!",
              body: JSON.stringify({message: "Error message"})
            })
          )
        )
      });

      service.getUserMessage().subscribe(null,
        (err) => {
          expect(err.message).toBe("Error message")
        });
    }));
});
