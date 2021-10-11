import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));

  logo: string;
  landingImg: string;
  logoPath: string;
  landingPath: string;

  constructor(
    private File: fileUpload,
    private Auth: AuthenticationService,
    private Acc: createAccount
  ) {}

  ngOnInit(): void {
    this.Acc.getWebstate().subscribe((webState) => {
      this.logo = webState.logoFileName;
      this.landingImg = webState.coverPhotoFileName;
      this.logoPath = this.File.photoUrlL + this.logo;
      this.landingPath = this.File.photoUrlL + this.landingImg;
    });
  }
  logout() {
    this.Auth.logout();
  }
}
