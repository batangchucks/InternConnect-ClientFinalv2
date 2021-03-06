import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { sectionModel } from 'src/app/shared/models/section.model';
import { FormControl, FormGroup } from '@angular/forms';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { AddStudentModel, ChangeStudentSection, studentModel } from 'src/app/shared/models/students.model';
import { CSVRecord } from 'src/app/shared/models/csv.model';
import { environment } from 'src/environments/environment.prod';

const re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  DeleteIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  // Update loading
  originalButtonU: boolean = true;
  loadingButtonU: boolean = false;
  // Delete loading
  originalButtonD: boolean = true;
  loadingButtonD: boolean = false;
BatchUpload: boolean = false;
  originalButton: boolean = true;
  loadingButton: boolean = false;
  p: number = 1;
  user = JSON.parse(localStorage.getItem('user'));
  Section: sectionModel[] = [];
  studentForms: FormGroup;
  Students: studentModel[] = [];
  studentFormsCoord: FormGroup;
  modalAppear: boolean = false;

  //Batch Upload
  batchUploadPayload: AddStudentModel[] = [];
  csvArr: any[];
  selectedSectionBatch: sectionModel;

  //update
  selectedUpdate: studentModel;
  filteredSectionList: sectionModel[];
  selectedSection: sectionModel;

  _env = environment.apiUrl

  //delete
  toDeleteStudentId: number;

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
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }
  formSubmit() {
    // passs the value here
    this.modalAppear = true;
    this.studentFormsCoord.patchValue({
      email: this.studentFormsCoord.get('email').value.replace(/\s/g, ''),
    });
    this.account
      .POSTstudent(this.studentForms.value)
      .subscribe((newStudent) => {
        this.modalAppear = false;
        this.ngOnInit();
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }

  formSubmitforCoord() {
    this.modalAppear = true;
    this.studentFormsCoord.patchValue({
      email: this.studentFormsCoord.get('email').value.replace(/\s/g, ''),
    });
    this.account
      .POSTstudent(this.studentFormsCoord.value)
      .subscribe((newStudent) => {
        this.modalAppear = false;
        this.ngOnInit();
      },(err)=> {

        alert("Something went wrong please try again! ");
        this.ngOnInit();
     });
  }

  toDeleteStudent(studentId: number) {
    this.DeleteIndicator = true;
    this.toDeleteStudentId = studentId;
  }
  deleteStudent() {
    this.originalButtonD = false;
    this.loadingButtonD = true;
    this.account.deleteStudent(this.toDeleteStudentId).subscribe((deletedS) => {
      this.loadingButtonD = false;
      this.originalButtonD = true;
      this.toDeleteStudentId = null;
      this.DeleteIndicator = false;
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  enrolledStudent() {
    if (this.user.admin.authId === 2) {
      this.account
        .enrolledStudent(this.user.admin.programId)
        .subscribe((eachS) => {
          this.Students = eachS;
        },(err)=> {

          alert("Something went wrong please try again! ");
          this.ngOnInit();
       });
    } else {
      this.account
        .enrolledStudentbyCoord(
          this.user.admin.programId,
          this.user.admin.sectionId
        )
        .subscribe((eachS) => {
          this.Students = eachS;
        },(err)=> {

          alert("Something went wrong please try again! ");
          this.ngOnInit();
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
    this.originalButtonU = false;
    this.loadingButtonU = true;
    var payload: ChangeStudentSection = {
      id: this.selectedUpdate.id,
      sectionId: this.selectedSection.id,
    };
    this.account.ChangeStudentSection(payload).subscribe((resp) => {
      this.loadingButtonU = false;
      this.originalButtonU = true;
      this.UpdateIndicator = false;
      this.selectedUpdate = null;
      this.selectedSection = null;
      this.filteredSectionList = [];
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  getSectionListWithoutStudentSection(studentSection: sectionModel): void {
    this.program.getSection(this.user.admin.programId).subscribe((resp) => {
      this.filteredSectionList = resp.filter((section) => {
        return studentSection.id != section.id;
      });
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  onBatchUpload() {
    this.originalButton = false;
    this.loadingButton = true;
    for (let csv of this.csvArr) {
      if (!re.test(csv.email)) {
        alert(
          csv.email + ' is not a valid email, Please edit the uploaded file'
        );
              this.csvReader.nativeElement.value = '';
              this.batchUploadPayload = [];
              this.csvArr = [];
        return;
      }

      this.batchUploadPayload.push({
        adminEmail: this.user.email.replace(/\s/g, ''),
        email: csv.email.replace(/\s/g, ''),
        sectionId: this.selectedSectionBatch.id,
        programId: this.user.admin.programId,
      });
    }

    this.account.batchUpload(this.batchUploadPayload).subscribe((resp) => {
          this.loadingButton = false;
          this.originalButton = true;
          this.modalAppear = true;
      // var failedEmails:string = ""
      // if (!resp) {
      //         resp.forEach((responses) => {
      //           failedEmails = failedEmails + ', ' + responses.email;
      //         });
      //   alert("Successfully onboarded students except" + failedEmails)
      // } else {
      //   alert("Hello world")
      // }
      if (resp == null) {
        alert("Successfully Onboarded All Emails")
      }
      else if (resp.length == this.batchUploadPayload.length) {
        alert("All emails are already enrolled in the system")
      }
      else {
        var failedEmails:string = ""
        resp.forEach(element => {
          failedEmails = element.email + ", " + failedEmails
        });
        alert("Successfully Onboarded Emails except " + failedEmails)
      }
      this.csvReader.nativeElement.value = "";
      this.batchUploadPayload = []
      this.csvArr = []
      this.modalAppear = false
      this.ngOnInit();
    },(err)=> {

      alert("Something went wrong please try again! ");
      this.ngOnInit();
   });
  }

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: ElementRef;

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };

      reader.onerror = function () {

      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    this.csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.email = curruntRecord[0].trim();
        this.csvArr.push(csvRecord);
      }
    }
    this.csvArr.pop();
    return this.csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  openBatch() {
    this.BatchUpload = true;
  }

  closeBatch() {
    this.BatchUpload = false;
          this.csvReader.nativeElement.value = '';
          this.batchUploadPayload = [];
          this.csvArr = [];
          this.ngOnInit();
  }
}
