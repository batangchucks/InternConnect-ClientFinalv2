import { Component, OnInit } from '@angular/core';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {


  readonly envVar= environment.apiUrl;
  
  user = JSON.parse(localStorage.getItem("user"));
  
  logo:string;
  landingImg:string;
  logoPath:string;
  landingPath:string;
  submission:submissionModel;

  constructor(private File: fileUpload,private Auth: AuthenticationService, private Acc: createAccount) { }

  ngOnInit(): void {
    this.Acc.getWebstate().subscribe(webState=> {
      this.logo = webState.logoFileName;
      this.landingImg = webState.coverPhotoFileName;
      this.logoPath = this.File.photoUrlL+this.logo;
      this.landingPath = this.File.photoUrlL+this.landingImg;

    });
    this.Acc.getSubmissionStudent(this.user.student.id).subscribe(student=> {
        this.submission = student;
    });


  }
  logout() {
      this.Auth.logout();
  }


}
