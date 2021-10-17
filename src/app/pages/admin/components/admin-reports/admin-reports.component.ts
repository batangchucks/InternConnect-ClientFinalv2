import { Component, OnInit } from '@angular/core';

import { sectionModel } from 'src/app/shared/models/section.model';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));

  p: number = 1;
  Section: sectionModel[] = [];
  selectedSec: number;
  status: string;
  submission: submissionModel[] = [];
  id: string = '';
  filteredSubmit: submissionModel[] = [];

  constructor(private section: ProgramService, private Acc: createAccount) {}

  ngOnInit(): void {
    this.section.getSection(this.user.admin.programId).subscribe((eachS) => {
      this.Section = eachS;
    });

    this.Acc.getAllSubmission().subscribe((eachS) => {
      this.submission = eachS;
      console.log(this.submission);

      this.submission.map((eachS) => {
        this.id += 'ids=' + eachS.id + '&';
      });
    });
  }
  Status() {
    this.Acc.filterSubmission(this.selectedSec, this.status).subscribe(
      (eachS) => {
        this.filteredSubmit = eachS;
        this.id = '';

        console.log(this.selectedSec);
        console.log(this.status);
        this.filteredSubmit.map((eachS) => {
          this.id += 'ids=' + eachS.id + '&';
        });
        console.log(this.id);
      }
    );
  }
  download() {
    this.id = this.id.substring(0, this.id.length - 1);
    console.log(this.id);
    this.Acc.getFileUpload(this.id).subscribe((file) => {
      const url = window.URL.createObjectURL(file);
      window.open(url);
      this.id = '';
    });
  }
}
