import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private File: fileUpload,private Auth: AuthenticationService, private Acc: createAccount, private router: Router) { }

  ngOnInit(): void {
    this.Acc.getWebstate().subscribe(webState=> {
      this.logo = webState.logoFileName;
      this.landingImg = webState.coverPhotoFileName;
      this.logoPath = this.File.photoUrlL+this.logo;
      this.landingPath = this.File.photoUrlL+this.landingImg;
      if (this.user == null) {
        alert("You must be logged in to view the landing page")
        this.router.navigate(['/login']);
      }
    });
    this.Acc.getSubmissionStudent(this.user.student.id).subscribe(student=> {
        this.submission = student;
    });





  }
  logout() {
      this.Auth.logout();
  }


}
