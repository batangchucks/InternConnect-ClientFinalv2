import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.scss']
})
export class DeanComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  AssignIndicator: boolean = false;

  email:string;
  pass:string;

  constructor( private router: Router,private Acc:createAccount,private Auth:AuthenticationService) { }

  ngOnInit(): void {

  
  }

  toAssign() { 
    this.AssignIndicator = true;
  } 

  toCancel() {
    this.AssignIndicator = false;
  } 
  changeDean() {

    console.log();

    var payload = {
      oldEmail:this.user.email.toLowerCase(),
      newEmail:this.email,
      password:this.pass

    }

    this.Acc.changeDean(payload).subscribe(changedDean=> {
      this.AssignIndicator = false;
      console.log(changedDean);
      this.email= '';
      this.pass = '';
      this.ngOnInit();
      this.logout();
      
    });

   


  }
  logout() {
    this.Auth.logout();
    this.router.navigate(['/login']);
  }
  
}
