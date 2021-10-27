import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminUpdateProgram } from 'src/app/shared/models/admin.model';
import { chairModel } from 'src/app/shared/models/chair.model';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.scss'],
})
export class ChairComponent implements OnInit {
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  Program: programModel[] = [];
  Chair: chairModel[] = [];
  modalAppear: boolean = false;
  selectedChair: chairModel;
  updatePayload: AdminUpdateProgram[] = [];
  OnUpdateChairList: chairModel[];
  UpdateSelectedChair: chairModel;

  constructor(
    private program: ProgramService,
    private Account: createAccount
  ) {}

  ngOnInit(): void {
    this.showChair();
  }

  toDelete(chairId: number) {
    this.Account.deleteChair(chairId).subscribe((deletedCh) => {
      this.ngOnInit();
    });
  }

  toCancelTwo() {
    this.DeleteIndicator = false;
  }
  submitNewChair(f: NgForm) {
    this.modalAppear = true;
    this.Account.POSTChair(f.value).subscribe((newChair) => {
      this.modalAppear = false;
      this.ngOnInit();
    });
  }
  showChair() {
    this.program.getProgram().subscribe((eachP) => {
      this.Program = eachP;
    });
    this.Account.getChairs().subscribe((eachC) => {
      this.Chair = eachC;
      console.log(this.Chair);

      this.Chair.map((eachChair) => {
        this.Program.map((eachP) => {
          if (eachChair.program.id == eachP.id) {
            const index = this.Program.indexOf(eachP);
            this.Program.splice(index, 1);
          }
        });
      });
    });
  }

  OnUpdateChair() {
    this.updatePayload.push({
      id: this.selectedChair.id,
      programId: this.selectedChair.program.id
    })
    this.Account.SwitchChairProgram(this.updatePayload).subscribe(resp => {
      this.UpdateIndicator = false;
      this.selectedChair = null;
      this.updatePayload = []
      this.ngOnInit();
    });
  }

  toUpdate(chairData: chairModel) {
    this.UpdateIndicator = true;
    this.UpdateSelectedChair = chairData
    this.getChairListWithoutSelectedChair(chairData);
    this.updatePayload.push({
      id: chairData.id,
      programId: chairData.program.id,
    });
  }

  toCancel() {
    this.UpdateIndicator = false;
    this.updatePayload = [];
    this.OnUpdateChairList = [];
  }
  getChairListWithoutSelectedChair(selectedChair: chairModel): void {
    this.Account.getChairs().subscribe((resp) => {
      this.OnUpdateChairList = resp.filter((chair) => {
        return chair.id != selectedChair.id;
      });
    });
  }
}
