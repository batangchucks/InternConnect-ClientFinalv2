import { Component, OnInit } from '@angular/core';
import { programModel } from 'src/app/shared/models/programs.model';

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
  selectedProg:number;
  programs:programModel[] = [];
  changeSec:string;

  
  constructor(private section: ProgramService, private Acc: createAccount,private Program:ProgramService) {}

  ngOnInit(): void {
    if(this.user.admin.authId == 1) {
     
      this.Program.getProgram().subscribe(eachP=> {
        this.programs = eachP;
      })
    }
    if(this.user.admin.authId == 2) {
      this.section.getSection(this.user.admin.programId).subscribe((eachS) => {
        console.log(eachS);
        this.Section = eachS;
      });
    }

    if(this.user.admin.authId== 3) {
     
      this.section.getSection(this.user.admin.programId).subscribe((eachS) => {
        console.log(eachS);
        this.Section = eachS;
      });

     this.selectedSec = this.user.admin.sectionId;
    }
    
    

   

    this.Acc.getAllSubmission().subscribe((eachS) => {
      this.submission = eachS;
      console.log(this.submission);

      this.submission.map((eachS) => {
        this.id += 'ids=' + eachS.id + '&';
      });
    });
  }
  Status() {

    if(this.user.admin.authId == 1) {
      this.Program.getSection(this.selectedProg).subscribe(eachS=> {
        this.Section = eachS;
      })

    }
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
