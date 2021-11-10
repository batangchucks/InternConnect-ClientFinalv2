import { Component, OnInit } from '@angular/core';
import { logsModel } from 'src/app/shared/models/logs.model';
import { compSubmissionModel, submissionModel } from 'src/app/shared/models/submission.model';
import { tracksModel } from 'src/app/shared/models/tracks.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pending-submissions',
  templateUrl: './pending-submissions.component.html',
  styleUrls: ['./pending-submissions.component.scss'],
})
export class PendingSubmissionsComponent implements OnInit {
  transactionLoader: boolean = false;

  confirmSend: boolean = false;
  FormEntry: boolean = false;
  submissionHistory: boolean = false;

  trackName: string;
  trackList: tracksModel[];
  submissionLogs: logsModel[];

  p: number = 1;
  Submission: compSubmissionModel[] = [];
  viewEndorsement: compSubmissionModel;
  readonly photoUrl = environment.apiUrl + 'images/Company/';
  constructor(
    private Acc: createAccount,
    private programService: ProgramService
  ) {}
  user = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.Acc.submissionSteps(4, this.user.admin.sectionId).subscribe(
      (eachS) => {
        this.Submission = eachS;
      },(err:Error)=> {

        this.ngOnInit();
      }
    );
    this.programService.getAllTracks().subscribe((resp) => {
      this.trackList = resp;
    },(err:Error)=> {

      this.ngOnInit();
    });
  }
  downloadPdf(submissionId: number) {
    this.Acc.approvedPending(submissionId).subscribe((pdfGeneration) => {
      var blob = new Blob([pdfGeneration], { type: 'application/pdf' });

      let url = window.URL.createObjectURL(blob);
      window.open(url);
    },(err:Error)=> {

      this.ngOnInit();
    });
  }
  sendToCompany(responseId: number) {
    this.transactionLoader = true;
    var Payload = {
      id: responseId,
      emailSentByCoordinator: true,
      comments: '',
    };
    this.Acc.emailSent(Payload).subscribe((response) => {
      this.transactionLoader = false;
      this.ngOnInit();
    },(err:Error)=> {

      this.ngOnInit();
    });
  }

  toCancel() {
    this.confirmSend = false;
  }

  toOpen(eachS: compSubmissionModel) {
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

      this.ngOnInit();
    });
  }

  closeHistory() {
    this.submissionHistory = false;
    this.submissionLogs = null;
  }
}
