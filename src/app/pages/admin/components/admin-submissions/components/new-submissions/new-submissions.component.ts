import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isoCodeListModel } from 'src/app/shared/models/isoCodeList.model';
import { logsModel } from 'src/app/shared/models/logs.model';

import { submissionModel } from 'src/app/shared/models/submission.model';
import { tracksModel } from 'src/app/shared/models/tracks.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { IsoCodeService } from 'src/app/shared/services/iso-code.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-new-submissions',
  templateUrl: './new-submissions.component.html',
  styleUrls: ['./new-submissions.component.scss'],
})
export class NewSubmissionsComponent implements OnInit {
  p: number = 1;
  submission: submissionModel[] = [];
  user = JSON.parse(localStorage.getItem('user'));
  assignIso: number;
  iso: string;
  esig: string;
  isStamp: boolean = true;
  ApproveIndicator: boolean = false;
  FormEntry: boolean = false;
  DisapproveIndicator: boolean = false;
  submissionHistory: boolean = false;
  onAcceptLoading: boolean = false;

  disapprovedStudentIso: number;
  selectForm: FormGroup;

  RejectForm: FormGroup;

  AcceptForm: FormGroup;

  trackList: tracksModel[]
  trackName: string
  rejectModal: boolean;

  rejectedForm: FormGroup;

  isoCodeValue: isoCodeListModel[] = [];

  viewEndorsement: submissionModel;

  submissionLogs: logsModel[];

  readonly photoUrl = environment.apiUrl + 'images/Company/';

  constructor(private Acc: createAccount, private isoCode: IsoCodeService, private programService: ProgramService) {}

  ngOnInit(): void {
    this.Acc.getByAccount(this.user.admin.id).subscribe((Acc) => {
      this.esig = Acc.stampFileName;
      if (this.esig == null) {
        this.isStamp = false;
      } else this.isStamp = true;
    });

    this.Acc.submissionSteps(1,this.user.admin.sectionId).subscribe((eStud) => {
      this.submission = eStud;
      console.log(eStud);
    });
    this.isoCode.getIsoById(this.user.admin.id).subscribe((eachIso) => {
      this.isoCodeValue = eachIso;
    });
        this.programService.getAllTracks().subscribe((resp) => {
          this.trackList = resp;
        });
  }
  isoChange() {
    this.iso = (<HTMLInputElement>document.getElementById('isoCode')).value;

    console.log(this.iso);
  }
  approve(adminResponseId: number, isoCode: number) {
    this.onAcceptLoading = true;
    var PostVal = {
      id: adminResponseId,
      acceptedByCoordinator: true,
      comments: '',
    };

    this.Acc.coordinatorApprove(
      this.user.admin.id,
      this.assignIso == null || this.assignIso == undefined
        ? isoCode
        : this.assignIso,
      PostVal
    ).subscribe((updatedVal) => {
      this.ngOnInit();
      this.assignIso = null;
      this.onAcceptLoading = false;
    });
  }

  approveAssign() {
    var PostVal = {
      id: this.AcceptForm.get('id').value,
      acceptedByCoordinator: true,
      comments: '',
    };

    this.Acc.coordinatorApprove(
      this.user.admin.id,
      this.assignIso,
      PostVal
    ).subscribe((updatedVal) => {
      this.ApproveIndicator = false;

      this.assignIso = null;
      this.ngOnInit();
    });
  }
  onNavigate(path: string) {
    var url = this.photoUrl + path;
    var win = window.open(url, '_blank');
  }
  toDisapprove(responseId: number, isoCode: number) {
    this.DisapproveIndicator = true;
    this.disapprovedStudentIso = isoCode;
    this.RejectForm = new FormGroup({
      comments: new FormControl(''),
      id: new FormControl(responseId),
      acceptedByCoordinator: new FormControl(false),
    });
  }

  approveModal(id: number) {
    this.ApproveIndicator = true;
    this.AcceptForm = new FormGroup({
      id: new FormControl(id),
      acceptedByCoordinator: new FormControl(true),
      comments: new FormControl(''),
    });
  }
  rejectedSubmit() {
    // this.DisapproveIndicator = false;
    // this.onAcceptLoading = true;
    // if(this.RejectForm.get('comments').value == '' || this.RejectForm.get('comments').value == null) {
    //   this.RejectForm.get('comments').setValue('No Comment')
    // }

    // console.log("working");
    // this.Acc.coordinatorApprove(
    //   this.user.admin.id,0,
    //   this.RejectForm.value
    // ).subscribe((updatedVal) => {
    //   console.log(updatedVal);
    //   this.onAcceptLoading = false;
    //   this.assignIso = null;

    //   this.ngOnInit();
    // });
  }

  toDisapproveModal(id: number) {
    this.rejectModal = true;
    this.rejectedForm = new FormGroup({
      comments: new FormControl(''),
      assignIso: new FormControl(''),
      acceptedByCoordinator: new FormControl(false),
      id: new FormControl(id),
    });
  }

  rejectSubmit() {
    this.rejectModal = false;
    this.onAcceptLoading = true
    var payload = {
      comments: this.rejectedForm.get('comments').value == '' || this.rejectedForm.get('comments').value == null? 'No Comment' : this.rejectedForm.get('comments').value ,
      acceptedByCoordinator: this.rejectedForm.get('acceptedByCoordinator')
        .value,
      id: this.rejectedForm.get('id').value,
    };
    
    // pass the value of the iso code as the initial state
    this.Acc.coordinatorApprove(
      this.user.admin.id,
      5,
      payload
    ).subscribe((newVal) => {
      this.onAcceptLoading = false
      this.ngOnInit();
    });
  }


  previewSub(id:number) {
    // this.Acc.viewSubmission(id).subscribe(subm=> {
    //   console.log(subm);
    //   // var blob = new Blob([subm], { type: 'application/pdf' });

    //   // let url = window.URL.createObjectURL(blob);
    //   // console.log(url);
    //   // window.open(url);
    // })


    this.Acc.viewSubmission(id).subscribe(sub=> {
     var blob = new Blob([sub], { type: 'application/pdf' });

      let url = window.URL.createObjectURL(blob);
      console.log(url);
      window.open(url);
    })
  }
  // rejectedSubmit() {
  //   this.Acc.coordinatorDisapprove(this.user.admin.id ,this.RejectForm.value).subscribe(
  //     (updatedVal) => {

  //       this.ngOnInit();
  //     }
  //   );
  //   this.DisapproveIndicator = false;
  // }

  // Cancelling approval modal
  toCancelOne() {
    this.ApproveIndicator = false;
  }

  // Cancelling disapproval modal
  toCancelTwo() {
    this.DisapproveIndicator = false;
  }

  toCancelThree() {
    this.rejectModal = false;
  }

  toOpen(eachS:submissionModel) {
    this.FormEntry = true;
    this.viewEndorsement = eachS;

  }

  toClose() {
    this.FormEntry = false;
  }

    getSpecialization(trackId: number): string{
    return this.trackList
      .filter((track) => {
        return track.id == trackId;
      })
      .slice(-1)[0].name;
  }

  viewHistory(id: number) {
    this.submissionHistory = true;
    this.Acc.getLogsBySubmission(id).subscribe(resp => {
      this.submissionLogs = resp;
    })
  }

  closeHistory() {
    this.submissionHistory = false;
    this.submissionLogs = null;
  }

}
