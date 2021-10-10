import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class RouteGuardLogin implements CanActivate {

    constructor(private router:Router) { }
  
    public canActivate(route: ActivatedRouteSnapshot){
      const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            if(user.admin) {
                this.router.navigate(['/admin']);

                return false;
            }
            else if(user.student) {
                this.router.navigate(['/']);

                return false;
            }
        }
        else {
            
            return true;
        }
        return true;
    }
  }