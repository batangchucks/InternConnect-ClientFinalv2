import { Component, OnInit } from '@angular/core';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pending-submissions',
  templateUrl: './pending-submissions.component.html',
  styleUrls: ['./pending-submissions.component.scss'],
})
export class PendingSubmissionsComponent implements OnInit {
  transactionLoader:boolean = false

  confirmSend: boolean = false;
  FormEntry: boolean = false;

  p: number = 1;
  Submission: submissionModel[] = [];
  viewEndorsement:submissionModel;
  readonly photoUrl = environment.apiUrl + 'images/Company/';
  constructor(private Acc: createAccount) {}
  user = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.Acc.submissionStep4(this.user.admin.sectionId).subscribe((eachS) => {
      this.Submission = eachS;
    });
  }
  downloadPdf(submissionId: number) {
    this.Acc.approvedPending(submissionId).subscribe((pdfGeneration) => {
      var blob = new Blob([pdfGeneration], { type: 'application/pdf' });

      let url = window.URL.createObjectURL(blob);
      window.open(url);
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
      this.transactionLoader = false
      this.ngOnInit();
    });
  }

  toCancel(){
    this.confirmSend = false;
  }

  toOpen(eachS:submissionModel){
    this.FormEntry = true;
    this.viewEndorsement = eachS;
  }

  toClose(){
    this.FormEntry = false;
  }
}
