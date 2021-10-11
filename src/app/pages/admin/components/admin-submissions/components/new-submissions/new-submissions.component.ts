import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isoCodeListModel } from 'src/app/shared/models/isoCodeList.model';

import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { IsoCodeService } from 'src/app/shared/services/iso-code.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-new-submissions',
  templateUrl: './new-submissions.component.html',
  styleUrls: ['./new-submissions.component.scss'],
})
export class NewSubmissionsComponent implements OnInit {
  submission: submissionModel[] = [];
  user = JSON.parse(localStorage.getItem('user'));
  assignIso:number;

  esig: string;
  isStamp: boolean = true;
  DisapproveIndicator: boolean = false;

  selectForm:FormGroup;


  RejectForm: FormGroup;


  isoCodeValue: isoCodeListModel[] = [];

  readonly photoUrl = environment.apiUrl + 'images/Company/';

  constructor(private Acc: createAccount, private isoCode: IsoCodeService) {}

  ngOnInit(): void {
    this.Acc.getByAccount(this.user.admin.id).subscribe((Acc) => {
      this.esig = Acc.stampFileName;
      if (this.esig == null) {
        this.isStamp = false;
      } else this.isStamp = true;
    });

    this.Acc.newSubmission(this.user.admin.sectionId).subscribe((eStud) => {
      this.submission = eStud;
      console.log(this.submission);
    });
    this.isoCode.getIsoById(this.user.admin.id).subscribe(eachIso=> {
     this.isoCodeValue = eachIso;
      console.log(this.isoCodeValue);
    });
   
   

  }
  

  approve(adminResponseId: number) {
    var PostVal = {
      id: adminResponseId,
      acceptedByCoordinator: true,
      comments: '',
    };
    console.log(this.assignIso);  
    this.Acc.coordinatorApprove(this.user.admin.id,this.assignIso ,PostVal).subscribe(
      (updatedVal) => {
        console.log(updatedVal);
        this.ngOnInit();
        this.assignIso = null;
      }
    );
  }
  onNavigate(path: string) {
    var url = this.photoUrl + path;
    var win = window.open(url, '_blank');
  }
  toDisapprove(responseId:number) {
    this.DisapproveIndicator = true;
    this.RejectForm = new FormGroup({
      'comments': new FormControl(''),
      'id': new FormControl(responseId),
      'acceptedByCoordinator': new FormControl(false)
    });

  }
  rejectedSubmit() {
    this.Acc.coordinatorApprove(this.user.admin.id,this.assignIso,this.RejectForm.value).subscribe(
          (updatedVal) => {
            console.log(updatedVal);
            this.ngOnInit();
            this.assignIso = null;
          }
      );
      this.DisapproveIndicator = false;
  }
  // rejectedSubmit() {
  //   this.Acc.coordinatorDisapprove(this.user.admin.id ,this.RejectForm.value).subscribe(
  //     (updatedVal) => {
  //       console.log(updatedVal);
  //       this.ngOnInit();
  //     }
  //   );
  //   this.DisapproveIndicator = false;
  // }

  toCancelTwo() {
    this.DisapproveIndicator = false;
  }
}
