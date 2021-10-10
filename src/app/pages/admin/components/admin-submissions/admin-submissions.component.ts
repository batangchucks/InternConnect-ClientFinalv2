import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-admin-submissions',
  templateUrl: './admin-submissions.component.html',
  styleUrls: ['./admin-submissions.component.scss']
})
export class AdminSubmissionsComponent implements OnInit {

  constructor(private company:CompanyService){}

  ngOnInit(): void {
   
  }

}
