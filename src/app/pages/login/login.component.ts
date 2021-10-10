import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn:boolean = true;

  constructor(private router:Router,  private route: ActivatedRoute, private auth:AuthenticationService) { }
  @ViewChild('errContainer') divC;

  ngOnInit(): void {
   
  }
  onSubmit(form:NgForm) {
    this.auth.login(form.value).subscribe(val=>{
      
        if(val.admin) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
          this.router.navigate(['/admin']);
          
        }
        else if(val.student) {
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
          this.router.navigate(['/']);
          
        }
      
    },(error:HttpErrorResponse)=> {
       if(error.status == 400) {
        this.isLoggedIn = false;
       }
    
    })
  }
  onClick() {
    this.isLoggedIn = ! this.isLoggedIn;
  }

 

  

}
