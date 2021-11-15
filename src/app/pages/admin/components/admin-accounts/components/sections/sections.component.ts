import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { sectionModel } from 'src/app/shared/models/section.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  CreateIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  // Create loading
  originalButtonC: boolean = true;
  loadingButtonC: boolean = false;
  // Update loading
  originalButtonU: boolean = true;
  loadingButtonU: boolean = false;
  // Delete loading
  originalButtonD: boolean = true;
  loadingButtonD: boolean = false;
  createForm: FormGroup;
  updateForm: FormGroup;
  sectionId:number;
  Section: sectionModel[] = [];

  user = JSON.parse(localStorage.getItem('user'));
  constructor(
    private account: createAccount,
    private program: ProgramService
  ) {}

  ngOnInit(): void {
    this.showSection();
  }

  toCreate() {
    this.CreateIndicator = true;

    this.createForm = new FormGroup({
      name: new FormControl(''),
      programId: new FormControl(this.user.admin.programId),
    });
  }

  createFormSubmit() {
    this.originalButtonC = false;
    this.loadingButtonC = true;
    this.account.POSTsection(this.createForm.value).subscribe((newSection) => {
      this.loadingButtonC = false;
      this.originalButtonC = true;
      this.ngOnInit();
      this.CreateIndicator = false;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  toUpdate(section: sectionModel) {
    this.updateForm = new FormGroup({
      id: new FormControl(section.id),
      name: new FormControl(section.name),
      programId: new FormControl(this.user.admin.programId),
    });
    this.UpdateIndicator = true;
  }
  updateFormS() {
    this.originalButtonU = false;
    this.loadingButtonU = true;
    this.program.PUTsection(this.updateForm.value).subscribe((upSec) => {
      this.loadingButtonU = false;
      this.originalButtonU = true;
      this.ngOnInit();
      this.UpdateIndicator = false;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }
  // for deleting a section
  deleteSection(id:number) {
    this.sectionId = id;
    this.DeleteIndicator = true;


  }

  toCancelTwo() {
    this.UpdateIndicator = false;
  }
  toCancelOne() {
    this.CreateIndicator = false;
  }

  toCancel() {
    this.DeleteIndicator = false;
  }

  showSection() {
    this.account.getSection(this.user.admin.programId).subscribe((eachS) => {
      this.Section = eachS;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  confirmDelete() {
    this.originalButtonD = false;
    this.loadingButtonD = true;
    this.program.deleteSection(this.sectionId).subscribe((delS) => {
      this.loadingButtonD = false;
      this.originalButtonD = true;
      this.sectionId = null;
      this.DeleteIndicator = false;
      this.ngOnInit();

    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }
}
