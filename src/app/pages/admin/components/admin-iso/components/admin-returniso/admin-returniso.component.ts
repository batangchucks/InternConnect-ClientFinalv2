import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isoCodeListModel } from 'src/app/shared/models/isoCodeList.model';
import { sectionModel } from 'src/app/shared/models/section.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IsoCodeService } from 'src/app/shared/services/iso-code.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-admin-returniso',
  templateUrl: './admin-returniso.component.html',
  styleUrls: ['./admin-returniso.component.scss'],
})
export class AdminReturnisoComponent implements OnInit {
  TransferIndicator: boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  selectedOption:number;
  assignForm: FormGroup;
  section:sectionModel[] = [];
  sectionId:number;
  isoCodeListM: isoCodeListModel[] = [];

  constructor(
    private Auth: AuthenticationService,
    private isoCode: IsoCodeService,
    private program: ProgramService
  ) {}
  coordinatorListTransfer:any[];
  coordinatorList:any[];
  isoCodeList: any[]

  ngOnInit(): void {
    this.isoCode.getCoordinatorData(this.user.admin.programId).subscribe((val:[any])=>{
      this.coordinatorList = val
      console.log(val);
    })

    // this.isoCode.getIsoCode(this.user.admin.programId).subscribe(val)=>{
    //   this.isoCodeList = val
    //   console.log(val)
    // });
    this.isoCode.getIsoCode(this.user.admin.programId).subscribe(eachIso=>{
      this.isoCodeListM = eachIso;
      console.log(this.isoCodeListM);
    })
    this.program.getSection(this.user.admin.programId).subscribe(eachS=> {
      this.section = eachS;

    })
  }

  toTransfer(isoCodeId:number,code:number) {

    this.TransferIndicator = true;

    this.assignForm = new FormGroup({
      'id': new FormControl(isoCodeId),
      'code': new FormControl(code),
      'programId':new FormControl(this.user.admin.programId),
     
    });

    this.isoCode.getCoordinatorData(this.user.admin.programId).subscribe((val:[any])=> {
      this.coordinatorListTransfer = val;
     
    })

  }

  submit() {
    this.TransferIndicator = false;
    this.isoCode.transferIso(this.assignForm.value, this.selectedOption).subscribe(isoC=> {
      console.log(isoC);
      this.ngOnInit();
    })
  }

  deleteIso(id:number) {
    this.isoCode.deleteIsoCode(id).subscribe(deletedIso=> {
      this.ngOnInit();
      console.log(deletedIso);
    });
  }

  toCancel() {
    this.TransferIndicator = false;
  }



  logout() {
    this.Auth.logout();
  }

  changeCoordinator(event) {
    console.log(event.targetValue);
  }
}
