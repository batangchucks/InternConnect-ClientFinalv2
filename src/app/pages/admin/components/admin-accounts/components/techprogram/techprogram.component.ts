import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-techprogram',
  templateUrl: './techprogram.component.html',
  styleUrls: ['./techprogram.component.scss'],
})
export class TechprogramComponent implements OnInit {

  DeleteIndicator: boolean = false;

  constructor(private Account: createAccount) {}

  ngOnInit(): void {}
  submitTechCoord(f: NgForm) {
    this.Account.POSTtechCoord(f.value).subscribe((cTechCoord) => {
      this.ngOnInit();
    });
  }

  toCancel(){
    this.DeleteIndicator = false;
  }
}
