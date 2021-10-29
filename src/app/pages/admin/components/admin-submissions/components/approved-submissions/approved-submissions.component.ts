import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { logsModel } from 'src/app/shared/models/logs.model';
import { compSubmissionModel, submissionModel } from 'src/app/shared/models/submission.model';
import { tracksModel } from 'src/app/shared/models/tracks.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-approved-submissions',
  templateUrl: './approved-submissions.component.html',
  styleUrls: ['./approved-submissions.component.scss'],
})
export class ApprovedSubmissionsComponent implements OnInit {
  p: number = 1;
  user = JSON.parse(localStorage.getItem('user'));
  Submission: compSubmissionModel[] = [];
  ApproveIndicator: boolean = false;
  DisapproveIndicator: boolean = false;
  FormEntry: boolean = false;
  modalAppear: boolean = false;
  submissionHistory: boolean = false;
  trackList: tracksModel[];

  trackName: string;
  rejectedForm: FormGroup;
  viewEndorsement: compSubmissionModel;

  submissionLogs: logsModel[];
  readonly photoUrl = environment.apiUrl + 'images/Company/';

  constructor(
    private Acc: createAccount,
    private programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.Acc.submissionSteps(5, this.user.admin.sectionId).subscribe(
      (eachS) => {
        this.Submission = eachS;
      }
    ),(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    };
    this.programService.getAllTracks().subscribe((resp) => {
      this.trackList = resp;
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }

  response(responseId: number, companyAgrees: boolean, comments: string) {
    this.modalAppear = true;
    var POSTval = {
      id: responseId,
      companyAgrees: companyAgrees,
      comments: comments,
    };
    this.Acc.approvedCompany(POSTval).subscribe((companyA) => {
      this.modalAppear = false;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
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
    this.DisapproveIndicator = false;
    this.modalAppear = true;
    this.Acc.approvedCompany(this.rejectedForm.value).subscribe((companyA) => {
      this.modalAppear = false;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });

    this.ngOnInit();
  }

  toCancelOne() {
    this.ApproveIndicator = false;
  }
  toCancelTwo() {
    this.DisapproveIndicator = false;
  }

  toOpen(eachS: compSubmissionModel) {
    this.FormEntry = true;
    this.FormEntry = true;
    this.viewEndorsement = eachS;
  }

  toClose() {
    this.FormEntry = false;
  }
  getSpecialization(trackId: number): string {
    return this.trackList
      .filter((track) => {
        return track.id == trackId;
      })
      .slice(-1)[0].name;
  }

  viewHistory(id: number) {
    this.submissionHistory = true;
    this.Acc.getLogsBySubmission(id).subscribe((resp) => {
      this.submissionLogs = resp;
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }

  closeHistory() {
    this.submissionHistory = false;
    this.submissionLogs = null;
  }
}
