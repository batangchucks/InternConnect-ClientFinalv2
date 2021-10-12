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
  p: number = 1;
  pIso: number = 1;
  pSummary: number = 1;
  TransferIndicator: boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  selectedOption: number;
  assignForm: FormGroup;
  section: sectionModel[] = [];
  sectionId: number;
  isoCodeListM: isoCodeListModel[] = [];
  indicator: boolean = null;
  returnedIso: isoCodeListModel[] = [];

  constructor(
    private Auth: AuthenticationService,
    private isoCode: IsoCodeService,
    private program: ProgramService
  ) {}
  coordinatorListTransfer: any[];
  coordinatorList: any[];
  isoCodeList: any[];
  isoCoordinator: isoCodeListModel[] = [];

  ngOnInit(): void {
    if (this.user.admin.authId == 2) {
      // this.isoCode.getCoordinatorData(this.user.admin.programId).subscribe((val:[any])=>{
      //   this.coordinatorList = val

      // })

      // get iso per program

      this.isoCode.getReturnIso(this.user.admin.id).subscribe((returnedIso) => {
        this.returnedIso = returnedIso;
      });
      this.isoCode
        .getIsoCode(this.user.admin.programId)
        .subscribe((eachIso) => {
          this.isoCodeListM = eachIso;
        });
      this.program.getSection(this.user.admin.programId).subscribe((eachS) => {
        this.section = eachS;
      });
    } else if (this.user.admin.authId == 3) {
      this.isoCode.getISObyCoord(this.user.admin.id).subscribe((eachIso) => {
        this.isoCoordinator = eachIso;
      });
    }
  }

  toTransfer(isoCodeId: number, code: number) {
    this.TransferIndicator = true;

    this.assignForm = new FormGroup({
      id: new FormControl(isoCodeId),
      code: new FormControl(code),
      programId: new FormControl(this.user.admin.programId),
    });

    this.isoCode
      .getCoordinatorData(this.user.admin.programId)
      .subscribe((val: [any]) => {
        this.coordinatorListTransfer = val;
      });
  }

  returnIso(id: number, code: number) {
    var Payload = [
      {
        id: id,
        code: code,
        programId: this.user.admin.programId,
      },
    ];

    this.isoCode
      .returnToChair(this.user.admin.programId, Payload)
      .subscribe((eachS) => {
        this.ngOnInit();
      });
  }

  submit() {
    this.TransferIndicator = false;
    this.isoCode
      .transferIso(this.assignForm.value, this.selectedOption)
      .subscribe((isoC) => {
        this.ngOnInit();
      });
  }

  deleteIso(id: number) {
    this.isoCode.deleteIsoCode(id).subscribe((deletedIso) => {
      this.ngOnInit();
    });
  }

  toCancel() {
    this.TransferIndicator = false;
  }

  logout() {
    this.Auth.logout();
  }

  changeCoordinator(event) {}
}
