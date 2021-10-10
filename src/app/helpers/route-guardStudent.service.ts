import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { StudentsComponent } from '../pages/admin/components/admin-accounts/components/students/students.component';

@Injectable({
    providedIn: 'root'
  })

  export class RouteGuardStudent implements CanActivate {

    constructor(private router:Router) { }
  
    public canActivate(route: ActivatedRouteSnapshot){
      const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            if(user.student) {
              return true;
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