import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class RouteGuardAdmin implements CanActivate {

    constructor(private router:Router) { }
  
    public canActivate(route: ActivatedRouteSnapshot){
      const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            if(user.admin) {
                return true;
            }
            else {
              this.router.navigate(["/"]);
              return false;
            }
           
        }
       
        this.router.navigate(['/login']);
        return false;
    }
  }