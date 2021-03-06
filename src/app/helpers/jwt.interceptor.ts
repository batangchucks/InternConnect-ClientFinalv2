import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.token;

    const isApiUrl = request.url.startsWith(this.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        alert("Session Expired")
        this.authenticationService.logout();
        location.reload();
      }
              const error = err.error.message || err.statusText;
              return throwError(error);
    }));
  }
}
