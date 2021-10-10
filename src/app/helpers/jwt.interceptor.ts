import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../shared/services/authentication.service';
import { environment } from 'src/environments/environment.prod';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  readonly apiUrl = environment.apiUrl + 'api/';
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('added bearer token');
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.token;
    console.log(isLoggedIn);
    const isApiUrl = request.url.startsWith(this.apiUrl);
    if (isLoggedIn && isApiUrl) {
      console.log('setting');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
