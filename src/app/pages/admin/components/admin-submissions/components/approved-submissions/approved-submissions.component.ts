import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-approved-submissions',
  templateUrl: './approved-submissions.component.html',
  styleUrls: ['./approved-submissions.component.scss'],
})
export class ApprovedSubmissionsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  Submission: submissionModel[] = [];
  DisapproveIndicator: boolean = false;

  rejectedForm: FormGroup;

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
  toCancelTwo() {
    this.DisapproveIndicator = false;
  }
}
