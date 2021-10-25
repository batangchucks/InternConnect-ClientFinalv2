import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { ReadEventModel } from 'src/app/shared/models/event.model';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  FormEntry: boolean = false;
  CompanyEntry: boolean = false;

  user = JSON.parse(localStorage.getItem('user'));
  student: submissionModel;
  companyForm: FormGroup;
  responseType: string = '';
  comments: string = '';


  company: CompanyModel[] = [];

  updateSubmission: FormGroup;
  selectedFileC: File;
  imageSrc: string;
  EndorsementF: any;

  PhotoFileNameC: string;
  PhotoFilePathC: string;
  selectedFileA: File;
  PhotoFileNameA: string;
  PhotoFilePathA: string;

  eventList: ReadEventModel[] = [
    {
      endDate: 'sfasdf',
      name: 'fadsfa',
      id: 1,
      adminId: 2,
    },
  ];

  program: programModel[] = [];

  constructor(
    private File: fileUpload,
    private Acc: createAccount,
    private Company: CompanyService,
    private Program: ProgramService,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.Company.getCompany().subscribe((c) => {
      this.company = c;
    });
    this.eventService
      .getAllEventsByProgramId(this.user.student.programId)
      .subscribe((resp) => {
        this.eventList = resp;
      });

    this.Acc.getSubmissionStudent(this.user.student.id).subscribe((student) => {
      this.student = student;
      this.initStatus();
    });

    this.Program.getSingleProgram(this.user.student.programId).subscribe(
      (eachV) => {
        this.program = eachV;
      }
    );
  }

  toUpdate() {
    this.FormEntry = true;

    this.updateSubmission = new FormGroup({
      lastName: new FormControl(this.student.lastName, [Validators.required]),
      firstName: new FormControl(this.student.firstName, [Validators.required]),
      middleInitial: new FormControl(this.student.middleInitial, [
        Validators.required,
      ]),
      studentNumber: new FormControl(this.student.studentNumber, [
        Validators.required,
        Validators.minLength(10),
      ]),
      contactPersonTitle: new FormControl(this.student.contactPersonTitle, [
        Validators.required,
      ]),
      contactPersonFirstName: new FormControl(
        this.student.contactPersonFirstName,
        [Validators.required]
      ),
      contactPersonLastName: new FormControl(
        this.student.contactPersonLastName,
        [Validators.required]
      ),
      contactPersonEmail: new FormControl(this.student.contactPersonEmail, [
        Validators.required,
      ]),
      contactPersonPosition: new FormControl(
        this.student.contactPersonPosition,
        [Validators.required]
      ),
      jobDescription: new FormControl(this.student.jobDescription, [
        Validators.required,
      ]),
      studentTitle: new FormControl(this.student.studentTitle, [
        Validators.required,
      ]),
      companyId: new FormControl(this.student.companyId),
      trackId: new FormControl(this.student.trackId),
    });
  }
  updateFormSubmit() {
    const studentTitle: string =
      this.updateSubmission.get('studentTitle').value;
    const lastName: string = this.updateSubmission.get('lastName').value;

    const firstName: string = this.updateSubmission.get('firstName').value;

    const middleInitial: string =
      this.updateSubmission.get('middleInitial').value;

    const trackId: number = this.updateSubmission.get('trackId').value;

    const studentNumber: number =
      this.updateSubmission.get('studentNumber').value;
    const contactPersonEmail: string =
      this.updateSubmission.get('contactPersonEmail').value;
    const contactPersonTitle: string =
      this.updateSubmission.get('contactPersonTitle').value;

    const contactPersonLastName: string = this.updateSubmission.get(
      'contactPersonLastName'
    ).value;
    const contactPersonFirstName: string = this.updateSubmission.get(
      'contactPersonFirstName'
    ).value;
    const contactPersonPosition: string = this.updateSubmission.get(
      'contactPersonPosition'
    ).value;
    const companyId: number = this.updateSubmission.get('companyId').value;
    const jobDescription: string =
      this.updateSubmission.get('jobDescription').value;

    const studentId = this.user.student.id;

    let acceptedByCoordinator: boolean;
    let acceptedByChair: boolean;
    let acceptedByDean: boolean;
    let emailSentByCoordinator: boolean;
    let companyAgrees: boolean;
    let comments: boolean;

    acceptedByCoordinator = this.student.adminResponse.acceptedByCoordinator;
    acceptedByChair = this.student.adminResponse.acceptedByCoordinator;
    acceptedByDean = this.student.adminResponse.acceptedByCoordinator;
    emailSentByCoordinator = this.student.adminResponse.acceptedByCoordinator;
    companyAgrees = this.student.adminResponse.acceptedByCoordinator;
    comments = this.student.adminResponse.acceptedByCoordinator;

    let id;

    id = this.student.id;

    if (!this.PhotoFileNameA && !this.PhotoFileNameC) {
      this.PhotoFileNameA = this.student.acceptanceLetterFileName;
      this.PhotoFileNameC = this.student.companyProfileFileName;
    } else if (!this.PhotoFileNameA) {
      this.PhotoFileNameA = this.student.acceptanceLetterFileName;
    } else if (!this.PhotoFileNameC) {
      this.PhotoFileNameC = this.student.companyProfileFileName;
    }

    var form_payload = {
      studentTitle: studentTitle,
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
      studentNumber: studentNumber,
      contactPersonTitle: contactPersonTitle,
      contactPersonFirstName: contactPersonFirstName,
      contactPersonLastName: contactPersonLastName,
      contactPersonEmail: contactPersonEmail,
      contactPersonPosition: contactPersonPosition,
      acceptanceLetterFileName: this.PhotoFileNameA,
      companyProfileFileName: this.PhotoFileNameC,
      jobDescription: jobDescription,
      // no more endorsement file name
      trackId: trackId,
      companyId: companyId,
      acceptedByCoordinator: acceptedByCoordinator,
      id: id,
      studentId: studentId,
    };

    this.Acc.UPDATEsubmission(form_payload).subscribe((submission) => {
      this.FormEntry = false;
      this.ngOnInit();
      location.reload();
    });
  }

  toClose() {
    this.FormEntry = false;
  }

  toChange() {
    this.CompanyEntry = true;

    this.companyForm = new FormGroup({
      lastName: new FormControl(this.student.lastName, [Validators.required]),
      firstName: new FormControl(this.student.firstName, [Validators.required]),
      middleInitial: new FormControl(this.student.middleInitial, [
        Validators.required,
      ]),
      studentNumber: new FormControl(this.student.studentNumber, [
        Validators.required,
        Validators.minLength(10),
      ]),
      contactPersonTitle: new FormControl('', [Validators.required]),
      contactPersonFirstName: new FormControl('', [Validators.required]),
      contactPersonLastName: new FormControl('', [Validators.required]),
      contactPersonEmail: new FormControl('', [Validators.required]),
      contactPersonPosition: new FormControl('', [Validators.required]),
      jobDescription: new FormControl('', [Validators.required]),
      studentTitle: new FormControl(this.student.studentTitle, [
        Validators.required,
      ]),
      companyId: new FormControl('', [Validators.required]),
      trackId: new FormControl(this.student.trackId, [Validators.required]),
    });
  }
  companySubmit() {
    // submit the value

    const studentTitle: string = this.companyForm.get('studentTitle').value;
    const lastName: string = this.companyForm.get('lastName').value;

    const firstName: string = this.companyForm.get('firstName').value;

    const middleInitial: string = this.companyForm.get('middleInitial').value;

    const trackId: number = this.companyForm.get('trackId').value;

    const studentNumber: number = this.companyForm.get('studentNumber').value;
    const contactPersonEmail: string =
      this.companyForm.get('contactPersonEmail').value;
    const contactPersonTitle: string =
      this.companyForm.get('contactPersonTitle').value;

    const contactPersonLastName: string = this.companyForm.get(
      'contactPersonLastName'
    ).value;
    const contactPersonFirstName: string = this.companyForm.get(
      'contactPersonFirstName'
    ).value;
    const contactPersonPosition: string = this.companyForm.get(
      'contactPersonPosition'
    ).value;
    const companyId: number = this.companyForm.get('companyId').value;
    const jobDescription: string = this.companyForm.get('jobDescription').value;

    const studentId = this.user.student.id;

    let acceptedByCoordinator: boolean;
    let acceptedByChair: boolean;
    let acceptedByDean: boolean;
    let emailSentByCoordinator: boolean;
    let companyAgrees: boolean;
    let comments: boolean;

    acceptedByCoordinator = this.student.adminResponse.acceptedByCoordinator;
    acceptedByChair = this.student.adminResponse.acceptedByCoordinator;
    acceptedByDean = this.student.adminResponse.acceptedByCoordinator;
    emailSentByCoordinator = this.student.adminResponse.acceptedByCoordinator;
    companyAgrees = this.student.adminResponse.acceptedByCoordinator;
    comments = this.student.adminResponse.acceptedByCoordinator;

    let id;

    id = this.student.id;

    // if(!this.PhotoFileNameA &&  !this.PhotoFileNameC ) {

    //       this.PhotoFileNameA = this.student.acceptanceLetterFileName;
    //      this.PhotoFileNameA = this.student.acceptanceLetterFileName;

    // }
    // else if(!this.PhotoFileNameA) {

    //       this.PhotoFileNameA = this.student.acceptanceLetterFileName;

    // }
    // else if(!this.PhotoFileNameC) {

    //     this.PhotoFileNameC = this.student.companyProfileFileName;

    // }
    if (this.PhotoFileNameA && this.PhotoFileNameC) {
      this.PhotoFileNameA = this.student.acceptanceLetterFileName;
      this.PhotoFileNameC = this.student.companyProfileFileName;
    } else {
      // error message
    }

    var form_payload = {
      studentTitle: studentTitle,
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
      studentNumber: studentNumber,
      contactPersonTitle: contactPersonTitle,
      contactPersonFirstName: contactPersonFirstName,
      contactPersonLastName: contactPersonLastName,
      contactPersonEmail: contactPersonEmail,
      contactPersonPosition: contactPersonPosition,
      acceptanceLetterFileName: this.PhotoFileNameA,
      companyProfileFileName: this.PhotoFileNameC,
      jobDescription: jobDescription,
      // no more endorsement file name
      trackId: trackId,
      companyId: companyId,
      acceptedByCoordinator: acceptedByCoordinator,

      studentId: studentId,
    };

    this.Acc.POSTsubmission(
      this.user.student.sectionId,
      this.user.student.programId,
      form_payload
    ).subscribe((submission) => {
      this.CompanyEntry = false;
      this.ngOnInit();
    });
  }
  toCloseSecond() {
    this.CompanyEntry = false;
  }

  initStatus() {
    if (this.student.adminResponse.comments) {
      this.responseType = '';
      this.comments = this.student.adminResponse.comments;
    } else if (this.student.adminResponse.companyAgrees) {
      this.responseType = 'agrees';
    } else if (this.student.adminResponse.emailSentByCoordinator) {
      this.responseType = 'emailed';
    } else if (this.student.adminResponse.acceptedByDean) {
      this.responseType = 'dean';
    } else {
      this.responseType = 'acknowledged';
    }
  }

  imgCompanyProfile(event) {
    this.selectedFileC = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileC, this.selectedFileC.name);

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.PhotoFileNameC = data.toString();
      this.PhotoFilePathC = this.File.photoUrl + this.PhotoFileNameC;
    });
  }
  imgAcceptanceL(event) {
    this.selectedFileA = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }

    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileA, this.selectedFileA.name);

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.PhotoFileNameA = data.toString();
      this.PhotoFilePathA = this.File.photoUrl + this.PhotoFileNameA;
    });
  }
}
