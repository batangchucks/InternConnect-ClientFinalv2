import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { sectionModel } from 'src/app/shared/models/section.model';
import { FormControl, FormGroup } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ChangeStudentSection, studentModel } from 'src/app/shared/models/students.model';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  DeleteIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  p: number = 1;
  user = JSON.parse(localStorage.getItem('user'));
  Section: sectionModel[] = [];
  studentForms: FormGroup;
  Students: studentModel[] = [];
  studentFormsCoord: FormGroup;
  modalAppear: boolean = false;


  //update
  selectedUpdate: studentModel
  filteredSectionList: sectionModel[]
  selectedSection: sectionModel


  //delete
  toDeleteStudentId: number

  constructor(
    private program: ProgramService,
    private account: createAccount
  ) {}

  ngOnInit(): void {
    this.addSection();

    this.initalizeForm();
    this.enrolledStudent();
    this.initializeFormCoord();
  }
  initalizeForm() {
    this.studentForms = new FormGroup({
      programId: new FormControl(this.user.admin.programId),
      email: new FormControl(''),
      sectionId: new FormControl(''),
      adminEmail: new FormControl(this.user.email),
    });
  }
  initializeFormCoord() {
    this.studentFormsCoord = new FormGroup({
      programId: new FormControl(this.user.admin.programId),
      email: new FormControl(''),
      sectionId: new FormControl(this.user.admin.sectionId),
      adminEmail: new FormControl(this.user.email),
    });
  }
  addSection() {
    this.program
      .getSection(this.user.admin.programId)
      .subscribe((eachSection) => {
        this.Section = eachSection;
      });
  }
  formSubmit() {
    // passs the value here
    this.modalAppear = true
    this.account
      .POSTstudent(this.studentForms.value)
      .subscribe((newStudent) => {
        this.modalAppear = false;
        this.ngOnInit();
      });
  }

  formSubmitforCoord() {
    this.modalAppear = true;
    this.account
      .POSTstudent(this.studentFormsCoord.value)
      .subscribe((newStudent) => {
      this.modalAppear = false;
        this.ngOnInit();
      });
  }

  toDeleteStudent(studentId : number) {
    this.DeleteIndicator = true;
    this.toDeleteStudentId = studentId;
  }
  deleteStudent() {
    this.account.deleteStudent(this.toDeleteStudentId).subscribe((deletedS) => {
      this.toDeleteStudentId = null
      this.DeleteIndicator = false;
      this.ngOnInit();
    });
  }

  enrolledStudent() {
    if (this.user.admin.authId === 2) {
      this.account
        .enrolledStudent(this.user.admin.programId)
        .subscribe((eachS) => {
          this.Students = eachS;
        });
    } else {
      this.account
        .enrolledStudentbyCoord(
          this.user.admin.programId,
          this.user.admin.sectionId
        )
        .subscribe((eachS) => {
          this.Students = eachS;
        });
    }
  }

  toCancelOne() {
    this.UpdateIndicator = false;
  }

  toCancel() {
    this.DeleteIndicator = false;
  }

  toUpdate(student: studentModel) {
    this.UpdateIndicator = true;
    this.selectedUpdate = student;
    this.getSectionListWithoutStudentSection(student.section);
  }

  onUpdate() {
    var payload: ChangeStudentSection = {
      id: this.selectedUpdate.id,
      sectionId: this.selectedSection.id
    }
    this.account.ChangeStudentSection(payload).subscribe(resp => {
      this.UpdateIndicator = false;
      this.selectedUpdate = null;
      this.selectedSection = null;
      this.filteredSectionList = []
      this.ngOnInit();
    })
  }

  getSectionListWithoutStudentSection(studentSection: sectionModel): void {
        this.program
          .getSection(this.user.admin.programId)
          .subscribe((resp) => {
            this.filteredSectionList = resp.filter(section => {
              return studentSection.id != section.id
            })
          });
  }
}
