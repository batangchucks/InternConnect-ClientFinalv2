import { Component, Injectable, OnInit } from '@angular/core';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { opportunityModel } from 'src/app/shared/models/opportunity.model';
import { CompanyService } from 'src/app/shared/services/company.service';



@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.scss']
})
export class CompanyprofileComponent implements OnInit {
  index!:number;
  public Companies:CompanyModel [] = [];
  opportunity: opportunityModel [] = [];
  companyProfile!:CompanyModel;
  constructor(private router:Router,  private route: ActivatedRoute,private company:CompanyService) { }

  ngOnInit(): void {
    
    this.route.params
    .subscribe(
      (params: Params) => {
        this.index = +params['id'];
      }
    );
      this.company.getCompanyById(this.index).subscribe(eachC=>{
        this.companyProfile = eachC;
        console.log(eachC);
      });
     
      this.company.getOpportunityByCompany(this.index).subscribe(eachValue=>{
        this.opportunity = eachValue;
        console.log(this.opportunity);
      });
  
    
  }
  

}
