import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = 'Token 6444b7bd1e09e73f64d362f35a517321f08fa2f0';
        // console.log('currentUser userToken in interceptor', userToken);
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Token 6444b7bd1e09e73f64d362f35a517321f08fa2f0',
                        'Site-Id':'23998778-9f75-4cad-acbb-fb37071ad379'
                    }
                });

        return next.handle(request);
    }
}
