import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingGuard implements CanActivate {

  constructor(private router: Router) {

  }
  user = JSON.parse(localStorage.getItem('user'));
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.user) {
      return true;
    }
    this.router.navigate(['/login']);
    alert('You must be logged in to view the landing page')
    return false

  }
}
