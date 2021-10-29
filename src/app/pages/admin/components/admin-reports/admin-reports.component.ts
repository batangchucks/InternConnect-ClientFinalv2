import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { programModel } from 'src/app/shared/models/programs.model';
import { ReportsModel } from 'src/app/shared/models/reports.model';

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
  submission: ReportsModel[] = [];
  id: string = '';
  filteredSubmit: ReportsModel[] = [];
  selectedProg: number;
  programs: programModel[] = [];
  changeSec: string;

  modalAppear:boolean = false;

  constructor(
    private section: ProgramService,
    private Acc: createAccount,
    private Program: ProgramService
  ) {}

  ngOnInit(): void {
    if (this.user.admin.authId == 1) {
      this.Program.getProgram().subscribe((eachP) => {
        this.programs = eachP;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });

      this.Acc.getAllSubmission().subscribe((eachS) => {
        this.submission = eachS;
        this.filteredSubmit = eachS;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
    }
    if (this.user.admin.authId == 2) {
      this.section.getSection(this.user.admin.programId).subscribe((eachS) => {
        console.log(eachS);

        this.Section = eachS;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });

      this.Acc.getSubmissionForChair(this.user.admin.programId).subscribe(
        (eachSub) => {
          this.submission = eachSub;
          this.filteredSubmit = eachSub;
          console.log(this.submission);
          console.log(this.filteredSubmit);
        }
      ),(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      };
    }

    if (this.user.admin.authId == 3) {
      this.section.getSection(this.user.admin.programId).subscribe((eachS) => {
        console.log(eachS);
        this.Section = eachS;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });

      this.selectedSec = this.user.admin.sectionId;

      this.Acc.getSubmissionForCoord(this.user.admin.sectionId).subscribe(
        (eachSub) => {
          this.submission = eachSub;
          this.filteredSubmit = eachSub;
          console.log(eachSub.length);
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        }
      );
    }
    //  wrong
  }
  Status() {
    this.modalAppear = true;

    if (this.user.admin.authId == 1) {
      this.Program.getSection(this.selectedProg).subscribe((eachS) => {
        this.Section = eachS;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
      this.Acc.filterSubmissionDean(
        this.selectedSec,
        this.status,
        this.selectedProg
      ).subscribe((eachP) => {
        this.filteredSubmit = eachP;
        this.modalAppear = false;
        this.id = '';
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
    }
    if (this.user.admin.authId == 2) {
      this.Acc.filterSubmissionChair(
        this.selectedSec,
        this.status,
        this.user.admin.programId
      ).subscribe((eachSub) => {
        this.filteredSubmit = eachSub;
        console.log(this.filteredSubmit);
        this.id = '';
        this.modalAppear = false;
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
    }

    if (this.user.admin.authId == 3) {
      this.Acc.filterSubmissionCord(this.selectedSec, this.status).subscribe(
        (eachS) => {
          this.filteredSubmit = eachS;
          this.id = '';
          this.modalAppear = false;
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        }
      );
    }
  }

  onFilterChange(value) {
    this.p = 1;
  }

  download() {
    this.id = this.id.substring(0, this.id.length - 1);
    let payload = [];

    this.filteredSubmit.map((eachS) => {
      const id = eachS.id;
      payload.push({ submissionId: id });
    });

    console.log(payload);

    this.Acc.getFileUpload(payload).subscribe((file) => {
      const url = window.URL.createObjectURL(file);
      window.open(url);
      this.id = '';
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }
}
