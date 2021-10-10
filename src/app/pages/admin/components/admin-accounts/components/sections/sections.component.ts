import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { sectionModel } from 'src/app/shared/models/section.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
    CreateIndicator: boolean = false;
    UpdateIndicator: boolean = false;
    createForm:FormGroup;
    updateForm:FormGroup;

    Section: sectionModel[] = [];
    
    user = JSON.parse(localStorage.getItem("user"));
    constructor(private account: createAccount,private program: ProgramService) { }

    ngOnInit(): void {
      this.showSection();
    }

    toCreate() { 
      this.CreateIndicator = true;

      this.createForm = new FormGroup({
        "name":new FormControl(""),
        "programId": new FormControl(this.user.admin.programId)
      });
    } 

    createFormSubmit() {
     this.account.POSTsection(this.createForm.value).subscribe(newSection=> {
        this.ngOnInit();
        this.CreateIndicator = false;
     });
    
    }

    toUpdate(section:sectionModel) { 

      this.updateForm =  new FormGroup({
        "id":new FormControl(section.id),
        "name":new FormControl(section.name),
        "programId": new FormControl(this.user.admin.programId)
      
        
      })
      this.UpdateIndicator = true;

    } 
    updateFormS(){
        this.program.PUTsection(this.updateForm.value).subscribe(upSec=> {
         
          this.ngOnInit();
          this.UpdateIndicator = false;

        });
       
    }
    // for deleting a section
    deleteSection(section:sectionModel) {
      this.program.deleteSection(section.id).subscribe(delS=> {
        console.log(delS);
        this.ngOnInit();
      })
    }

    toCancelTwo() {
      this.UpdateIndicator = false;
    } 
    toCancelOne() { 
      this.CreateIndicator = false;
    } 
    showSection() {
     
      this.account.getSection(this.user.admin.programId).subscribe(eachS=> {
        this.Section = eachS;
      });
    }

}
