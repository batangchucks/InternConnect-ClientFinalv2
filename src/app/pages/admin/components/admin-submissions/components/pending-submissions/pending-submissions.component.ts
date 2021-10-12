import { Component, OnInit } from '@angular/core';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-pending-submissions',
  templateUrl: './pending-submissions.component.html',
  styleUrls: ['./pending-submissions.component.scss'],
})
export class PendingSubmissionsComponent implements OnInit {
  p: number = 1;
  Submission: submissionModel[] = [];

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
    var Payload = {
      id: responseId,
      emailSentByCoordinator: true,
      comments: '',
    };
    this.Acc.emailSent(Payload).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
