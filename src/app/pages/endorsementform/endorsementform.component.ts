import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-endorsementform',
  templateUrl: './endorsementform.component.html',
  styleUrls: ['./endorsementform.component.scss'],
})
export class EndorsementformComponent implements OnInit {
  modalAppear: boolean = false;

  myDate = new Date();
  user = JSON.parse(localStorage.getItem('user'));
  constructor(
    private program: ProgramService,
    private company: CompanyService,
    private File: fileUpload,
    private Account: createAccount,
    private router: Router
  ) {}
  Program: programModel[] = [];
  Company: CompanyModel[] = [];
  EndorsementF: FormGroup;
  selectCompany: number;

  selectedFileC: File = null;
  PhotoFileNameC: string;
  PhotoFilePathC: string;

  selectedFileA: File = null;
  PhotoFileNameA: string;
  PhotoFilePathA: string;

  imageSrc: string;

  initC: boolean = false;
  companyS: CompanyModel;

  ngOnInit(): void {
    this.Account.getSubmissionStudent(this.user.student.id).subscribe(
      (resp) => {
        if (resp != null) {
          this.router.navigate(['/login']);
        }
      },
      (err) => {}
    );
    this.program
      .getSingleProgram(this.user.student.programId)
      .subscribe((eachV) => {
        this.Program = eachV;
      });
    this.company.getCompany().subscribe((eachC) => {
      this.Company = eachC.filter((company)=>{
        return company.isActive == true
      });
    });
    this.initForm();
  }

  initForm() {
    this.EndorsementF = new FormGroup({
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleInitial: new FormControl(null, [Validators.required]),
      trackId: new FormControl(null, [Validators.required]),
      studentNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      contactPersonEmail: new FormControl(null, [Validators.required]),
      contactPersonTitle: new FormControl(null, [Validators.required]),
      contactPersonLastName: new FormControl(null, [Validators.required]),
      contactPersonFirstName: new FormControl(null, [Validators.required]),
      contactPersonPosition: new FormControl(null, [Validators.required]),
      companyId: new FormControl(null, [Validators.required]),
      studentTitle: new FormControl(null, [Validators.required]),
      jobDescription: new FormControl(null, [Validators.required]),
    });
  }
  endorseS() {
    this.modalAppear = true;

    const studentTitle: string = this.EndorsementF.get('studentTitle').value;

    const lastName: string = this.EndorsementF.get('lastName').value;
    const firstName: string = this.EndorsementF.get('firstName').value;
    const middleInitial: string = this.EndorsementF.get('middleInitial').value;
    const trackId: number = this.EndorsementF.get('trackId').value;
    const studentNumber: number = this.EndorsementF.get('studentNumber').value;
    const contactPersonEmail: string =
      this.EndorsementF.get('contactPersonEmail').value;
    const contactPersonTitle: string =
      this.EndorsementF.get('contactPersonTitle').value;

    const contactPersonLastName: string = this.EndorsementF.get(
      'contactPersonLastName'
    ).value;
    const contactPersonFirstName: string = this.EndorsementF.get(
      'contactPersonFirstName'
    ).value;
    const contactPersonPosition: string = this.EndorsementF.get(
      'contactPersonPosition'
    ).value;
    const companyId: number = this.EndorsementF.get('companyId').value;
    const jobDescription: string =
      this.EndorsementF.get('jobDescription').value;

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
      studentId: this.user.student.id,
    };
    this.Account.POSTsubmission(
      this.user.student.sectionId,
      this.user.student.programId,
      form_payload
    ).subscribe(
      (submission) => {
        this.modalAppear = false;
        this.router.navigate(['/status']);
        this.ngOnInit();
      },
      (err) => {
        this.ngOnInit();
      }
    );
  }

  selectedC() {
    this.initC = true;

    this.company.getCompanyById(this.selectCompany).subscribe((sC) => {
      this.companyS = sC;
    });
  }

  imgCompanyProfile(event) {
    this.selectedFileC = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.EndorsementF.patchValue({
          fileSource: reader.result,
        });
      };
    }
    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileC, this.selectedFileC.name);

    // this.adminService.UploadPhotoMerch(formData).subscribe((data: any) => {
    //   this.PhotoFileName = data.toString();
    //   this.PhotoFilePath = this.adminService.photoUrl + this.PhotoFileName;
    // });

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
        this.EndorsementF.patchValue({
          fileSource: reader.result,
        });
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
