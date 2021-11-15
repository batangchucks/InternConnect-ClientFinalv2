import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AdminUpdateSection } from 'src/app/shared/models/admin.model';
import { coordinatorModel } from 'src/app/shared/models/coordinator.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { sectionModel } from 'src/app/shared/models/section.model';
import { userModel } from 'src/app/shared/models/user.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss'],
})
export class CoordinatorComponent implements OnInit {
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  // Update loading
  originalButtonU: boolean = true;
  loadingButtonU: boolean = false;
  // Delete loading
  originalButtonD: boolean = true;
  loadingButtonD: boolean = false;
  user = JSON.parse(localStorage.getItem('user'));
  idSection: number;
  modalAppear: boolean = false;

  toDeleteId: number;

  coordinatorF!: FormGroup;
  Section: sectionModel[] = [];
  // create an adminModel
  Coordinator: coordinatorModel[] = [];

  updateCoordinatorF: FormGroup;
  selectedCoordinator;
  onUpdateList: coordinatorModel[];
  updatePayload: AdminUpdateSection[] = []
  targetCoordinator: coordinatorModel;

  constructor(
    private accounts: createAccount,
    private program: ProgramService
  ) {}

  ngOnInit(): void {
    this.addFormval();
    this.getCoordinatorAndSection();
    this.removeDuplicate();
  }
  addFormval() {
    this.coordinatorF = new FormGroup({
      programId: new FormControl(this.user.admin.programId),
      email: new FormControl(''),
      sectionId: new FormControl(''),
    });
  }

  getCoordinatorAndSection() {
    this.program.getSection(this.user.admin.programId).subscribe((sections) => {
      this.Section = sections;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
    this.accounts
      .getCoordinator(this.user.admin.programId)
      .subscribe((coordinator) => {
        this.Coordinator = coordinator;

        this.Coordinator.map((eachC) => {
          this.Section.map((eachS) => {
            if (eachC.sectionId == eachS.id) {


              const index = this.Section.indexOf(eachS);
              this.Section.splice(index, 1);
            }
          });
        });
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }
  removeDuplicate() {

  }

  createCoordinator() {
    this.modalAppear = true;
    this.coordinatorF.get('sectionId').setValue(this.idSection);
    this.accounts
      .POSTcoordinator(this.coordinatorF.value)
      .subscribe((createdCoord) => {
        this.modalAppear = false;
        this.ngOnInit();
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }

  toDelete(id: number) {
    this.DeleteIndicator = true;
    this.toDeleteId = id;
  }

  onDelete() {
    this.originalButtonD = false;
    this.loadingButtonD = true;
    this.accounts.deleteCoordinator(this.toDeleteId).subscribe((delC) => {
      this.loadingButtonD = false;
      this.originalButtonD = true;
      this.ngOnInit();
      this.DeleteIndicator = false;
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
    this.toDeleteId = null;
  }

  toCancelTwo() {
    this.DeleteIndicator = false;
  }

  toUpdate(coordinatorData: coordinatorModel) {
    this.UpdateIndicator = true;
    this.getCoordinator(coordinatorData);
    this.selectedCoordinator = coordinatorData;

    this.updatePayload.push({
      id: coordinatorData.id,
      sectionId: coordinatorData.section.id,
    });

  }

  OnUpdate() {
    this.updatePayload.push({
      id: this.targetCoordinator.id,
      sectionId: this.targetCoordinator.section.id
    })
    this.originalButtonU = false;
    this.loadingButtonU = true;
    this.accounts.SwitchChairSection(this.updatePayload).subscribe((resp) => {
      this.loadingButtonU = false;
      this.originalButtonU = true;
      this.UpdateIndicator = false;
      this.updatePayload = [];
      this.targetCoordinator = null;
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }
  toCancel() {
    this.UpdateIndicator = false;
    this.targetCoordinator = null;
    this.updatePayload = [];
  }

  getCoordinator(coordinator: coordinatorModel): void {
    this.accounts
      .getCoordinator(this.user.admin.programId)
      .subscribe((resp) => {
        this.onUpdateList = resp.filter((coord) => {
          return coordinator.id != coord.id;
        });
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }
}
