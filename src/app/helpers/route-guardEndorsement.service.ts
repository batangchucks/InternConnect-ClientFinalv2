import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { timer } from 'rxjs';
import { submissionModel } from '../shared/models/submission.model';
import { createAccount } from '../shared/services/createAcc.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardEndorsement implements CanActivate {
  submit: submissionModel;
  constructor(private router: Router, private Acc: createAccount) {}

  public canActivate(route: ActivatedRouteSnapshot) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      this.router.navigate(['/login']);
      return false;
    }

    if (user.admin) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
