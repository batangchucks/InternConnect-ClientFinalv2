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
  p: number = 1;
  submission: submissionModel[] = [];
  user = JSON.parse(localStorage.getItem('user'));
  assignIso: number;
  iso:string;
  esig: string;
  isStamp: boolean = true;
  ApproveIndicator: boolean = false;
  DisapproveIndicator: boolean = false;

  disapprovedStudentIso: number;
  selectForm: FormGroup;

  RejectForm: FormGroup;

  AcceptForm:FormGroup;

  rejectModal:boolean;

  rejectedForm:FormGroup;

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
      console.log(eStud);
    });
    this.isoCode.getIsoById(this.user.admin.id).subscribe((eachIso) => {
      this.isoCodeValue = eachIso;
    });

   
    
    
  }
  isoChange() {
    this.iso = (<HTMLInputElement>document.getElementById("isoCode")).value;

    console.log(this.iso);
  }
  approve(adminResponseId: number, isoCode: number) {
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
      this.ngOnInit();
      this.assignIso = null;
     
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

  approveModal(id:number) {
    this.ApproveIndicator = true;
    this.AcceptForm = new FormGroup({
      'id':new FormControl(id),
      acceptedByCoordinator:new FormControl(true),
      comments: new FormControl('')
    })
  }
  rejectedSubmit() {
    this.Acc.coordinatorApprove(
      this.user.admin.id,
      this.assignIso == null || this.assignIso == undefined
        ? this.disapprovedStudentIso
        : this.assignIso,
      this.RejectForm.value
    ).subscribe((updatedVal) => {
      this.ngOnInit();
      this.assignIso = null;
    });
    this.DisapproveIndicator = false;
  }

  toDisapproveModal(id:number) {
    this.rejectModal = true;
    this.rejectedForm = new FormGroup({
      'comments': new FormControl(''),
      'assignIso':new FormControl(''),
      'acceptedByCoordinator': new FormControl(false),
      id: new FormControl(id)
    })
  }

  rejectSubmit() {
  
    var payload = {
      comments:this.rejectedForm.get('comments').value,
      acceptedByCoordinator:this.rejectedForm.get('acceptedByCoordinator').value,
      id: this.rejectedForm.get('id').value
    }


   this.Acc.coordinatorApprove(this.user.admin.id,this.rejectedForm.get('assignIso').value,payload).subscribe(newVal=> {
    this.rejectModal = false; 
    this.ngOnInit();
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
  toCancelOne(){
    this.ApproveIndicator = false;
  }

  // Cancelling disapproval modal
  toCancelTwo() {
    this.DisapproveIndicator = false;
  }

  
}
