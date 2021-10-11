import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
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

    this.Acc.getSubmissionStudent(user.student.id).subscribe((submi) => {
      this.submit = submi;
    });
    if (user == null) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.submit == null) {
      return true;
    }
    return false;
  }
}
