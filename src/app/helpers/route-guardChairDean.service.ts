import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class RouteGuardChairDean implements CanActivate {

    constructor(private router:Router) { }
  
    public canActivate(route: ActivatedRouteSnapshot){
      const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            if(user.admin) {
              if(user.admin.authId === 2 || user.admin.authId === 1) {
                return true;
              }
              else {
                this.router.navigate(['/admin']);
                return false;
              }
            }
            else if (user.student)  {
              this.router.navigate(["/"]);
              return false;
          }
        }
       
        this.router.navigate(['/login']);
        return false;
    }
  }