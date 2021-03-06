import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { coordinatorModel } from 'src/app/shared/models/coordinator.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-techprogram',
  templateUrl: './techprogram.component.html',
  styleUrls: ['./techprogram.component.scss'],
})
export class TechprogramComponent implements OnInit {
  DeleteIndicator: boolean = false;
  modalAppear: boolean = false;
  // Delete loading
  originalButtonD: boolean = true;
  loadingButtonD: boolean = false;
  techCoordList: coordinatorModel[];
  toDeleteId: number = null

  constructor(private Account: createAccount) { }

  ngOnInit(): void {
    this.Account.getAllTechCoordinator().subscribe((resp) => {
      this.techCoordList = resp;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  submitTechCoord(f: NgForm) {
    this.modalAppear = true;
    f.value.email = f.value.email.replace(/\s/g, '');
    this.Account.POSTtechCoord(f.value).subscribe((cTechCoord) => {

      f.reset();
      this.modalAppear = false;
      this.ngOnInit();
    },(err)=> {
      this.modalAppear = false;
      alert("Something went wrong please try again!");
      this.ngOnInit();
   });
  }

  toCancel() {
    this.DeleteIndicator = false;
  }
  appearModalDelete(id: number) {
    this.DeleteIndicator = true;
    this.toDeleteId = id;
  }

  onDelete() {
    this.originalButtonD = false;
    this.loadingButtonD = true;
    this.Account.deleteCoordinator(this.toDeleteId).subscribe(resp => {
      this.loadingButtonD = false;
      this.originalButtonD = true;
      this.DeleteIndicator = false
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }
}

