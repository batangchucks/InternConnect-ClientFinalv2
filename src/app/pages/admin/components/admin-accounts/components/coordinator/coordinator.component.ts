import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  user = JSON.parse(localStorage.getItem('user'));
  idSection: number;
  modalAppear: boolean = false;

  toDeleteId: number

  coordinatorF!: FormGroup;
  Section: sectionModel[] = [];
  // create an adminModel
  Coordinator: coordinatorModel[] = [];
  updateCoordinatorF: FormGroup;

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
    });
    this.accounts
      .getCoordinator(this.user.admin.programId)
      .subscribe((coordinator) => {
        this.Coordinator = coordinator;

        this.Coordinator.map(eachC=> {
          this.Section.map(eachS=> {

            if(eachC.sectionId == eachS.id) {
           
              console.log(this.Section.indexOf(eachS));

              const index = this.Section.indexOf(eachS);
              this.Section.splice(index,1);
              
            }

          })
        })
      });

      
  }


  removeDuplicate() {
    console.log(this.Section);
    console.log(this.Coordinator);
  }

  updateCoordinatorS() {}

 

  createCoordinator() {
    this.modalAppear = true
    this.coordinatorF.get('sectionId').setValue(this.idSection)
    this.accounts
      .POSTcoordinator(this.coordinatorF.value)
      .subscribe((createdCoord) => {
        this.modalAppear = false;
        this.ngOnInit();
      });
  }

  toDelete(id: number) {
    this.DeleteIndicator = true
    this.toDeleteId = id
  }

  onDelete() {
        this.accounts.deleteCoordinator(this.toDeleteId).subscribe((delC) => {
          this.ngOnInit();
          this.DeleteIndicator = false
        });
    this.toDeleteId = null
  }

  toCancel() {
    this.UpdateIndicator = false;
  }

  toCancelTwo(){
    this.DeleteIndicator = false;
  }
}
