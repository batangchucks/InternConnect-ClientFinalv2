import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  modalAppear: boolean =false

  constructor(
    private program: ProgramService,
    private Account: createAccount
  ) {}

  ngOnInit(): void {
    this.program.getProgram().subscribe((eachP) => {
      this.Program = eachP;
    });
    this.showChair();
  }

  toDelete(chairId: number) {
    this.Account.deleteChair(chairId).subscribe((deletedCh) => {
      this.ngOnInit();
    });
  }

  toCancel() {
    this.UpdateIndicator = false;
  }

  toCancelTwo() {
    this.DeleteIndicator = false;
  }
  submitNewChair(f: NgForm) {
    this.modalAppear = true
    this.Account.POSTChair(f.value).subscribe((newChair) => {
      this.modalAppear = false
      this.ngOnInit();
    });
  }
  showChair() {
    this.Account.getChairs().subscribe((eachC) => {
      this.Chair = eachC;
    });
  }
}
