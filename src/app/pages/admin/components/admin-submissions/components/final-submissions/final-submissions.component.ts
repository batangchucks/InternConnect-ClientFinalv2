import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-final-submissions',
  templateUrl: './final-submissions.component.html',
  styleUrls: ['./final-submissions.component.scss']
})
export class FinalSubmissionsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  Submissions: submissionModel[] = [];
  deanSubmissions: submissionModel[] = [];
  DisapproveIndicatorChair: boolean = false;
  DisapproveIndicatorDean:boolean = false;
  RejectForm: FormGroup;

  constructor(private Acc: createAccount) { }

  stampFileName:string="file";

  ngOnInit(): void {

    

    if(this.user.admin.authId==2 ){
      this.deptChairSubmissionList();
    }
    else if(this.user.admin.authId == 1){
      this.deanSubmissionList();
      this.deanAcc();
    }
    

  }

  deanAcc() {
    this.Acc.getByAccount(this.user.admin.id).subscribe(admin=> {
      this.stampFileName = admin.stampFileName;
      console.log(this.stampFileName);
    });
  }
  deptChairSubmissionList() {
    this.Acc.submissionStep2(this.user.admin.programId).subscribe(appByCoord=> {
      this.Submissions = appByCoord;
    })
  }

  deanSubmissionList() {
    this.Acc.submissionStep3().subscribe(eachS=> {
      console.log(eachS);
      this.deanSubmissions =eachS;
    });
  }
  decision(adminResponseId:number,acceptedByChair:boolean,comments:string) {
    
     
    var Payload = {
        id:adminResponseId,
        acceptedByChair:acceptedByChair,
        comments:comments
    } 
    this.Acc.approvedByChair(Payload).subscribe(approvedS=>{
      this.ngOnInit();
    });
  
  }
  deanDecision(adminResponseId:number,acceptedByDean:boolean,comments:string) {
    var Payload = {
      id:adminResponseId,
      acceptedByDean:acceptedByDean,
      comments:comments
    }
    console.log(Payload);
    console.log(this.user.admin.id);
    this.Acc.approvedbyDean(this.user.admin.id,Payload).subscribe(approved=>{
      this.ngOnInit();
    })

  }

  toDisapproveChair(responseId:number) {
    this.DisapproveIndicatorChair = true;
  
     

      this.RejectForm = new FormGroup({
        'comments': new FormControl(''),
        'id': new FormControl(responseId),
        'acceptedByChair': new FormControl(false)
      });
  }
  toDisapproveDean(responseId:number) {
    console.log("calling");
    this.DisapproveIndicatorDean = true;
  
     

      this.RejectForm = new FormGroup({
        'comments': new FormControl(''),
        'id': new FormControl(responseId),
        'acceptedByDean': new FormControl(false)
      });
  
  }

  rejectedSubmitChair() {
    this.Acc.approvedByChair(this.RejectForm.value).subscribe(
      (updatedVal) => {
        console.log(updatedVal);
        this.ngOnInit();
      }
    );
    this.DisapproveIndicatorChair = false;
  }

  rejectedSubmitDean() {
    console.log("rejected by dean");
    this.Acc.approvedbyDean(this.user.admin.id,this.RejectForm.value).subscribe(
      (updatedVal) => {
        console.log(updatedVal);
        this.ngOnInit();
      }
    );
    this.DisapproveIndicatorDean = false;
  }
 

  toCancelChair() {
    this.DisapproveIndicatorChair = false;
  }
  toCancelDean() {
    this.DisapproveIndicatorDean = false;
  }

}
