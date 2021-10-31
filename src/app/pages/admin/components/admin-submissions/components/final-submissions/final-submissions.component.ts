import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { logsModel } from 'src/app/shared/models/logs.model';
import { compSubmissionModel, submissionModel } from 'src/app/shared/models/submission.model';
import { tracksModel } from 'src/app/shared/models/tracks.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-final-submissions',
  templateUrl: './final-submissions.component.html',
  styleUrls: ['./final-submissions.component.scss'],
})
export class FinalSubmissionsComponent implements OnInit {
  //loaderPhases
  loadPhaseOne: boolean = false;
  loadPhaseTwo: boolean = false;
  loadPhaseThree: boolean = false;
  loadPhaseFour: boolean = false;
  loadPhaseFive: boolean = false;

  onDeanSubmit: boolean = false;

  onAcceptLoader: boolean = false;
  p: number = 1;
  user = JSON.parse(localStorage.getItem('user'));
  Submissions: compSubmissionModel[] = [];
  deanSubmissions: compSubmissionModel[] = [];
  ApproveIndicatorChair: boolean = false;
  ApproveIndicatorDean: boolean = false;
  DisapproveIndicatorChair: boolean = false;
  DisapproveIndicatorDean: boolean = false;
  FormEntry: boolean = false;
  submissionHistory: boolean = false;
  RejectForm: FormGroup;
  submissionLogs: logsModel[];

  deanPayload: {
    adminResponseId: number;
    acceptedByDeans: boolean;
    comments: string;
  };

  readonly photoUrl = environment.apiUrl + 'images/Company/';
  viewEndorsement: compSubmissionModel;

  constructor(
    private Acc: createAccount,
    private programService: ProgramService
  ) {}

  stampFileName: string = 'file';
  trackName: string;
  trackList: tracksModel[];

  ngOnInit(): void {
    if (this.user.admin.authId == 2) {
      this.deptChairSubmissionList();
    } else if (this.user.admin.authId == 1) {
      this.deanSubmissionList();
      this.deanAcc();
    }

    this.programService.getAllTracks().subscribe((resp) => {
      this.trackList = resp;
    });
  }

  deanAcc() {
    this.Acc.getByAccount(this.user.admin.id).subscribe(
      (admin) => {
        this.stampFileName = admin.stampFileName;
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }
  deptChairSubmissionList() {
    this.Acc.submissionSteps(2, this.user.admin.programId).subscribe(
      (appByCoord) => {
        this.Submissions = appByCoord;
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }

  deanSubmissionList() {
    this.Acc.submissionSteps(3, 5).subscribe(
      (eachS) => {
        this.deanSubmissions = eachS;
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }

  decision(
    adminResponseId: number,
    acceptedByChair: boolean,
    comments: string
  ) {
    this.ApproveIndicatorChair = true;
    var Payload = {
      id: adminResponseId,
      acceptedByChair: acceptedByChair,
      comments: comments,
    };
    this.Acc.approvedByChair(Payload).subscribe(
      (approvedS) => {
        this.ApproveIndicatorChair = false;
        this.ngOnInit();
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }

  deanApprove(
    adminResponseIds: number,
    acceptedByDeans: boolean,
    commentss: string
  ) {
    this.deanPayload = {
      adminResponseId: adminResponseIds,
      acceptedByDeans: acceptedByDeans,
      comments: commentss
    };
    this.ApproveIndicatorDean = true;
  }

  deanDecision(
  ) {
    const obs$ = interval(2000);
    var Payload = {
      id: this.deanPayload.adminResponseId,
      acceptedByDean: this.deanPayload.acceptedByDeans,
      comments: this.deanPayload.comments,
    };
    this.loadPhaseOne = false;
    this.loadPhaseTwo = false;
    this.loadPhaseThree = false;
    this.loadPhaseFour = false;

    this.loadPhaseOne = true;
    this.onDeanSubmit = true;
    obs$.subscribe((d) => {
      if (d == 0) {
        this.loadPhaseOne = false;
        this.loadPhaseTwo = true;
      }
      if (d == 1) {
        this.loadPhaseTwo = false;
        this.loadPhaseThree = true;
      }
      if (d == 2) {
        this.loadPhaseThree = false;
        this.loadPhaseFour = true;
      }
    });

    this.Acc.approvedbyDean(this.user.admin.id, Payload).subscribe(
      (approved) => {
        this.onDeanSubmit = false;
        this.ApproveIndicatorDean = false
        this.deanPayload = null
        this.ngOnInit();
      },
      (err) => {
        this.onDeanSubmit = false;
        this.ApproveIndicatorDean = false;
        this.deanPayload= null
        this.ngOnInit();
      }
    );
  }

  deanTimer(id: number): void {
    if (id == 2) {
      this.loadPhaseTwo = false;
      this.loadPhaseThree = true;
    }
    if (id == 3) {
      this.loadPhaseTwo = false;
      this.loadPhaseThree = true;
    }
    if (id == 4) {
      this.loadPhaseTwo = false;
      this.loadPhaseThree = true;
    }
  }

  toDisapproveChair(responseId: number) {
    this.DisapproveIndicatorChair = true;

    this.RejectForm = new FormGroup({
      comments: new FormControl(''),
      id: new FormControl(responseId),
      acceptedByChair: new FormControl(false),
    });
  }
  toDisapproveDean(responseId: number) {
    this.DisapproveIndicatorDean = true;

    this.RejectForm = new FormGroup({
      comments: new FormControl(''),
      id: new FormControl(responseId),
      acceptedByDean: new FormControl(false),
    });
  }

  rejectedSubmitChair() {
    this.Acc.approvedByChair(this.RejectForm.value).subscribe(
      (updatedVal) => {
        this.ngOnInit();
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
    this.DisapproveIndicatorChair = false;
  }

  rejectedSubmitDean() {
    this.Acc.approvedbyDean(
      this.user.admin.id,
      this.RejectForm.value
    ).subscribe(
      (updatedVal) => {
        this.ngOnInit();
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
    this.DisapproveIndicatorDean = false;
  }

  toCancelChair() {
    this.DisapproveIndicatorChair = false;
  }

  toCancelDean() {
    this.DisapproveIndicatorDean = false;
  }

  toCancelAC() {
    this.ApproveIndicatorChair = false;
  }

  toCancelAD() {
    this.ApproveIndicatorDean = false;
    this.deanPayload = null
  }

  toOpen(eachS: compSubmissionModel) {
    this.FormEntry = true;

    this.viewEndorsement = eachS;
  }

  toClose() {
    this.FormEntry = false;
  }

  previewSub(id: number) {
    // this.Acc.viewSubmission(id).subscribe(subm=> {
    //   console.log(subm);
    //   // var blob = new Blob([subm], { type: 'application/pdf' });

    //   // let url = window.URL.createObjectURL(blob);
    //   // console.log(url);
    //   // window.open(url);
    // })

    this.Acc.viewSubmission(id).subscribe((sub) => {
      var blob = new Blob([sub], { type: 'application/pdf' });

      let url = window.URL.createObjectURL(blob);
      console.log(url);
      window.open(url);
    });
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
    this.Acc.getLogsBySubmission(id).subscribe(
      (resp) => {
        this.submissionLogs = resp;
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }
  closeHistory() {
    this.submissionHistory = false;
    this.submissionLogs = null;
  }
}
