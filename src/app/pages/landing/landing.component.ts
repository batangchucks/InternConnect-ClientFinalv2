import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import {CompanyModel} from 'src/app/shared/models/company.model'
import { opportunityModel } from 'src/app/shared/models/opportunity.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  opportunity: opportunityModel[] = [];
  
  constructor(private company:CompanyService) { }

  ngOnInit(): void {
    // this.company.POST_Opportunity();
  };
}
