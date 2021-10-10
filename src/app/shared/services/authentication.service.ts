import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { userModel } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject!: BehaviorSubject<userModel>;
  public user!: Observable<userModel>;

  readonly apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<userModel>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  login(userCredit: NgForm) {
    return this.http
      .post<userModel>(this.apiUrl + 'api/Auth/login', userCredit)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('calling in map');
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  public get userValue(): userModel {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAccounts() {
    return this.http.get(this.apiUrl + 'api/Accounts');
  }
}
