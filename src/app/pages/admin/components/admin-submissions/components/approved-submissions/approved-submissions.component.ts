import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-approved-submissions',
  templateUrl: './approved-submissions.component.html',
  styleUrls: ['./approved-submissions.component.scss'],
})
export class ApprovedSubmissionsComponent implements OnInit {
  p: number = 1;
  user = JSON.parse(localStorage.getItem('user'));
  Submission: submissionModel[] = [];
  ApproveIndicator: boolean = false;
  DisapproveIndicator: boolean = false;
  FormEntry: boolean = false;

  rejectedForm: FormGroup;
  viewEndorsement:submissionModel;
  readonly photoUrl = environment.apiUrl + 'images/Company/';

  constructor(private Acc: createAccount) {}

  ngOnInit(): void {
    this.Acc.submissionStep5(this.user.admin.sectionId).subscribe((eachS) => {
      this.Submission = eachS;
    });
  }

  response(responseId: number, companyAgrees: boolean, comments: string) {
    var POSTval = {
      id: responseId,
      companyAgrees: companyAgrees,
      comments: comments,
    };
    this.Acc.approvedCompany(POSTval).subscribe((companyA) => {
      this.ngOnInit();
    });
  }
  toDisapprove(adminResponse: number) {
    this.DisapproveIndicator = true;
    this.rejectedForm = new FormGroup({
      comments: new FormControl(''),
      id: new FormControl(adminResponse),
      companyAgrees: new FormControl(false),
    });
  }
  rejectedSubmit() {
    this.Acc.approvedCompany(this.rejectedForm.value).subscribe((companyA) => {
      this.ngOnInit();
    });

    this.ngOnInit();
    this.DisapproveIndicator = false;
  }

  toCancelOne() {
    this.ApproveIndicator = false;
  }
  toCancelTwo() {
    this.DisapproveIndicator = false;
  }

  toOpen(eachS:submissionModel) {
    this.FormEntry = true;
    this.FormEntry = true;
    this.viewEndorsement = eachS;
  }

  toClose() {
    this.FormEntry = false;
  }
}
