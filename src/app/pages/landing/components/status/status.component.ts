import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { programModel } from 'src/app/shared/models/programs.model';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { CompanyService } from 'src/app/shared/services/company.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  FormEntry: boolean = false;
  CompanyEntry: boolean = false;

  user = JSON.parse(localStorage.getItem('user'));
  student: submissionModel[] = [];
  companyForm:FormGroup;
  responseType :string = '';
  comments :string = '';

  company:CompanyModel[] = [];

  updateSubmission:FormGroup;
  selectedFileC: File;
  imageSrc: string;
  EndorsementF: any;
 
  PhotoFileNameC: string;
  PhotoFilePathC: string;
  selectedFileA: File;
  PhotoFileNameA: string;
  PhotoFilePathA: string;

  program:programModel[] = [];

  constructor(private File:fileUpload, private Acc: createAccount, private Company: CompanyService, private Program: ProgramService) { }

  ngOnInit(): void {
    this.Company.getCompany().subscribe(c=> {
      this.company = c;
    })
    
    this.Acc.getSubmissionStudent(this.user.student.id).subscribe(student=> {
      this.student = student;
      this.initStatus();
      console.log(this.student);
    });

    this.Program.getSingleProgram(this.user.student.programId).subscribe(eachV=> {
      this.program = eachV;
    });

  }
  
  toUpdate() {
    this.FormEntry = true;
    this.student.map(stud=> {
      this.updateSubmission = new FormGroup({
        'lastName': new FormControl(stud.lastName),
        'firstName': new FormControl(stud.firstName),
        'middleInitial': new FormControl(stud.middleInitial),
        'studentNumber': new FormControl(stud.studentNumber),
        'contactPersonTitle': new FormControl(stud.contactPersonTitle),
        'contactPersonFirstName': new FormControl(stud.contactPersonFirstName),
        'contactPersonLastName': new FormControl(stud.contactPersonLastName),
        'contactPersonEmail': new FormControl(stud.contactPersonEmail),
        'contactPersonPosition': new FormControl(stud.contactPersonPosition),
        'jobDescription': new FormControl(stud.jobDescription),
        'studentTitle':new FormControl(stud.studentTitle),
        'companyId': new FormControl(''),
        'trackId': new FormControl(''),
      });
    })
   

  }
  updateFormSubmit() {
    const studentTitle:string = this.updateSubmission.get('studentTitle').value;
    const lastName:string = this.updateSubmission.get('lastName').value;

    const firstName:string = this.updateSubmission.get('firstName').value;
  
    const middleInitial: string = this.updateSubmission.get('middleInitial').value;

    const trackId: number = this.updateSubmission.get('trackId').value;

    const studentNumber: number =this.updateSubmission.get('studentNumber').value;
    const contactPersonEmail: string = this.updateSubmission.get('contactPersonEmail').value;
    const contactPersonTitle: string = this.updateSubmission.get('contactPersonTitle').value;
   
    const contactPersonLastName: string =this.updateSubmission.get('contactPersonLastName').value;
    const contactPersonFirstName: string =this.updateSubmission.get('contactPersonFirstName').value;
    const contactPersonPosition: string = this.updateSubmission.get('contactPersonPosition').value;
    const companyId: number = this.updateSubmission.get('companyId').value;
    const jobDescription: string = this.updateSubmission.get('jobDescription').value;

    const studentId = this.user.student.id;
   
    let acceptedByCoordinator:boolean;
    let acceptedByChair:boolean;
    let acceptedByDean:boolean;
    let emailSentByCoordinator: boolean;
    let companyAgrees: boolean;
    let comments: boolean;

    this.student.map(eacS=> {
       acceptedByCoordinator   = eacS.adminResponse.acceptedByCoordinator;
       acceptedByChair  = eacS.adminResponse.acceptedByCoordinator;
       acceptedByDean   = eacS.adminResponse.acceptedByCoordinator;
       emailSentByCoordinator  = eacS.adminResponse.acceptedByCoordinator;
       companyAgrees   = eacS.adminResponse.acceptedByCoordinator;
       comments   = eacS.adminResponse.acceptedByCoordinator;
      
    })
    
    let id;

    this.student.map(eachS=> {
      id = eachS.id;
    })
    if(!this.PhotoFileNameA &&  !this.PhotoFileNameC ) {
      this.student.map(eacS=> {
          this.PhotoFileNameA = eacS.acceptanceLetterFileName;
          this.PhotoFileNameC = eacS.companyProfileFileName;
      })
    }
    else if(!this.PhotoFileNameA) {
        this.student.map(eacS=> {
          this.PhotoFileNameA = eacS.acceptanceLetterFileName;
        
      })
    }
    else if(!this.PhotoFileNameC) {
      this.student.map(eacS=> {
        this.PhotoFileNameC = eacS.companyProfileFileName;
      
      })
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
      studentId: studentId
    };
    
    this.Acc.UPDATEsubmission(form_payload).subscribe(submission=> {
      console.log(submission);
      this.FormEntry = false;
      this.ngOnInit();
     
    });
  

  }

  toClose() {
    this.FormEntry = false;
  }

  toChange() {
    this.CompanyEntry = true;
   
    this.student.map(stud=> {
      this.companyForm = new FormGroup({
        'lastName': new FormControl(stud.lastName),
        'firstName': new FormControl(stud.firstName),
        'middleInitial': new FormControl(stud.middleInitial),
        'studentNumber': new FormControl(stud.studentNumber),
        'contactPersonTitle': new FormControl(stud.contactPersonTitle),
        'contactPersonFirstName': new FormControl(stud.contactPersonFirstName),
        'contactPersonLastName': new FormControl(stud.contactPersonLastName),
        'contactPersonEmail': new FormControl(stud.contactPersonEmail),
        'contactPersonPosition': new FormControl(stud.contactPersonPosition),
        'jobDescription': new FormControl(stud.jobDescription),
        'studentTitle':new FormControl(stud.studentTitle),
        'companyId': new FormControl(''),
        'trackId': new FormControl(stud.trackId),
      });
    })

  }
  companySubmit() {
    // submit the value

    const studentTitle:string = this.companyForm.get('studentTitle').value;
    const lastName:string = this.companyForm.get('lastName').value;

    const firstName:string = this.companyForm.get('firstName').value;
  
    const middleInitial: string = this.companyForm.get('middleInitial').value;

    const trackId: number = this.companyForm.get('trackId').value;

    const studentNumber: number =this.companyForm.get('studentNumber').value;
    const contactPersonEmail: string = this.companyForm.get('contactPersonEmail').value;
    const contactPersonTitle: string = this.companyForm.get('contactPersonTitle').value;
   
    const contactPersonLastName: string =this.companyForm.get('contactPersonLastName').value;
    const contactPersonFirstName: string =this.companyForm.get('contactPersonFirstName').value;
    const contactPersonPosition: string = this.companyForm.get('contactPersonPosition').value;
    const companyId: number = this.companyForm.get('companyId').value;
    const jobDescription: string = this.companyForm.get('jobDescription').value;

    const studentId = this.user.student.id;
   
    let acceptedByCoordinator:boolean;
    let acceptedByChair:boolean;
    let acceptedByDean:boolean;
    let emailSentByCoordinator: boolean;
    let companyAgrees: boolean;
    let comments: boolean;

    this.student.map(eacS=> {
       acceptedByCoordinator   = eacS.adminResponse.acceptedByCoordinator;
       acceptedByChair  = eacS.adminResponse.acceptedByCoordinator;
       acceptedByDean   = eacS.adminResponse.acceptedByCoordinator;
       emailSentByCoordinator  = eacS.adminResponse.acceptedByCoordinator;
       companyAgrees   = eacS.adminResponse.acceptedByCoordinator;
       comments   = eacS.adminResponse.acceptedByCoordinator;
      
    })
    
    let id;

    this.student.map(eachS=> {
      id = eachS.id;
    })
    if(!this.PhotoFileNameA &&  !this.PhotoFileNameC ) {
      this.student.map(eacS=> {
          this.PhotoFileNameA = eacS.acceptanceLetterFileName;
          this.PhotoFileNameC = eacS.companyProfileFileName;
      })
    }
    else if(!this.PhotoFileNameA) {
        this.student.map(eacS=> {
          this.PhotoFileNameA = eacS.acceptanceLetterFileName;
        
      })
    }
    else if(!this.PhotoFileNameC) {
      this.student.map(eacS=> {
        this.PhotoFileNameC = eacS.companyProfileFileName;
      
      })
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
      studentId: studentId
    };
    
    this.Acc.UPDATEsubmission(form_payload).subscribe(submission=> {
      console.log(submission);
      this.CompanyEntry = false;
      this.ngOnInit();
    });
    
  }
  toCloseSecond() {
    this.CompanyEntry = false;
  }

  initStatus() {
    
 
      this.student.map(value=> {
        if(value.adminResponse.comments) {
          this.responseType="";
          this.comments = value.adminResponse.comments;
        }
        else if(value.adminResponse.companyAgrees) {
          this.responseType="agrees";
         
        }
        else if(value.adminResponse.emailSentByCoordinator) {
          this.responseType="emailed";
         
        }
        else if(value.adminResponse.acceptedByDean) {
          this.responseType="dean";
         
        }
        else {
          this.responseType="acknowledged";
        }
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
       
      };
    }
    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileC, this.selectedFileC.name);
   
    console.log(formData);
  
    

    this.File.uploadEndorsement(formData).subscribe((data:any)=>{
      this.PhotoFileNameC = data.toString();
      this.PhotoFilePathC = this.File.photoUrl+this.PhotoFileNameC;
      console.log(this.PhotoFileNameC);
      console.log(this.PhotoFilePathC);
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
    console.log(this.selectedFileA.name);
    console.log(this.selectedFileA.name);

    this.File.uploadEndorsement(formData).subscribe((data:any)=>{
      this.PhotoFileNameA = data.toString();
      this.PhotoFilePathA = this.File.photoUrl+this.PhotoFileNameA;
      console.log(this.PhotoFileNameA);
      console.log(this.PhotoFilePathA);
    });
    
  }


  

  


}