import { Component, OnInit } from '@angular/core';


import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  
   user = JSON.parse(localStorage.getItem('user'));
   
  
  constructor(private Auth:AuthenticationService) { }

  ngOnInit(): void {
    
  }
  logout() {
    this.Auth.logout();
  }

}
