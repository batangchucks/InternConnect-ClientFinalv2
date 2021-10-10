import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { sectionModel } from 'src/app/shared/models/section.model';
import { FormControl, FormGroup } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { studentModel } from 'src/app/shared/models/students.model';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem("user"));
  Section: sectionModel[] = [];
  studentForms: FormGroup;
  Students:studentModel[]= [];
  studentFormsCoord:FormGroup;


  constructor(private program: ProgramService, private account: createAccount) { }

  ngOnInit(): void {
    console.log(this.user.admin.authId);
    this.addSection();

    this.initalizeForm();
    this.enrolledStudent();
    this.initializeFormCoord();
  }
  initalizeForm() {
    this.studentForms = new FormGroup({
      'programId': new FormControl(this.user.admin.programId),
      'email': new FormControl(""),
      'sectionId': new FormControl(""),
      'adminEmail': new FormControl(this.user.email)
    })
  }
  initializeFormCoord() {
      this.studentFormsCoord = new FormGroup({
        'programId':new FormControl(this.user.admin.programId),
        'email':new FormControl(""),
        'sectionId': new FormControl(this.user.admin.sectionId),
        'adminEmail':new FormControl(this.user.email)
      });
     
  }
  addSection() {
    this.program.getSection(this.user.admin.programId).subscribe(eachSection=>{
      this.Section = eachSection;
    });    
  }
  formSubmit() {
    // console.log(this.studentForms.value);
    // passs the value here
    this.account.POSTstudent(this.studentForms.value).subscribe(newStudent=> {
      this.ngOnInit();
    });
  }

  formSubmitforCoord() {
    console.log(this.studentFormsCoord.value);
    this.account.POSTstudent(this.studentFormsCoord.value).subscribe(newStudent=>{
      this.ngOnInit();
    })
  }
  deleteStudent(id:number) {
    this.account.deleteStudent(id).subscribe(deletedS=> {
      console.log(deletedS);
      this.ngOnInit();
    });
    
   
  }


  enrolledStudent() {
    if(this.user.admin.authId === 2) {
      this.account.enrolledStudent(this.user.admin.programId).subscribe(eachS=> {
        this.Students = eachS;
        
       });
    }
    else {
        this.account.enrolledStudentbyCoord(this.user.admin.programId, this.user.admin.sectionId).subscribe(eachS=> {
          this.Students = eachS;
        });
    }
   
  }


}
