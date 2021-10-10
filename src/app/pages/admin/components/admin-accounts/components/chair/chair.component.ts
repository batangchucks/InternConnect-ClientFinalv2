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
  styleUrls: ['./chair.component.scss']
})
export class ChairComponent implements OnInit {

  UpdateIndicator: boolean = false;
  Program:programModel[] = [];
  Chair: chairModel[] = [];

  constructor(private program:ProgramService, private Account: createAccount) { }

  ngOnInit(): void {
    this.program.getProgram().subscribe(eachP=> {
      this.Program = eachP;

    });
    this.showChair();
 
    
  }

  toDelete(chairId:number) {
    this.Account.deleteChair(chairId).subscribe(deletedCh=> {
     
      this.ngOnInit();
    });
  }

  toCancel() {
    this.UpdateIndicator = false;
  } 
  submitNewChair(f:NgForm) {
    this.Account.POSTChair(f.value).subscribe(newChair=> {
      this.ngOnInit();

    })
  }
  showChair() {
    this.Account.getChairs().subscribe(eachC=>{
      this.Chair = eachC;
      console.log(this.Chair);
     
    });
 
  }
}
