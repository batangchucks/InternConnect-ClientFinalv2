import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  //  this.auth.getAccounts().subscribe(eachVal=> {
  //    console.log(eachVal);
  //  })
  }

}
