import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { submissionModel } from '../shared/models/submission.model';
import { createAccount } from '../shared/services/createAcc.service';


@Injectable({
    providedIn: 'root'
  })

  export class RouteGuardEndorsement implements CanActivate {
    submit:submissionModel;
    constructor(private router:Router, private  Acc:createAccount) { }
  
    public canActivate(route: ActivatedRouteSnapshot){
      const user = JSON.parse(localStorage.getItem('user'));
      

        if(user) {
            if(user.student) {
              this.Acc.getSubmissionStudent(user.student.id).subscribe(submi=> {
                this.submit = submi;
                if(this.submit) {
                    return true;
                }
                return false;
            
            })
                
            }
            else {
              this.router.navigate(['/admin']);
              return false;
            }
            
        }
      
            this.router.navigate(["/login"]);
            return false;
      
       
    }
  }