import { Component, OnInit } from '@angular/core';

import { programModel } from 'src/app/shared/models/programs.model';
import { ReportsModel } from 'src/app/shared/models/reports.model';

import { sectionModel } from 'src/app/shared/models/section.model';
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
  Submissions: ReportsModel[] = [];
  id: string = '';
  filteredSubmit: ReportsModel[] = [];
  selectedProg: number;
  programs: programModel[] = [];
  changeSec: string;


  SubmissionsCopy: ReportsModel[] = [];
  SubmissionSectionCopy: ReportsModel[] = []
  SubmissionStatusCopy: ReportsModel[]=[]
  incrProgram: number = 0;
  incrSection: number = 0;
  incrStatus: number = 0;

  modalAppear: boolean = false;

  constructor(
    private section: ProgramService,
    private Acc: createAccount,
    private Program: ProgramService
  ) {}

  ngOnInit(): void {
    if (this.user.admin.authId == 1) {
      this.Program.getProgram().subscribe(
        (eachP) => {
          this.programs = eachP;
        },
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        }
      );

      this.Acc.getAllSubmission().subscribe(
        (eachS) => {
          this.Submissions = eachS;
          this.SubmissionsCopy = eachS;
          this.filteredSubmit = eachS;
        },
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        }
      );
    }
    if (this.user.admin.authId == 2) {
      this.section.getSection(this.user.admin.programId).subscribe(
        (eachS) => {
          console.log(eachS);

          this.Section = eachS;
        },
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        }
      );

      this.Acc.getSubmissionForChair(this.user.admin.programId).subscribe(
        (eachSub) => {
          this.Submissions = eachSub;
          this.SubmissionsCopy = eachSub;
          this.filteredSubmit = eachSub;
          console.log(this.Submissions);
          console.log(this.filteredSubmit);
        }
      ),
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        };
    }

    if (this.user.admin.authId == 3) {
      this.section.getSection(this.user.admin.programId).subscribe(
        (eachS) => {
          console.log(eachS);
          this.Section = eachS;
        },
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        }
      );

      this.selectedSec = this.user.admin.sectionId;

      this.Acc.getSubmissionForCoord(this.user.admin.sectionId).subscribe(
        (eachSub) => {
          this.Submissions = eachSub;
          this.SubmissionsCopy = eachSub;
          this.filteredSubmit = eachSub;
          console.log(eachSub.length);
        },
        (err: Error) => {
          alert('An error has occured');
          this.ngOnInit();
        }
      );
    }
    //  wrong
  }
  // Status() {
  //   this.modalAppear = true;

  //   if (this.user.admin.authId == 1) {
  //     this.Program.getSection(this.selectedProg).subscribe(
  //       (eachS) => {
  //         this.Section = eachS;
  //       },
  //       (err: Error) => {
  //         alert('An error has occured');
  //         this.ngOnInit();
  //       }
  //     );
  //     this.Acc.filterSubmissionDean(
  //       this.selectedSec,
  //       this.status,
  //       this.selectedProg
  //     ).subscribe(
  //       (eachP) => {
  //         this.filteredSubmit = eachP;
  //         this.modalAppear = false;
  //         this.id = '';
  //       },
  //       (err: Error) => {
  //         alert('An error has occured');
  //         this.ngOnInit();
  //       }
  //     );
  //   }
  //   if (this.user.admin.authId == 2) {
  //     this.Acc.filterSubmissionChair(
  //       this.selectedSec,
  //       this.status,
  //       this.user.admin.programId
  //     ).subscribe(
  //       (eachSub) => {
  //         this.filteredSubmit = eachSub;
  //         console.log(this.filteredSubmit);
  //         this.id = '';
  //         this.modalAppear = false;
  //       },
  //       (err: Error) => {
  //         alert('An error has occured');
  //         this.ngOnInit();
  //       }
  //     );
  //   }

  //   if (this.user.admin.authId == 3) {
  //     this.Acc.filterSubmissionCord(this.selectedSec, this.status).subscribe(
  //       (eachS) => {
  //         this.filteredSubmit = eachS;
  //         this.id = '';
  //         this.modalAppear = false;
  //       },
  //       (err: Error) => {
  //         alert('An error has occured');
  //         this.ngOnInit();
  //       }
  //     );
  //   }
  // }

  StatusProgram(filterId: number) {

    this.incrProgram++;
    if (this.incrProgram == 1) {
      this.Submissions = this.Submissions.filter((subs) => {
        return subs.programId == filterId;
      });
      this.SubmissionSectionCopy = this.Submissions;
    } else {
      this.Submissions = this.SubmissionsCopy.filter((subs) => {
        return subs.programId == filterId;
      });
    this.SubmissionSectionCopy = this.Submissions;
    }
    this.Program.getSection(filterId).subscribe((resp) => {
      this.Section = resp;
    });
    this.selectedSec = null;
    this.status = null;
  }



  StatusSection(filterId: number) {
              this.incrSection++;
    if (this.user.admin.authId == 1 || this.user.admin.authId == 4) {
          if (this.incrSection == 1) {
            this.Submissions = this.Submissions.filter((subs) => {
              return subs.sectionId == filterId;
            });
            this.SubmissionStatusCopy = this.Submissions;
          } else {
            this.Submissions = this.SubmissionSectionCopy.filter((subs) => {
              return subs.sectionId == filterId;
            });
            this.SubmissionStatusCopy = this.Submissions;
      }
      return
    }


    if (this.incrSection == 1) {
                  this.Submissions = this.Submissions.filter((subs) => {
                    return subs.sectionId == filterId;
                  });
      this.SubmissionSectionCopy = this.Submissions;
    }
    else {
      this.Submissions = this.SubmissionsCopy.filter((subs) => {
        return subs.sectionId == filterId;

      });
            this.SubmissionSectionCopy = this.Submissions;
    }
      this.status = null;
  }

  StatusSubmission(status: string) {
        this.incrStatus++;
    if (this.user.admin.authId == 1 || this.user.admin.authId == 4) {
      if (this.incrStatus == 1) {
        this.Submissions = this.Submissions.filter((subs) => {
          return subs.submissionStatus == status;
        });
      } else {
        this.Submissions = this.SubmissionStatusCopy.filter((subs) => {
          return subs.submissionStatus == status;
        });
      }
    }

        if (this.user.admin.authId == 2) {
          if (this.incrStatus == 1) {
            this.Submissions = this.Submissions.filter((subs) => {
              return subs.submissionStatus == status;
            });
          } else {
            this.Submissions = this.SubmissionSectionCopy.filter((subs) => {
              return subs.submissionStatus == status;
            });
          }
    }

      if (this.user.admin.authId == 3) {
        if (this.incrStatus == 1) {
          this.Submissions = this.Submissions.filter(subs => {
            return subs.submissionStatus == status
          })
        }
        else {
          this.Submissions = this.SubmissionsCopy.filter(subs => {
            return subs.submissionStatus == status
          })
        }
      }




  }

  onFilterChange(value) {
    this.p = 1;
  }

  download() {
    // this.id = this.id.substring(0, this.id.length - 1);
    let payload = [];

    this.Submissions.forEach(subs => {
      payload.push({submissionId: subs.id})
    });

    // this.filteredSubmit.map((eachS) => {
    //   const id = eachS.id;
    //   payload.push({ submissionId: id });
    // });


    this.Acc.getFileUpload(payload).subscribe(
      (file) => {
        const url = window.URL.createObjectURL(file);
        window.open(url);
        this.id = '';
      },
      (err: Error) => {
        alert('An error has occured');
        this.ngOnInit();
      }
    );
  }
}
