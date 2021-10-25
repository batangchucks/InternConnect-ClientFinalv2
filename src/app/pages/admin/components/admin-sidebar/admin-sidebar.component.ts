import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  
   user = JSON.parse(localStorage.getItem('user'));
   
  
  constructor(private Auth:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    
  }
  logout() {
    this.Auth.logout();

    this.router.navigate(['/login']);
    window.location.reload();
  }

}
