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
  techCoordList: coordinatorModel[];
  toDeleteId: number = null

  constructor(private Account: createAccount) { }

  ngOnInit(): void {
    this.Account.getAllTechCoordinator().subscribe((resp) => {
      this.techCoordList = resp;
    });
  }

  submitTechCoord(f: NgForm) {
    this.modalAppear = true;
    this.Account.POSTtechCoord(f.value).subscribe((cTechCoord) => {
      console.log(cTechCoord);
      f.reset();
      this.modalAppear = false;
      this.ngOnInit();
    });
  }

  toCancel() {
    this.DeleteIndicator = false;
  }
  appearModalDelete(id: number) {
    this.DeleteIndicator = true;
    this.toDeleteId = id
  }

  onDelete() {
    this.Account.deleteCoordinator(this.toDeleteId).subscribe(resp => {
      this.DeleteIndicator = false
      this.ngOnInit()
    }, err => {
      alert("Something went wrong")
    })
  }
}

